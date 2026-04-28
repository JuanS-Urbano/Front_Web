import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Proceso as ProcesoService } from '../../../services/proceso';
import { Proceso as ProcesoModel } from '../../../models/proceso';

@Component({
  selector: 'app-proceso-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './proceso-form.html',
  styleUrl: './proceso-form.css',
})
export class ProcesoForm implements OnInit {
  procesoForm!: FormGroup;
  isEditMode = false;
  procesoId: number | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private procesoService: ProcesoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.procesoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      estado: ['ACTIVO', [Validators.required]]
    });

    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr && idStr !== 'crear') {
        this.isEditMode = true;
        this.procesoId = +idStr;
        this.cargarProceso(this.procesoId);
      }
    });
  }

  cargarProceso(id: number): void {
    this.procesoService.getProcesoById(id).subscribe({
      next: (response) => {
        const p = response.data;
        this.procesoForm.patchValue({
          nombre: p.nombre,
          descripcion: p.descripcion,
          categoria: p.categoria,
          estado: p.estado
        });
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar el proceso';
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.procesoForm.invalid) {
      this.procesoForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const formData = this.procesoForm.value;

    if (this.isEditMode && this.procesoId) {
      this.procesoService.updateProceso(this.procesoId, formData).subscribe({
        next: () => {
          this.router.navigate(['/procesos']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Error al actualizar el proceso';
        }
      });
    } else {
      // Create mode
      const nuevoProceso: ProcesoModel = {
        ...formData,
        poolId: 1, // Hardcoded for now
        compartido: false // Default
      };
      
      this.procesoService.crearProceso(nuevoProceso).subscribe({
        next: () => {
          this.router.navigate(['/procesos']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Error al crear el proceso';
        }
      });
    }
  }
}
