import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialCambiosService } from '../../services/historial-cambios';
import { HistorialCambios } from '../../models/historial-cambios';
import { ApiResponse } from '../../models/api-response';
import { LoadingSpinner } from '../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, LoadingSpinner],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial implements OnInit, OnChanges {
  @Input() procesoId!: number;
  
  registros: HistorialCambios[] = [];
  loading = true;
  errorMessage = '';

  constructor(private historialService: HistorialCambiosService) {}

  ngOnInit(): void {
    if (this.procesoId) {
      this.cargarHistorial();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['procesoId'] && this.procesoId) {
      this.cargarHistorial();
    }
  }

  cargarHistorial(): void {
    this.loading = true;
    this.historialService.getHistorialByProceso(this.procesoId).subscribe({
      next: (response: ApiResponse<HistorialCambios[]>) => {
        // Sort descending by date
        this.registros = response.data.sort((a: HistorialCambios, b: HistorialCambios) => new Date(b.fechaCambio).getTime() - new Date(a.fechaCambio).getTime());
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error cargando historial', err);
        this.errorMessage = err.error?.message || 'Error cargando el historial de cambios';
        this.loading = false;
      }
    });
  }
}
