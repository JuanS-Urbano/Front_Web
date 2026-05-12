import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProcesoDetail } from './proceso-detail';
import { Proceso as ProcesoService } from '../../../services/proceso';
import { Actividad as ActividadService } from '../../../services/actividad';
import { Gateway as GatewayService } from '../../../services/gateway';
import { Arco as ArcoService } from '../../../services/arco';
import { Lane as LaneService } from '../../../services/lane';
import { ToastService } from '../../../core/services/toast.service';

// ---------------------------------------------------------------------------
// Stub data
// ---------------------------------------------------------------------------

const mockProceso = { id: 10, nombre: 'Test Proceso', descripcion: '', categoria: 'RRHH', estado: 'ACTIVO' };

const mockActividades = [
  { id: 1, nombre: 'Act1', tipoActividad: 'USUARIO', proceso: { id: 10 }, lane: { id: 2 }, posicionX: 100, posicionY: 100 },
  { id: 2, nombre: 'Act2', tipoActividad: 'SERVICIO', proceso: { id: 10 }, lane: null,    posicionX: 200, posicionY: 100 },
];

const mockGateways = [
  { id: 10, nombre: 'GW1', tipoGateway: 'EXCLUSIVO', proceso: { id: 10 }, posicionX: 300, posicionY: 100 },
];

const mockArcos = [
  { id: 20, origenId: '1', destinoId: '10', proceso: { id: 10 } },
];

const mockLanes = [
  { id: 2, nombre: 'Lane1', orden: 1, proceso: { id: 10 } },
];

function apiOf<T>(data: T) {
  return of({ success: true, message: 'OK', data });
}

function makeActivatedRoute(id = '10') {
  return {
    paramMap: of({ get: (_key: string) => id }),
    snapshot: { paramMap: { get: (_k: string) => id } },
  };
}

function makeProcesoSvc() {
  return {
    getProcesoById: vi.fn().mockReturnValue(apiOf(mockProceso)),
  };
}

function makeActividadSvc() {
  return { getActividades: vi.fn().mockReturnValue(apiOf(mockActividades)) };
}

function makeGatewaySvc() {
  return { getGateways: vi.fn().mockReturnValue(apiOf(mockGateways)) };
}

function makeArcoSvc() {
  return { getArcos: vi.fn().mockReturnValue(apiOf(mockArcos)) };
}

function makeLaneSvc() {
  return { getLanes: vi.fn().mockReturnValue(apiOf(mockLanes)) };
}

function makeToast() {
  return { mostrarExito: vi.fn(), mostrarError: vi.fn(), mostrarInfo: vi.fn() };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ProcesoDetail', () => {
  let component: ProcesoDetail;
  let fixture: ComponentFixture<ProcesoDetail>;
  let procesoSvc: ReturnType<typeof makeProcesoSvc>;
  let actividadSvc: ReturnType<typeof makeActividadSvc>;
  let gatewaySvc: ReturnType<typeof makeGatewaySvc>;
  let arcoSvc: ReturnType<typeof makeArcoSvc>;
  let laneSvc: ReturnType<typeof makeLaneSvc>;

  beforeEach(async () => {
    procesoSvc  = makeProcesoSvc();
    actividadSvc = makeActividadSvc();
    gatewaySvc  = makeGatewaySvc();
    arcoSvc     = makeArcoSvc();
    laneSvc     = makeLaneSvc();

    await TestBed.configureTestingModule({
      imports: [ProcesoDetail],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute,  useValue: makeActivatedRoute() },
        { provide: ProcesoService,  useValue: procesoSvc },
        { provide: ActividadService, useValue: actividadSvc },
        { provide: GatewayService,  useValue: gatewaySvc },
        { provide: ArcoService,     useValue: arcoSvc },
        { provide: LaneService,     useValue: laneSvc },
        { provide: ToastService,    useValue: makeToast() },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(ProcesoDetail);
    component = fixture.componentInstance;
  });

  // -----------------------------------------------------------------------
  // 1. Componente crea sin errores
  // -----------------------------------------------------------------------
  it('debe crear el componente', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // -----------------------------------------------------------------------
  // 2. cargarDiagrama() carga actividades, gateways, arcos y lanes
  // -----------------------------------------------------------------------
  it('cargarDiagrama() asigna actividades, gateways, arcos y lanes correctamente', () => {
    fixture.detectChanges(); // dispara ngOnInit → cargarProceso → cargarDiagrama

    expect(actividadSvc.getActividades).toHaveBeenCalledWith(10);
    expect(gatewaySvc.getGateways).toHaveBeenCalledWith(10);
    expect(arcoSvc.getArcos).toHaveBeenCalledWith(10);
    expect(laneSvc.getLanes).toHaveBeenCalledWith(10);

    expect(component.actividades).toHaveLength(2);
    expect(component.gateways).toHaveLength(1);
    expect(component.arcos).toHaveLength(1);
    expect(component.lanes).toHaveLength(1);
  });

  it('cargarDiagrama() convierte tipoActividad del backend al formato frontend', () => {
    fixture.detectChanges();

    expect(component.actividades[0].tipo).toBe('USER');    // USUARIO → USER
    expect(component.actividades[1].tipo).toBe('SERVICE'); // SERVICIO → SERVICE
  });

  it('cargarDiagrama() convierte tipoGateway del backend al formato frontend', () => {
    fixture.detectChanges();

    expect(component.gateways[0].tipo).toBe('Exclusivo'); // EXCLUSIVO → Exclusivo
  });

  it('cargarDiagrama() mapea origenId y destinoId de arcos como números', () => {
    fixture.detectChanges();

    expect(typeof component.arcos[0].origenId).toBe('number');
    expect(typeof component.arcos[0].destinoId).toBe('number');
    expect(component.arcos[0].origenId).toBe(1);
    expect(component.arcos[0].destinoId).toBe(10);
  });

  // -----------------------------------------------------------------------
  // 3. onAddActividad() agrega actividad con id negativo al array
  // -----------------------------------------------------------------------
  it('onAddActividad() agrega una actividad con id negativo al array', () => {
    fixture.detectChanges();
    const cantidadAntes = component.actividades.length;

    component.onAddActividad();

    expect(component.actividades).toHaveLength(cantidadAntes + 1);
    const nueva = component.actividades[component.actividades.length - 1];
    expect(nueva.id).toBeLessThan(0);
    expect(nueva.nombre).toBe('Nueva Actividad');
    expect(nueva.tipo).toBe('USER');
  });

  it('onAddActividad() asigna procesoId correcto a la nueva actividad', () => {
    fixture.detectChanges();

    component.onAddActividad();

    const nueva = component.actividades[component.actividades.length - 1];
    expect(nueva.procesoId).toBe(10);
  });

  it('cada llamada a onAddActividad() usa un id negativo diferente', () => {
    fixture.detectChanges();

    component.onAddActividad();
    component.onAddActividad();

    const ids = component.actividades.filter(a => a.id < 0).map(a => a.id);
    const unicos = new Set(ids);
    expect(unicos.size).toBe(ids.length);
  });

  // -----------------------------------------------------------------------
  // 4. El estado inicial es loading mientras no hay respuesta
  // -----------------------------------------------------------------------
  it('loading inicia en true y pasa a false tras cargar el proceso', () => {
    // Before detectChanges loading === true
    expect(component.loading).toBe(true);

    fixture.detectChanges();

    expect(component.loading).toBe(false);
  });
});
