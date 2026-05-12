import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { ProcesosList } from './procesos-list';
import { Proceso as ProcesoService } from '../../../services/proceso';
import { Session } from '../../../core/services/session';
import { ToastService } from '../../../core/services/toast.service';
import { Proceso as ProcesoModel } from '../../../models/proceso';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const mockProcesos: ProcesoModel[] = [
  { id: 1, nombre: 'Proceso Alpha', descripcion: 'Desc A', categoria: 'RRHH', estado: 'ACTIVO' },
  { id: 2, nombre: 'Proceso Beta',  descripcion: 'Desc B', categoria: 'TI',   estado: 'ACTIVO' },
  { id: 3, nombre: 'Otro Gamma',    descripcion: 'Desc C', categoria: 'RRHH', estado: 'ACTIVO' },
];

function makeProcesoServiceSpy() {
  return {
    getProcesos: vi.fn().mockReturnValue(of({ success: true, message: 'OK', data: mockProcesos })),
    deleteProceso: vi.fn().mockReturnValue(of({ success: true, message: 'Eliminado', data: undefined })),
  };
}

function makeSessionSpy(poolId: number | null = 1) {
  return {
    session$: of(null),
    getPoolId: vi.fn().mockReturnValue(poolId),
    getEmpresaId: vi.fn().mockReturnValue(null),
    getUserRole: vi.fn().mockReturnValue('ADMIN'),
  };
}

function makeToastSpy() {
  return {
    mostrarExito: vi.fn(),
    mostrarError: vi.fn(),
    mostrarInfo:  vi.fn(),
  };
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe('ProcesosList', () => {
  let component: ProcesosList;
  let fixture: ComponentFixture<ProcesosList>;
  let procesoServiceSpy: ReturnType<typeof makeProcesoServiceSpy>;
  let toastSpy: ReturnType<typeof makeToastSpy>;

  beforeEach(async () => {
    procesoServiceSpy = makeProcesoServiceSpy();
    toastSpy = makeToastSpy();

    await TestBed.configureTestingModule({
      imports: [ProcesosList],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ProcesoService, useValue: procesoServiceSpy },
        { provide: Session,        useValue: makeSessionSpy() },
        { provide: ToastService,   useValue: toastSpy },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(ProcesosList);
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
  // 2. cargarProcesos() asigna procesos y procesosFiltrados
  // -----------------------------------------------------------------------
  it('cargarProcesos() debe asignar procesos y procesosFiltrados cuando el servicio responde OK', () => {
    fixture.detectChanges(); // dispara ngOnInit → cargarProcesos()

    expect(procesoServiceSpy.getProcesos).toHaveBeenCalledWith(1);
    expect(component.procesos).toHaveLength(3);
    expect(component.procesosFiltrados).toHaveLength(3);
    expect(component.loading).toBe(false);
  });

  it('cargarProcesos() asigna lista vacía y muestra toast cuando el servicio falla', () => {
    procesoServiceSpy.getProcesos.mockReturnValue(
      throwError(() => ({ error: { message: 'Error de red' } }))
    );

    fixture.detectChanges();

    expect(component.procesos).toHaveLength(0);
    expect(component.loading).toBe(false);
    expect(toastSpy.mostrarError).toHaveBeenCalledWith('Error de red');
  });

  // -----------------------------------------------------------------------
  // 3. onSearch() filtra correctamente por nombre
  // -----------------------------------------------------------------------
  it('onSearch() filtra procesos por nombre (case-insensitive)', () => {
    fixture.detectChanges();

    component.onSearch('alpha');
    expect(component.procesosFiltrados).toHaveLength(1);
    expect(component.procesosFiltrados[0].nombre).toBe('Proceso Alpha');
  });

  it('onSearch() filtra procesos por categoría', () => {
    fixture.detectChanges();

    component.onSearch('TI');
    expect(component.procesosFiltrados).toHaveLength(1);
    expect(component.procesosFiltrados[0].id).toBe(2);
  });

  it('onSearch() restaura lista completa cuando el término está vacío', () => {
    fixture.detectChanges();

    component.onSearch('alpha');
    component.onSearch('');
    expect(component.procesosFiltrados).toHaveLength(3);
  });

  // -----------------------------------------------------------------------
  // 4. prepararEliminacion() establece procesoIdAEliminar y mostrarConfirmacion
  // -----------------------------------------------------------------------
  it('prepararEliminacion() establece procesoIdAEliminar=id y mostrarConfirmacion=true', () => {
    fixture.detectChanges();

    component.prepararEliminacion(42);

    expect(component.procesoIdAEliminar).toBe(42);
    expect(component.mostrarConfirmacion).toBe(true);
  });

  it('prepararEliminacion() no hace nada cuando id es undefined', () => {
    fixture.detectChanges();

    component.prepararEliminacion(undefined);

    expect(component.procesoIdAEliminar).toBeNull();
    expect(component.mostrarConfirmacion).toBe(false);
  });

  // -----------------------------------------------------------------------
  // 5. cancelarEliminacion() revierte el estado de confirmación
  // -----------------------------------------------------------------------
  it('cancelarEliminacion() limpia procesoIdAEliminar y oculta confirmación', () => {
    fixture.detectChanges();

    component.prepararEliminacion(5);
    component.cancelarEliminacion();

    expect(component.procesoIdAEliminar).toBeNull();
    expect(component.mostrarConfirmacion).toBe(false);
  });
});
