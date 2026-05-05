import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-toast-notification',
  imports: [],
  templateUrl: './toast-notification.html',
  styleUrl: './toast-notification.css',
})
export class ToastNotification implements OnChanges, OnDestroy {
  @Input() tipo: 'success' | 'error' | 'info' = 'info';
  @Input() mensaje = '';
  @Input() visible = false;
  @Input() duracion = 3000; // milisegundos
  @Output() cerrado = new EventEmitter<void>();

  isHiding = false;
  private timeoutId: any;
  private hideTimeoutId: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && changes['visible'].currentValue === true) {
      // Reset animations
      this.isHiding = false;
      
      // Clear any existing timeouts
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      if (this.hideTimeoutId) {
        clearTimeout(this.hideTimeoutId);
      }

      // Start hide animation after duration
      this.timeoutId = setTimeout(() => {
        this.iniciarCierre();
      }, this.duracion);
    }
  }

  private iniciarCierre(): void {
    this.isHiding = true;
    // Wait for animation to complete (400ms) before emitting event
    this.hideTimeoutId = setTimeout(() => {
      this.cerrado.emit();
    }, 400);
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
    }
  }
}
