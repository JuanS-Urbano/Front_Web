import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Mensaje as MensajeService } from '../../../services/mensaje';
import { Mensaje as MensajeModel } from '../../../models/mensaje';
import { Proceso as ProcesoService } from '../../../services/proceso';
import { Proceso as ProcesoModel } from '../../../models/proceso';
import { Session } from '../../../core/services/session';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-catch-message-config',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoadingSpinner],
  templateUrl: './catch-message-config.html',
  styleUrl: './catch-message-config.css',
})
export class CatchMessageConfig implements OnInit {
  @Input() procesoId?: number;

  // Lista de mensajes CATCH existentes
  mensajesCatch: MensajeModel[] = [];
  mensajeSeleccionado: MensajeModel | null = null;

  loadingList = true;
  loadingDetail = false;

  errorList: string | null = null;
  errorDetail: string | null = null;

  // Selector de proceso (cuando no se recibe procesoId por ruta)
  procesos: ProcesoModel[] = [];
  procesoSeleccionadoId: number | null = null;
  mostrarSelector = false;
  loadingProcesos = false;

  // Formulario de creación de mensaje CATCH
  catchForm: FormGroup;
  mostrarFormulario = false;
  creando = false;
  errorCreacion: string | null = null;
  exitoCreacion: string | null = null;

  private route = inject(ActivatedRoute);
  private mensajeService = inject(MensajeService);
  private procesoService = inject(ProcesoService);
  private sessionService = inject(Session);
  private fb = inject(FormBuilder);

  constructor() {
    this.catchForm = this.fb.group({
      nombre: ['', Validators.required],
      correlationKey: ['', Validators.required],
      procesoDestinoId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('procesoId') || this.route.snapshot.paramMap.get('id');
    const pid = this.procesoId || (idParam ? Number(idParam) : undefined);

    if (pid) {
      this.cargarMensajesCatch(pid);
      this.cargarProcesos();
    } else {
      this.mostrarSelector = true;
      this.loadingList = false;
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
      this.cargarMensajesCatch(this.procesoSeleccionadoId);
    }
  }

  cargarMensajesCatch(procesoId: number): void {
    this.loadingList = true;
    this.errorList = null;

    this.mensajeService.getMensajes(procesoId).subscribe({
      next: (response) => {
        const todos = response.data || [];
        this.mensajesCatch = todos.filter(m => m.tipo === 'CATCH');
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

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.catchForm.reset();
      this.errorCreacion = null;
      this.exitoCreacion = null;
    }
  }

  crearMensajeCatch(): void {
    if (this.catchForm.invalid) {
      this.catchForm.markAllAsTouched();
      return;
    }

    this.creando = true;
    this.errorCreacion = null;
    this.exitoCreacion = null;

    const { nombre, correlationKey, procesoDestinoId } = this.catchForm.value;

    const mensaje: MensajeModel = {
      nombre,
      payloadJson: '',
      tipo: 'CATCH',
      correlationKey,
      procesoDestino: { id: procesoDestinoId, nombre: '' }
    };

    this.mensajeService.crearMensajeCatch(mensaje).subscribe({
      next: () => {
        this.exitoCreacion = 'Mensaje CATCH creado exitosamente.';
        this.creando = false;
        this.catchForm.reset();

        // Recargar la lista si hay proceso seleccionado
        const pid = this.procesoId ?? this.procesoSeleccionadoId;
        if (pid) {
          this.cargarMensajesCatch(pid);
        }
      },
      error: (err) => {
        console.error('Error creando mensaje CATCH:', err);
        this.errorCreacion = err?.error?.message || 'Error al crear el mensaje CATCH.';
        this.creando = false;
      }
    });
  }
}
