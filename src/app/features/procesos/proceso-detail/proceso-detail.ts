import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Proceso as ProcesoService } from '../../../services/proceso';
import { Proceso as ProcesoModel } from '../../../models/proceso';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';

// Import Editor Components
import { EditorCanvas, EditorElement } from '../../editor/editor-canvas/editor-canvas';
import { Toolbar } from '../../editor/toolbar/toolbar';
import { PropiedadesActividad } from '../../editor/propiedades-actividad/propiedades-actividad';
import { PropiedadesGateway } from '../../editor/propiedades-gateway/propiedades-gateway';
import { PropiedadesArco } from '../../editor/propiedades-arco/propiedades-arco';
import { LanesManager } from '../../lanes/lanes-manager/lanes-manager';
import { Historial } from '../../historial/historial';
import { PoolConfig } from '../../historial/pool-config/pool-config';

// Import Models
import { Actividad } from '../../../models/actividad';
import { Gateway } from '../../../models/gateway';
import { Arco } from '../../../models/arco';
import { Lane } from '../../../models/lane';
import { Lane as LaneService } from '../../../services/lane';

@Component({
  selector: 'app-proceso-detail',
  imports: [
    CommonModule, RouterLink, LoadingSpinner, 
    EditorCanvas, Toolbar, PropiedadesActividad, PropiedadesGateway, PropiedadesArco, LanesManager, Historial, PoolConfig
  ],
  templateUrl: './proceso-detail.html',
  styleUrl: './proceso-detail.css',
})
export class ProcesoDetail implements OnInit {
  procesoId: number | null = null;
  proceso: ProcesoModel | null = null;
  loading = true;
  errorMessage = '';

  activeTab: 'editor' | 'historial' | 'pool' = 'editor';

  // Editor State
  actividades: Actividad[] = [];
  gateways: Gateway[] = [];
  arcos: Arco[] = [];
  lanes: Lane[] = [];
  
  selectedElement: EditorElement | null = null;

  // Counters for mock IDs (since backend creates real IDs, we use negative for new un-saved elements)
  private nextId = -1;

  constructor(
    private route: ActivatedRoute,
    private procesoService: ProcesoService,
    private laneService: LaneService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr) {
        this.procesoId = +idStr;
        this.cargarProceso(this.procesoId);
        this.cargarDiagrama(this.procesoId);
      }
    });
  }

  cargarProceso(id: number): void {
    this.loading = true;
    this.procesoService.getProcesoById(id).subscribe({
      next: (response) => {
        this.proceso = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al cargar el proceso';
        this.loading = false;
      }
    });
  }

  cargarDiagrama(id: number): void {
    // In a real app, you would fetch Actividades, Gateways, and Arcos here via Services.
    // For now, we initialize them empty to allow the user to start drawing.
    this.actividades = [];
    this.gateways = [];
    this.arcos = [];

    // Fetch lanes
    this.laneService.getLanes(id).subscribe({
      next: (response) => {
        this.lanes = response.data.sort((a, b) => a.orden - b.orden);
      },
      error: (err) => console.error('Error cargando lanes en editor', err)
    });
  }

  // --- Toolbar Handlers ---
  
  onAddActividad(): void {
    const nueva: Actividad = {
      id: this.nextId--,
      nombre: 'Nueva Actividad',
      tipo: 'USER',
      procesoId: this.procesoId!,
      laneId: 0,
      posicionX: 100,
      posicionY: 100
    };
    this.actividades = [...this.actividades, nueva];
  }

  onAddGateway(tipo: string): void {
    const nuevo: Gateway = {
      id: this.nextId--,
      nombre: 'Nuevo Gateway',
      tipo: tipo,
      procesoId: this.procesoId!,
      posicionX: 250,
      posicionY: 100
    };
    this.gateways = [...this.gateways, nuevo];
  }

  onAddArco(): void {
    // Simplistic approach: connect first two nodes if available, just to demonstrate
    if (this.actividades.length > 0 && this.gateways.length > 0) {
      const nuevo: Arco = {
        id: this.nextId--,
        etiqueta: '',
        origenId: this.actividades[0].id,
        destinoId: this.gateways[0].id,
        procesoId: this.procesoId!
      };
      this.arcos = [...this.arcos, nuevo];
    } else {
      alert('Necesitas al menos un nodo de origen y otro de destino para crear un arco (por ahora mockeado)');
    }
  }

  onSaveDiagram(): void {
    // Here we would call the services to save the Actividades, Gateways, and Arcos
    console.log('Guardando diagrama:', {
      actividades: this.actividades,
      gateways: this.gateways,
      arcos: this.arcos
    });
    alert('Diagrama guardado en consola (Mock)');
  }

  // --- Canvas Handlers ---

  onElementSelected(element: EditorElement | null): void {
    this.selectedElement = element;
  }

  onNodeMoved(): void {
    // Node moved, force update of references so Angular re-renders the SVG lines
    this.arcos = [...this.arcos];
  }

  // --- Properties Handlers ---

  onActividadModificada(actividad: Actividad): void {
    const idx = this.actividades.findIndex(a => a.id === actividad.id);
    if (idx !== -1) {
      this.actividades[idx] = actividad;
      this.actividades = [...this.actividades];
    }
  }

  onGatewayModificado(gateway: Gateway): void {
    const idx = this.gateways.findIndex(g => g.id === gateway.id);
    if (idx !== -1) {
      this.gateways[idx] = gateway;
      this.gateways = [...this.gateways];
    }
  }

  onArcoModificado(arco: Arco): void {
    const idx = this.arcos.findIndex(a => a.id === arco.id);
    if (idx !== -1) {
      this.arcos[idx] = arco;
      this.arcos = [...this.arcos];
    }
  }
}

