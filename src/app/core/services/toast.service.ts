import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastState {
  visible: boolean;
  tipo: 'success' | 'error' | 'info';
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private state = new BehaviorSubject<ToastState>({
    visible: false,
    tipo: 'info',
    mensaje: ''
  });

  state$ = this.state.asObservable();

  mostrarExito(mensaje: string): void {
    this.state.next({ visible: true, tipo: 'success', mensaje });
    setTimeout(() => this.cerrar(), 3500);
  }

  mostrarError(mensaje: string): void {
    this.state.next({ visible: true, tipo: 'error', mensaje });
    setTimeout(() => this.cerrar(), 4500);
  }

  mostrarInfo(mensaje: string): void {
    this.state.next({ visible: true, tipo: 'info', mensaje });
    setTimeout(() => this.cerrar(), 3000);
  }

  cerrar(): void {
    this.state.next({ ...this.state.value, visible: false });
  }
}
