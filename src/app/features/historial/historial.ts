import { Component, Input, OnChanges, SimpleChanges, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { HistorialCambiosService } from '../../services/historial-cambios';
import { HistorialCambios } from '../../models/historial-cambios';
import { LoadingSpinner } from '../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [DatePipe, LoadingSpinner],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial implements OnChanges {
  @Input() procesoId!: number;

  registros: HistorialCambios[] = [];
  loading = true;
  errorMessage = '';

  private destroyRef = inject(DestroyRef);
  private historialService = inject(HistorialCambiosService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['procesoId'] && this.procesoId) {
      this.cargarHistorial();
    }
  }

  cargarHistorial(): void {
    this.loading = true;
    this.errorMessage = '';
    this.historialService.getHistorialByProceso(this.procesoId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: any) => {
          this.registros = (response.data ?? []).map((item: any) => ({
            id: item.id,
            procesoId: item.proceso?.id ?? this.procesoId,
            usuarioEmail: item.usuario?.nombre ?? item.usuario?.email ?? `Usuario #${item.usuario?.id}`,
            descripcionCambio: item.cambio ?? item.descripcionCambio ?? '',
            fechaCambio: item.fecha ?? item.fechaCambio ?? '',
          }));
          this.loading = false;
        },
        error: (err: any) => {
          this.errorMessage = err.error?.message || 'Error cargando el historial de cambios';
          this.loading = false;
        }
      });
  }
}
