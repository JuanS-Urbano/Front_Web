import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Mensaje as MensajeService } from '../../../services/mensaje';
import { Mensaje as MensajeModel } from '../../../models/mensaje';
import { CorrelacionResult } from '../../../models/correlacion-result';

@Component({
  selector: 'app-throw-message-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './throw-message-form.html',
  styleUrl: './throw-message-form.css',
})
export class ThrowMessageForm {
  messageForm: FormGroup;
  resultado: CorrelacionResult | null = null;
  cargando = false;
  error: string | null = null;

  private fb = inject(FormBuilder);
  private mensajeService = inject(MensajeService);

  constructor() {
    this.messageForm = this.fb.group({
      nombre: ['', Validators.required],
      estado: [{ value: 'THROW', disabled: true }, Validators.required], // 'tipo' fijado en THROW
      payload: ['', Validators.required],     // contenido
      procesoOrigenId: [null, [Validators.required, Validators.min(1)]],
      procesoDestinoId: [null, [Validators.required, Validators.min(1)]]
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

    const mensaje: MensajeModel = {
      id: 0,
      ...this.messageForm.getRawValue() // getRawValue() incluye campos disabled como 'estado'
    };

    this.mensajeService.enviarMensaje(mensaje).subscribe({
      next: (response) => {
        this.resultado = response.data as CorrelacionResult;
        this.cargando = false;
        this.messageForm.reset({ estado: 'THROW' });
      },
      error: (err) => {
        console.error('Error enviando mensaje:', err);
        this.error = err?.error?.message || 'Hubo un error al enviar el mensaje.';
        this.cargando = false;
      }
    });
  }
}
