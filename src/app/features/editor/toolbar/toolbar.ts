import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {
  @Output() addActividad = new EventEmitter<void>();
  @Output() addGateway = new EventEmitter<string>(); // 'Exclusivo', 'Inclusivo', 'Paralelo'
  @Output() addArco = new EventEmitter<void>();
  @Output() saveDiagram = new EventEmitter<void>();

  onAddActividad(): void {
    this.addActividad.emit();
  }

  onAddGateway(tipo: string): void {
    this.addGateway.emit(tipo);
  }

  onAddArco(): void {
    this.addArco.emit();
  }

  onSave(): void {
    this.saveDiagram.emit();
  }
}
