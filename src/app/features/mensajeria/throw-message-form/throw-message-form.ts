import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Mensaje as MensajeService } from '../../../services/mensaje';
import { Mensaje as MensajeModel } from '../../../models/mensaje';
import { CorrelacionResult } from '../../../models/correlacion-result';
import { Proceso as ProcesoService } from '../../../services/proceso';
import { Proceso as ProcesoModel } from '../../../models/proceso';
import { Session } from '../../../core/services/session';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-throw-message-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinner],
  templateUrl: './throw-message-form.html',
  styleUrl: './throw-message-form.css',
})
export class ThrowMessageForm implements OnInit {
  messageForm: FormGroup;
  resultado: CorrelacionResult | null = null;
  cargando = false;
  error: string | null = null;

  procesos: ProcesoModel[] = [];
  loadingProcesos = false;
  errorProcesos: string | null = null;

  private fb = inject(FormBuilder);
  private mensajeService = inject(MensajeService);
  private procesoService = inject(ProcesoService);
  private sessionService = inject(Session);

  constructor() {
    this.messageForm = this.fb.group({
      nombre: ['', Validators.required],
      payloadJson: ['', Validators.required],
      correlationKey: ['', Validators.required],
      procesoOrigenId: [null, [Validators.required, Validators.min(1)]],
      procesoDestinoId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.cargarProcesos();
  }

  cargarProcesos(): void {
    this.loadingProcesos = true;
    this.errorProcesos = null;
    const poolId = this.sessionService.getPoolId() ?? this.sessionService.getEmpresaId() ?? 1;
    this.procesoService.getProcesos(poolId).subscribe({
      next: (res) => {
        this.procesos = res.data || [];
        this.loadingProcesos = false;
      },
      error: () => {
        this.errorProcesos = 'No se pudo cargar la lista de procesos.';
        this.loadingProcesos = false;
      }
    });
  }

  onSubmit(): void {
    if (this.messageForm.invalid) {
      this.messageForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.error = null;
    this.resultado = null;

    const { nombre, payloadJson, correlationKey, procesoOrigenId, procesoDestinoId } = this.messageForm.value;

    const mensaje: MensajeModel = {
      nombre,
      payloadJson,
      tipo: 'THROW',
      correlationKey,
      proceso: { id: procesoOrigenId, nombre: '' },
      procesoDestino: { id: procesoDestinoId, nombre: '' }
    };

    this.mensajeService.enviarMensaje(mensaje).subscribe({
      next: (response) => {
        this.resultado = response.data as CorrelacionResult;
        this.cargando = false;
        this.messageForm.reset();
      },
      error: (err) => {
        console.error('Error enviando mensaje:', err);
        this.error = err?.error?.message || 'Hubo un error al enviar el mensaje.';
        this.cargando = false;
      }
    });
  }
}
