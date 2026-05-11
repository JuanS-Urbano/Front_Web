import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../../../core/services/toast.service';
import { Proceso as ProcesoService } from '../../../services/proceso';
import { Actividad as ActividadService } from '../../../services/actividad';
import { Gateway as GatewayService } from '../../../services/gateway';
import { Arco as ArcoService } from '../../../services/arco';
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
    private laneService: LaneService,
    private actividadService: ActividadService,
    private gatewayService: GatewayService,
    private arcoService: ArcoService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr) {
        this.procesoId = +idStr;
        this.cargarProceso(this.procesoId);
      }
    });
  }

  cargarProceso(id: number): void {
    this.loading = true;
    this.procesoService.getProcesoById(id).subscribe({
      next: (response) => {
        this.proceso = response.data;
        this.loading = false;
        this.cargarDiagrama(id);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al cargar el proceso';
        this.loading = false;
      }
    });
  }

  // Mapas de conversión entre valores frontend y enums del backend
  private readonly tipoActBackend: Record<string, string> = {
    'USER': 'USUARIO', 'SERVICE': 'SERVICIO', 'SCRIPT': 'SCRIPT', 'MANUAL': 'MANUAL',
    'RECEPCION': 'RECEPCION', 'ENVIO': 'ENVIO'
  };
  private readonly tipoActFrontend: Record<string, string> = {
    'USUARIO': 'USER', 'SERVICIO': 'SERVICE', 'SCRIPT': 'SCRIPT', 'MANUAL': 'MANUAL',
    'RECEPCION': 'RECEPCION', 'ENVIO': 'ENVIO'
  };
  private readonly tipoGwBackend: Record<string, string> = {
    'Exclusivo': 'EXCLUSIVO', 'Paralelo': 'PARALELO', 'Inclusivo': 'INCLUSIVO'
  };
  private readonly tipoGwFrontend: Record<string, string> = {
    'EXCLUSIVO': 'Exclusivo', 'PARALELO': 'Paralelo', 'INCLUSIVO': 'Inclusivo'
  };

  cargarDiagrama(id: number): void {
    const empty = { data: [] as any[] };
    forkJoin([
      this.actividadService.getActividades(id).pipe(catchError(() => of(empty))),
      this.gatewayService.getGateways(id).pipe(catchError(() => of(empty))),
      this.arcoService.getArcos(id).pipe(catchError(() => of(empty))),
      this.laneService.getLanes(id).pipe(catchError(() => of(empty)))
    ]).subscribe({
      next: ([actRes, gwRes, arcoRes, laneRes]) => {
        this.actividades = (actRes.data ?? []).map((a: any) => ({
          id: a.id,
          nombre: a.nombre ?? '',
          tipo: this.tipoActFrontend[a.tipoActividad] ?? a.tipoActividad ?? 'MANUAL',
          procesoId: a.proceso?.id ?? id,
          laneId: a.lane?.id ?? 0,
          posicionX: a.posicionX ?? 100,
          posicionY: a.posicionY ?? 100,
        }));
        this.gateways = (gwRes.data ?? []).map((g: any) => ({
          id: g.id,
          nombre: g.nombre ?? '',
          tipo: this.tipoGwFrontend[g.tipoGateway] ?? g.tipoGateway ?? 'Exclusivo',
          procesoId: g.proceso?.id ?? id,
          posicionX: g.posicionX ?? 250,
          posicionY: g.posicionY ?? 100,
        }));
        this.arcos = (arcoRes.data ?? []).map((a: any) => ({
          id: a.id,
          etiqueta: '',
          origenId: +a.origenId,
          destinoId: +a.destinoId,
          procesoId: a.proceso?.id ?? id,
        }));
        this.lanes = (laneRes.data ?? []).sort((a: any, b: any) => (a.orden ?? 0) - (b.orden ?? 0));
      }
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
      posicionX: 100 + (this.actividades.length * 20),
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
      posicionX: 300 + (this.gateways.length * 20),
      posicionY: 100
    };
    this.gateways = [...this.gateways, nuevo];
  }

  onAddArco(): void {
    const todosNodos = [
      ...this.actividades.map(a => ({ id: a.id, tipo: 'act' })),
      ...this.gateways.map(g => ({ id: g.id, tipo: 'gw' }))
    ];
    if (todosNodos.length >= 2) {
      const nuevo: Arco = {
        id: this.nextId--,
        etiqueta: '',
        origenId: todosNodos[todosNodos.length - 2].id,
        destinoId: todosNodos[todosNodos.length - 1].id,
        procesoId: this.procesoId!
      };
      this.arcos = [...this.arcos, nuevo];
    } else {
      this.toastService.mostrarInfo('Necesitás al menos 2 nodos en el canvas para crear un arco.');
    }
  }

  private toActividadDTO(act: Actividad): any {
    return {
      nombre: act.nombre,
      tipoActividad: this.tipoActBackend[act.tipo] ?? act.tipo,
      posicionX: act.posicionX,
      posicionY: act.posicionY,
      proceso: { id: act.procesoId },
      lane: act.laneId ? { id: act.laneId } : null,
    };
  }

  private toGatewayDTO(gw: Gateway): any {
    return {
      nombre: gw.nombre,
      tipoGateway: this.tipoGwBackend[gw.tipo] ?? gw.tipo.toUpperCase(),
      posicionX: gw.posicionX,
      posicionY: gw.posicionY,
      proceso: { id: gw.procesoId },
    };
  }

  private toArcoDTO(arco: Arco): any {
    return {
      origenId: String(arco.origenId),
      destinoId: String(arco.destinoId),
      proceso: { id: arco.procesoId },
    };
  }

  onSaveDiagram(): void {
    const peticiones: Observable<any>[] = [];

    this.actividades.forEach(act => {
      if (act.id < 0) {
        peticiones.push(this.actividadService.crearActividad(this.toActividadDTO(act)));
      } else if (act.id > 0) {
        peticiones.push(this.actividadService.updateActividad(act.id, this.toActividadDTO(act)));
      }
    });

    this.gateways.forEach(gw => {
      if (gw.id < 0) {
        peticiones.push(this.gatewayService.crearGateway(this.toGatewayDTO(gw)));
      } else if (gw.id > 0) {
        peticiones.push(this.gatewayService.updateGateway(gw.id, this.toGatewayDTO(gw)));
      }
    });

    this.arcos.forEach(arco => {
      if (arco.id < 0) {
        peticiones.push(this.arcoService.crearArco(this.toArcoDTO(arco)));
      } else if (arco.id > 0) {
        peticiones.push(this.arcoService.updateArco(arco.id, this.toArcoDTO(arco)));
      }
    });

    if (peticiones.length > 0) {
      forkJoin(peticiones).subscribe({
        next: () => {
          this.toastService.mostrarExito('Diagrama guardado correctamente');
          if (this.procesoId) {
            this.cargarDiagrama(this.procesoId);
          }
        },
        error: () => this.toastService.mostrarError('Error al guardar el diagrama')
      });
    } else {
      this.toastService.mostrarInfo('No hay cambios pendientes de guardar');
    }
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

