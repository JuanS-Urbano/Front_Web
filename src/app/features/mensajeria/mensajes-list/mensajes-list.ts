import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Mensaje as MensajeService } from '../../../services/mensaje';
import { Mensaje as MensajeModel } from '../../../models/mensaje';
import { Proceso as ProcesoService } from '../../../services/proceso';
import { Proceso as ProcesoModel } from '../../../models/proceso';
import { Session } from '../../../core/services/session';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-mensajes-list',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinner],
  templateUrl: './mensajes-list.html',
  styleUrl: './mensajes-list.css',
})
export class MensajesList implements OnInit {
  @Input() procesoId?: number;

  mensajes: MensajeModel[] = [];
  loading = true;
  error: string | null = null;

  procesos: ProcesoModel[] = [];
  procesoSeleccionadoId: number | null = null;
  mostrarSelector = false;
  loadingProcesos = false;

  // HU-28: correlación de mensajes
  correlationKeyInput = '';
  correlacionando = false;

  private route = inject(ActivatedRoute);
  private mensajeService = inject(MensajeService);
  private procesoService = inject(ProcesoService);
  private sessionService = inject(Session);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('procesoId') || this.route.snapshot.paramMap.get('id');
    const pid = this.procesoId || (idParam ? Number(idParam) : undefined);

    if (pid) {
      this.cargarMensajes(pid);
    } else {
      this.mostrarSelector = true;
      this.loading = false;
      this.cargarProcesos();
    }
  }

  cargarProcesos(): void {
    this.loadingProcesos = true;
    const poolId = this.sessionService.getPoolId() ?? this.sessionService.getEmpresaId() ?? 1;
    this.procesoService.getProcesos(poolId).subscribe({
      next: (res) => {
        this.procesos = res.data || [];
        this.loadingProcesos = false;
      },
      error: () => {
        this.loadingProcesos = false;
      }
    });
  }

  onProcesoSeleccionado(): void {
    if (this.procesoSeleccionadoId) {
      this.cargarMensajes(this.procesoSeleccionadoId);
    }
  }

  cargarMensajes(procesoId: number): void {
    this.loading = true;
    this.error = null;
    this.mensajeService.getMensajes(procesoId).subscribe({
      next: (response) => {
        this.mensajes = response.data || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'No se pudieron cargar los mensajes.';
        this.loading = false;
      }
    });
  }

  // HU-28: Correlacionar mensajes por clave de correlación
  correlacionar(): void {
    if (!this.correlationKeyInput.trim()) {
      this.toastService.mostrarError('Ingresa una clave de correlación');
      return;
    }
    this.correlacionando = true;
    this.mensajeService.correlacionar(this.correlationKeyInput.trim()).subscribe({
      next: (response) => {
        this.correlacionando = false;
        this.toastService.mostrarExito(response.message || 'Correlación realizada correctamente');
        this.correlationKeyInput = '';
      },
      error: (err) => {
        this.correlacionando = false;
        this.toastService.mostrarError(err.error?.message || 'Error al correlacionar mensajes');
      }
    });
  }
}
