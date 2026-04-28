import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DragDropModule, CdkDragEnd } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Actividad } from '../../../models/actividad';
import { Gateway } from '../../../models/gateway';
import { Arco } from '../../../models/arco';
import { Lane } from '../../../models/lane';

export type EditorElement = { type: 'ACTIVIDAD'; data: Actividad } | { type: 'GATEWAY'; data: Gateway } | { type: 'ARCO'; data: Arco };

@Component({
  selector: 'app-editor-canvas',
  standalone: true,
  imports: [DragDropModule, CommonModule],
  templateUrl: './editor-canvas.html',
  styleUrl: './editor-canvas.css',
})
export class EditorCanvas implements AfterViewInit {
  @Input() actividades: Actividad[] = [];
  @Input() gateways: Gateway[] = [];
  @Input() arcos: Arco[] = [];
  @Input() lanes: Lane[] = [];

  @Output() elementSelected = new EventEmitter<EditorElement | null>();
  @Output() nodeMoved = new EventEmitter<void>(); // Emit to parent if needed to trigger save state

  @ViewChild('canvasBoundary') canvasBoundary!: ElementRef;

  selectedElementId: string | null = null;

  ngAfterViewInit(): void {
    // Canvas is ready
  }

  selectActividad(actividad: Actividad, event: MouseEvent): void {
    event.stopPropagation();
    this.selectedElementId = `act-${actividad.id}`;
    this.elementSelected.emit({ type: 'ACTIVIDAD', data: actividad });
  }

  selectGateway(gateway: Gateway, event: MouseEvent): void {
    event.stopPropagation();
    this.selectedElementId = `gat-${gateway.id}`;
    this.elementSelected.emit({ type: 'GATEWAY', data: gateway });
  }

  clearSelection(): void {
    this.selectedElementId = null;
    this.elementSelected.emit(null);
  }

  onDragEnd(event: CdkDragEnd, element: Actividad | Gateway): void {
    const transform = event.source.getFreeDragPosition();
    // Update model coordinates
    element.posicionX += transform.x;
    element.posicionY += transform.y;
    
    // Reset transform so standard layout relies on top/left
    event.source.reset();
    
    this.nodeMoved.emit();
  }

  // Helper to draw lines
  getArcoPath(arco: Arco): string {
    const origin = this.getNodeCenter(arco.origenId);
    const dest = this.getNodeCenter(arco.destinoId);
    if (!origin || !dest) return '';

    // Simple line path
    return `M ${origin.x} ${origin.y} L ${dest.x} ${dest.y}`;
  }

  getNodeCenter(id: number): { x: number, y: number } | null {
    // Search in actividades
    let act = this.actividades.find(a => a.id === id);
    if (act) {
      return { x: act.posicionX + 60, y: act.posicionY + 30 }; // Assuming width 120, height 60
    }
    // Search in gateways
    let gat = this.gateways.find(g => g.id === id);
    if (gat) {
      return { x: gat.posicionX + 30, y: gat.posicionY + 30 }; // Assuming width 60, height 60
    }
    return null;
  }
}
