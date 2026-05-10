import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RolProceso as RolService } from '../../../services/rol-proceso';
import { RolProceso as RolModel } from '../../../models/rol-proceso';
import { Session } from '../../../core/services/session';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [RouterLink, LoadingSpinner, ConfirmDialog],
  templateUrl: './roles-list.html',
  styleUrl: './roles-list.css',
})
export class RolesList implements OnInit {
  roles: RolModel[] = [];
  loading = true;
  errorMessage = '';
  userRole = '';

  mostrarConfirmacion = false;
  rolIdAEliminar: number | null = null;

  private destroyRef = inject(DestroyRef);

  constructor(
    private rolService: RolService,
    private sessionService: Session,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.sessionService.session$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((session) => {
        this.userRole = session?.rolSistema ?? '';
      });

    this.cargarRoles();
  }

  cargarRoles(): void {
    this.loading = true;
    const empresaId = this.sessionService.getEmpresaId() ?? 0;

    this.rolService.getRoles(empresaId).subscribe({
      next: (response) => {
        this.roles = response.data ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al cargar los roles';
        this.toastService.mostrarError(this.errorMessage);
        this.loading = false;
      }
    });
  }

  prepararEliminacion(id: number): void {
    this.rolIdAEliminar = id;
    this.mostrarConfirmacion = true;
  }

  cancelarEliminacion(): void {
    this.mostrarConfirmacion = false;
    this.rolIdAEliminar = null;
  }

  confirmarEliminacion(): void {
    if (this.rolIdAEliminar) {
      this.rolService.deleteRol(this.rolIdAEliminar).subscribe({
        next: () => {
          this.mostrarConfirmacion = false;
          this.rolIdAEliminar = null;
          this.toastService.mostrarExito('Rol eliminado correctamente');
          this.cargarRoles();
        },
        error: (err) => {
          this.toastService.mostrarError(err.error?.message || 'Error al eliminar el rol. Verifique que no esté en uso.');
          this.mostrarConfirmacion = false;
          this.rolIdAEliminar = null;
        }
      });
    }
  }
}
