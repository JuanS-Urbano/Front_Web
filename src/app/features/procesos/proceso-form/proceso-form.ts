import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Proceso as ProcesoService } from '../../../services/proceso';
import { Session } from '../../../core/services/session';
import { ToastService } from '../../../core/services/toast.service';

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
    private route: ActivatedRoute,
    private sessionService: Session,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.procesoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      estado: ['BORRADOR', [Validators.required]],
      configuracionCompartido: [false]
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
          estado: p.estado,
          configuracionCompartido: p.configuracionCompartido ?? false
        });
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al cargar el proceso';
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
    const poolId = this.sessionService.getPoolId() ?? this.sessionService.getEmpresaId() ?? 1;
    const datosProceso = {
      ...formData,
      pool: { id: poolId }
    };

    if (this.isEditMode && this.procesoId) {
      this.procesoService.updateProceso(this.procesoId, datosProceso).subscribe({
        next: () => {
          this.loading = false;
          this.toastService.mostrarExito('Proceso actualizado correctamente');
          this.router.navigate(['/procesos']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Error al actualizar el proceso';
          this.toastService.mostrarError(this.errorMessage);
        }
      });
    } else {
      this.procesoService.crearProceso(datosProceso).subscribe({
        next: () => {
          this.loading = false;
          this.toastService.mostrarExito('Proceso creado correctamente');
          this.router.navigate(['/procesos']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Error al crear el proceso';
          this.toastService.mostrarError(this.errorMessage);
        }
      });
    }
  }
}
