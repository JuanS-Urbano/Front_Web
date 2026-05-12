import { Component, OnInit, DestroyRef, inject, ChangeDetectorRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
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

  private destroyRef = inject(DestroyRef);

  // Counters for mock IDs (since backend creates real IDs, we use negative for new un-saved elements)
  private nextId = -1;

  constructor(
    private route: ActivatedRoute,
    private procesoService: ProcesoService,
    private laneService: LaneService,
    private actividadService: ActividadService,
    private gatewayService: GatewayService,
    private arcoService: ArcoService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
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
        // Lanzar carga del diagrama, cdr se actualizará al final
        this.cargarDiagrama(id);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al cargar el proceso';
        this.loading = false;
        this.cdr.markForCheck();
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
    ]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
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
        
        // Todo listo, quitamos loading y forzamos renderizado en Zoneless
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Error al cargar los elementos del diagrama';
        this.loading = false;
        this.cdr.markForCheck();
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
    // idMap: temporary frontend negative ID → real backend ID
    const idMap = new Map<number, number>();

    const newActs$ = this.actividades
      .filter(a => a.id < 0)
      .map(act => this.actividadService.crearActividad(this.toActividadDTO(act)).pipe(
        tap((res: any) => { if (res.data?.id) idMap.set(act.id, res.data.id); })
      ));

    const newGws$ = this.gateways
      .filter(g => g.id < 0)
      .map(gw => this.gatewayService.crearGateway(this.toGatewayDTO(gw)).pipe(
        tap((res: any) => { if (res.data?.id) idMap.set(gw.id, res.data.id); })
      ));

    const updateActs$ = this.actividades
      .filter(a => a.id > 0)
      .map(act => this.actividadService.updateActividad(act.id, this.toActividadDTO(act)));

    const updateGws$ = this.gateways
      .filter(g => g.id > 0)
      .map(gw => this.gatewayService.updateGateway(gw.id, this.toGatewayDTO(gw)));

    const creates$ = [...newActs$, ...newGws$];
    const updates$ = [...updateActs$, ...updateGws$];
    const arcosPendientes = this.arcos.filter(a => a.id !== 0);

    const totalOps = creates$.length + updates$.length + arcosPendientes.length;
    if (totalOps === 0) {
      this.toastService.mostrarInfo('No hay cambios pendientes de guardar');
      return;
    }

    const fase1$ = creates$.length > 0 ? forkJoin(creates$) : of([]);
    const fase2$ = updates$.length > 0 ? forkJoin(updates$) : of([]);

    // Fase 1 (crear nuevos para poblar idMap) → Fase 2 (actualizar existentes) → Fase 3 (arcos con IDs reales)
    fase1$.pipe(
      switchMap(() => fase2$),
      switchMap(() => {
        const arcoOps = arcosPendientes.map(arco => {
          const realOrigenId = idMap.get(arco.origenId) ?? arco.origenId;
          const realDestinoId = idMap.get(arco.destinoId) ?? arco.destinoId;
          const dto = this.toArcoDTO({ ...arco, origenId: realOrigenId, destinoId: realDestinoId });
          return arco.id < 0
            ? this.arcoService.crearArco(dto)
            : this.arcoService.updateArco(arco.id, dto);
        });
        return arcoOps.length > 0 ? forkJoin(arcoOps) : of([]);
      })
    ).subscribe({
      next: () => {
        this.toastService.mostrarExito('Diagrama guardado correctamente');
        if (this.procesoId) this.cargarDiagrama(this.procesoId);
      },
      error: () => this.toastService.mostrarError('Error al guardar el diagrama')
    });
  }

  onDeleteSelectedElement(): void {
    if (!this.selectedElement) return;
    const el = this.selectedElement;

    if (el.type === 'ACTIVIDAD') {
      const act = el.data as Actividad;
      if (act.id < 0) {
        this.actividades = this.actividades.filter(a => a.id !== act.id);
        this.arcos = this.arcos.filter(a => a.origenId !== act.id && a.destinoId !== act.id);
      } else {
        this.actividadService.deleteActividad(act.id).subscribe({
          next: () => {
            this.actividades = this.actividades.filter(a => a.id !== act.id);
            this.arcos = this.arcos.filter(a => a.origenId !== act.id && a.destinoId !== act.id);
            this.toastService.mostrarExito('Actividad eliminada');
          },
          error: () => this.toastService.mostrarError('Error al eliminar la actividad')
        });
      }
    } else if (el.type === 'GATEWAY') {
      const gw = el.data as Gateway;
      if (gw.id < 0) {
        this.gateways = this.gateways.filter(g => g.id !== gw.id);
        this.arcos = this.arcos.filter(a => a.origenId !== gw.id && a.destinoId !== gw.id);
      } else {
        this.gatewayService.deleteGateway(gw.id).subscribe({
          next: () => {
            this.gateways = this.gateways.filter(g => g.id !== gw.id);
            this.arcos = this.arcos.filter(a => a.origenId !== gw.id && a.destinoId !== gw.id);
            this.toastService.mostrarExito('Gateway eliminado');
          },
          error: () => this.toastService.mostrarError('Error al eliminar el gateway')
        });
      }
    } else if (el.type === 'ARCO') {
      const arco = el.data as Arco;
      if (arco.id < 0) {
        this.arcos = this.arcos.filter(a => a.id !== arco.id);
      } else {
        this.arcoService.deleteArco(arco.id).subscribe({
          next: () => {
            this.arcos = this.arcos.filter(a => a.id !== arco.id);
            this.toastService.mostrarExito('Arco eliminado');
          },
          error: () => this.toastService.mostrarError('Error al eliminar el arco')
        });
      }
    }
    this.selectedElement = null;
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

