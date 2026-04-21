import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Componente reutilizable: Diálogo de confirmación.
 * Componente hijo que se muestra al intentar eliminar o realizar acciones destructivas.
 *
 * Uso: <app-confirm-dialog [visible]="true" [mensaje]="'¿Eliminar?'" (confirmar)="onConfirm()" (cancelar)="onCancel()">
 */
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  @Input() visible = false;
  @Input() titulo = 'Confirmación';
  @Input() mensaje = '¿Estás seguro de realizar esta acción?';
  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  onConfirmar(): void {
    this.confirmar.emit();
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}
