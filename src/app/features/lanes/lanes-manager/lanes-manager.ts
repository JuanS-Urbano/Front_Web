import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lane as LaneService } from '../../../services/lane';
import { Lane as LaneModel } from '../../../models/lane';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-lanes-manager',
  standalone: true,
  imports: [RouterLink, LoadingSpinner, ConfirmDialog],
  templateUrl: './lanes-manager.html',
  styleUrl: './lanes-manager.css',
})
export class LanesManager implements OnInit, OnChanges {
  @Input() procesoId!: number;
  
  lanes: LaneModel[] = [];
  loading = true;
  errorMessage = '';

  // Confirm dialog state
  mostrarConfirmacion = false;
  laneIdAEliminar: number | null = null;

  constructor(private laneService: LaneService) {}

  ngOnInit(): void {
    if (this.procesoId) {
      this.cargarLanes();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['procesoId'] && this.procesoId) {
      this.cargarLanes();
    }
  }

  cargarLanes(): void {
    this.loading = true;
    this.laneService.getLanes(this.procesoId).subscribe({
      next: (response) => {
        this.lanes = response.data.sort((a, b) => a.orden - b.orden);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando lanes', err);
        this.errorMessage = err.error?.message || 'Error cargando los lanes';
        this.loading = false;
      }
    });
  }

  prepararEliminacion(id: number): void {
    this.laneIdAEliminar = id;
    this.mostrarConfirmacion = true;
  }

  cancelarEliminacion(): void {
    this.mostrarConfirmacion = false;
    this.laneIdAEliminar = null;
  }

  confirmarEliminacion(): void {
    if (this.laneIdAEliminar) {
      this.laneService.deleteLane(this.laneIdAEliminar).subscribe({
        next: () => {
          this.mostrarConfirmacion = false;
          this.laneIdAEliminar = null;
          this.cargarLanes();
        },
        error: (err) => {
          console.error('Error eliminando lane', err);
          this.errorMessage = err.error?.message || 'Error al eliminar el carril';
          this.mostrarConfirmacion = false;
          this.laneIdAEliminar = null;
        }
      });
    }
  }
}
