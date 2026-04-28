import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Lane as LaneService } from '../../../services/lane';
import { Lane as LaneModel } from '../../../models/lane';
import { RolesSelect } from '../../roles/roles-select/roles-select';

@Component({
  selector: 'app-lane-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RolesSelect],
  templateUrl: './lane-form.html',
  styleUrl: './lane-form.css',
})
export class LaneForm implements OnInit {
  laneForm!: FormGroup;
  isEditMode = false;
  laneId: number | null = null;
  procesoId: number | null = null; // Lanes belong to a process
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private laneService: LaneService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.laneForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      orden: [1, [Validators.required, Validators.min(1)]],
      rolProcesoId: [null, Validators.required]
    });

    // In a real app, you would pass procesoId in the route query params when creating
    this.route.queryParams.subscribe(params => {
      if (params['procesoId']) {
        this.procesoId = +params['procesoId'];
      }
    });

    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr && idStr !== 'crear') {
        this.isEditMode = true;
        this.laneId = +idStr;
        this.cargarLane(this.laneId);
      }
    });
  }

  cargarLane(id: number): void {
    // The service lacks getLaneById, so we fetch all by procesoId if we know it, or we would need an endpoint.
    // For now, we mock it or show error.
    if (!this.procesoId) {
      this.errorMessage = 'Falta el procesoId para cargar el lane.';
      return;
    }
    
    this.laneService.getLanes(this.procesoId).subscribe({
      next: (response) => {
        const lane = response.data.find(l => l.id === id);
        if (lane) {
          this.laneForm.patchValue({
            nombre: lane.nombre,
            orden: lane.orden,
            rolProcesoId: lane.rolProcesoId
          });
        } else {
          this.errorMessage = 'Lane no encontrado.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar el lane';
        console.error(err);
      }
    });
  }

  onRolSelected(rolId: number): void {
    this.laneForm.patchValue({ rolProcesoId: rolId });
  }

  onSubmit(): void {
    if (this.laneForm.invalid || !this.procesoId) {
      this.laneForm.markAllAsTouched();
      if (!this.procesoId) this.errorMessage = 'No se definió el procesoId';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    const formData = this.laneForm.value;

    if (this.isEditMode && this.laneId) {
      this.laneService.updateLane(this.laneId, formData).subscribe({
        next: () => {
          this.router.navigate(['/lanes'], { queryParams: { procesoId: this.procesoId } });
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Error al actualizar el lane';
        }
      });
    } else {
      const nuevoLane: LaneModel = {
        ...formData,
        procesoId: this.procesoId
      };
      
      this.laneService.crearLane(nuevoLane).subscribe({
        next: () => {
          this.router.navigate(['/lanes'], { queryParams: { procesoId: this.procesoId } });
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Error al crear el lane';
        }
      });
    }
  }
}
