import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Proceso as ProcesoService } from '../../../services/proceso';
import { Proceso as ProcesoModel } from '../../../models/proceso';
import { SearchBar } from '../../../shared/components/search-bar/search-bar';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';

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

  // Confirm dialog state
  mostrarConfirmacion = false;
  procesoIdAEliminar: number | null = null;

  constructor(private procesoService: ProcesoService) {}

  ngOnInit(): void {
    this.cargarProcesos();
  }

  cargarProcesos(): void {
    this.loading = true;
    this.procesoService.getProcesos(1).subscribe({
      next: (response) => {
        this.procesos = response.data;
        this.procesosFiltrados = [...this.procesos];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando procesos:', err);
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
        p.categoria.toLowerCase().includes(this.searchTerm)
      );
    }
  }

  prepararEliminacion(id: number): void {
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
          this.cargarProcesos(); // Refrescar lista
        },
        error: (err) => {
          console.error('Error eliminando proceso', err);
          this.mostrarConfirmacion = false;
          this.procesoIdAEliminar = null;
        }
      });
    }
  }
}
