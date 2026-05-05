import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Notificacion as NotificacionService } from '../../../services/notificacion';
import { NotificacionRequest } from '../../../models/notificacion-request';
import { NotificacionResponse } from '../../../models/notificacion-response';
import { Session } from '../../../core/services/session';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinner],
  templateUrl: './notificaciones.html',
  styleUrl: './notificaciones.css',
})
export class Notificaciones implements OnInit {
  notificacionForm: FormGroup;
  notificaciones: NotificacionResponse[] = [];
  
  loadingForm = false;
  loadingList = true;
  
  errorForm: string | null = null;
  errorList: string | null = null;
  exitoForm: string | null = null;

  private fb = inject(FormBuilder);
  private notificacionService = inject(NotificacionService);
  private sessionService = inject(Session);

  constructor() {
    const empresaId = this.sessionService.getEmpresaId() ?? 1;
    this.notificacionForm = this.fb.group({
      destino: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      contenido: ['', Validators.required],
      tipo: ['EMAIL', Validators.required],
      procesoId: [empresaId, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.loadingList = true;
    this.errorList = null;
    
    this.notificacionService.getNotificaciones().subscribe({
      next: (response) => {
        this.notificaciones = response.data || [];
        this.loadingList = false;
      },
      error: (err) => {
        console.error('Error cargando notificaciones:', err);
        this.errorList = 'No se pudo cargar el historial de notificaciones.';
        this.loadingList = false;
      }
    });
  }

  onSubmit(): void {
    if (this.notificacionForm.invalid) {
      this.notificacionForm.markAllAsTouched();
      return;
    }

    this.loadingForm = true;
    this.errorForm = null;
    this.exitoForm = null;

    const request: NotificacionRequest = this.notificacionForm.value;

    this.notificacionService.enviarNotificacion(request).subscribe({
      next: () => {
        this.exitoForm = 'Notificación enviada exitosamente.';
        this.loadingForm = false;
        
        // Reset form, preserving hidden or default fields
        this.notificacionForm.reset({
          tipo: 'EMAIL',
          procesoId: request.procesoId
        });
        
        // Refresh table
        this.cargarHistorial();
      },
      error: (err) => {
        console.error('Error enviando notificación:', err);
        this.errorForm = err?.error?.message || 'Error al enviar la notificación.';
        this.loadingForm = false;
      }
    });
  }
}
