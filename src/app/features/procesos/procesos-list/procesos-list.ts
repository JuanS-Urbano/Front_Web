import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Proceso as ProcesoService } from '../../../services/proceso';
import { Proceso as ProcesoModel } from '../../../models/proceso';
import { Session } from '../../../core/services/session';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs/operators';
import { SearchBar } from '../../../shared/components/search-bar/search-bar';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-procesos-list',
  imports: [RouterLink, SearchBar, ConfirmDialog, LoadingSpinner],
  templateUrl: './procesos-list.html',
  styleUrl: './procesos-list.css',
})
export class ProcesosList implements OnInit {

  procesos: ProcesoModel[] = [];
  procesosFiltrados: ProcesoModel[] = [];
  loading = true;
  searchTerm = '';
  viewMode: 'table' | 'cards' = 'table';
  userRole = '';

  mostrarConfirmacion = false;
  procesoIdAEliminar: number | null = null;

  private destroyRef = inject(DestroyRef);

  constructor(
    private procesoService: ProcesoService,
    private sessionService: Session,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.sessionService.session$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((session) => {
        this.userRole = session?.rolSistema ?? '';
      });

    this.cargarProcesos();
  }

  cargarProcesos(): void {
    this.loading = true;
    const poolId = this.sessionService.getPoolId() ?? this.sessionService.getEmpresaId() ?? 1;
    this.procesoService.getProcesos(poolId)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.procesos = response.data ?? [];
          this.procesosFiltrados = [...this.procesos];
          this.loading = false;
        },
        error: (err) => {
          this.toastService.mostrarError(err.error?.message || 'Error al cargar los procesos');
          this.loading = false;
        }
      });
  }

  onSearch(termino: string): void {
    this.searchTerm = termino.toLowerCase();
    if (!this.searchTerm) {
      this.procesosFiltrados = [...this.procesos];
    } else {
      this.procesosFiltrados = this.procesos.filter(p =>
        p.nombre.toLowerCase().includes(this.searchTerm) ||
        (p.categoria?.toLowerCase().includes(this.searchTerm) ?? false)
      );
    }
  }

  prepararEliminacion(id: number | undefined): void {
    if (!id) return;
    this.procesoIdAEliminar = id;
    this.mostrarConfirmacion = true;
  }

  cancelarEliminacion(): void {
    this.mostrarConfirmacion = false;
    this.procesoIdAEliminar = null;
  }

  confirmarEliminacion(): void {
    if (this.procesoIdAEliminar) {
      this.procesoService.deleteProceso(this.procesoIdAEliminar).subscribe({
        next: () => {
          this.mostrarConfirmacion = false;
          this.procesoIdAEliminar = null;
          this.toastService.mostrarExito('Proceso eliminado correctamente');
          this.cargarProcesos();
        },
        error: (err) => {
          this.toastService.mostrarError(err.error?.message || 'Error al eliminar el proceso');
          this.mostrarConfirmacion = false;
          this.procesoIdAEliminar = null;
        }
      });
    }
  }
}
