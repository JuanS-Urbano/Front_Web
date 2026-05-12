import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RolProceso as RolService } from '../../../services/rol-proceso';
import { RolProceso as RolModel } from '../../../models/rol-proceso';
import { Session } from '../../../core/services/session';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-rol-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './rol-form.html',
  styleUrl: './rol-form.css',
})
export class RolForm implements OnInit {
  rolForm!: FormGroup;
  isEditMode = false;
  rolId: number | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    private router: Router,
    private route: ActivatedRoute,
    private sessionService: Session,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.rolForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr && idStr !== 'crear') {
        this.isEditMode = true;
        this.rolId = +idStr;
        this.cargarRol(this.rolId);
      }
    });
  }

  cargarRol(id: number): void {
    const empresaId = this.sessionService.getEmpresaId() ?? 0;
    this.rolService.getRoles(empresaId).subscribe({
      next: (response) => {
        const rol = response.data.find(r => r.id === id);
        if (rol) {
          this.rolForm.patchValue({
            nombre: rol.nombre,
            descripcion: rol.descripcion
          });
        } else {
          this.errorMessage = 'Rol no encontrado en la empresa.';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al cargar el rol';
      }
    });
  }

  onSubmit(): void {
    if (this.rolForm.invalid) {
      this.rolForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const formData = this.rolForm.value;

    if (this.isEditMode && this.rolId) {
      this.rolService.updateRol(this.rolId, formData).subscribe({
        next: () => {
          this.loading = false;
          this.toastService.mostrarExito('Rol actualizado correctamente');
          setTimeout(() => this.router.navigate(['/roles']), 1000);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Error al actualizar el rol';
          this.toastService.mostrarError(this.errorMessage);
        }
      });
    } else {
      const empresaId = this.sessionService.getEmpresaId() ?? 0;
      const empresaNombre = this.sessionService.getEmpresaNombre() ?? '';
      const nuevoRol: RolModel = {
        ...formData,
        empresa: { id: empresaId, nombre: empresaNombre }
      };

      this.rolService.crearRol(nuevoRol).subscribe({
        next: () => {
          this.loading = false;
          this.toastService.mostrarExito('Rol creado correctamente');
          setTimeout(() => this.router.navigate(['/roles']), 1000);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Error al crear el rol';
          this.toastService.mostrarError(this.errorMessage);
        }
      });
    }
  }
}
