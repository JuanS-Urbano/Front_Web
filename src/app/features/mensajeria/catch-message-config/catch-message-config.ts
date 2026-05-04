import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Mensaje as MensajeService } from '../../../services/mensaje';
import { Mensaje as MensajeModel } from '../../../models/mensaje';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-catch-message-config',
  standalone: true,
  imports: [CommonModule, LoadingSpinner],
  templateUrl: './catch-message-config.html',
  styleUrl: './catch-message-config.css',
})
export class CatchMessageConfig implements OnInit {
  @Input() procesoId?: number;

  mensajesCatch: MensajeModel[] = [];
  mensajeSeleccionado: MensajeModel | null = null;
  
  loadingList = true;
  loadingDetail = false;
  
  errorList: string | null = null;
  errorDetail: string | null = null;

  private route = inject(ActivatedRoute);
  private mensajeService = inject(MensajeService);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('procesoId') || this.route.snapshot.paramMap.get('id');
    const pid = this.procesoId || (idParam ? Number(idParam) : undefined);

    if (pid) {
      this.cargarMensajesCatch(pid);
    } else {
      this.loadingList = false;
      this.errorList = 'No se especificó un ID de proceso.';
    }
  }

  cargarMensajesCatch(procesoId: number): void {
    this.loadingList = true;
    this.errorList = null;

    this.mensajeService.getMensajes(procesoId).subscribe({
      next: (response) => {
        const todos = response.data || [];
        // Filtramos para mostrar solo los de tipo CATCH
        this.mensajesCatch = todos.filter(m => m.estado === 'CATCH');
        this.loadingList = false;
      },
      error: (err) => {
        console.error('Error cargando mensajes CATCH:', err);
        this.errorList = 'Hubo un error al cargar los mensajes esperados.';
        this.loadingList = false;
      }
    });
  }

  verDetalle(id: number): void {
    this.loadingDetail = true;
    this.errorDetail = null;
    this.mensajeSeleccionado = null;

    this.mensajeService.recibirMensaje(id).subscribe({
      next: (response) => {
        this.mensajeSeleccionado = response.data;
        this.loadingDetail = false;
      },
      error: (err) => {
        console.error('Error recibiendo detalle del mensaje:', err);
        this.errorDetail = err?.error?.message || 'Error al recibir el mensaje.';
        this.loadingDetail = false;
      }
    });
  }

  cerrarDetalle(): void {
    this.mensajeSeleccionado = null;
    this.errorDetail = null;
  }
}
