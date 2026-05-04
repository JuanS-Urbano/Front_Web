import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RolProceso as RolService } from '../../../services/rol-proceso';
import { RolProceso as RolModel } from '../../../models/rol-proceso';
import { Session } from '../../../core/services/session';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

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

  // Confirm dialog state
  mostrarConfirmacion = false;
  rolIdAEliminar: number | null = null;

  constructor(
    private rolService: RolService,
    private sessionService: Session
  ) {}

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles(): void {
    this.loading = true;
    // Obtener empresaId desde la sesión del usuario
    const empresaId = this.sessionService.getEmpresaId() ?? 1;

    this.rolService.getRoles(empresaId).subscribe({
      next: (response) => {
        this.roles = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando roles', err);
        this.errorMessage = err.error?.message || 'Error cargando roles';
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
          this.cargarRoles();
        },
        error: (err) => {
          console.error('Error eliminando rol', err);
          this.errorMessage = err.error?.message || 'Error al eliminar el rol';
          this.mostrarConfirmacion = false;
          this.rolIdAEliminar = null;
        }
      });
    }
  }
}
