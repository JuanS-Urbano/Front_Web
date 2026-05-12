import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

import { MensajesList } from './mensajes-list';
import { Mensaje as MensajeService } from '../../../services/mensaje';
import { Proceso as ProcesoService } from '../../../services/proceso';
import { Session } from '../../../core/services/session';
import { ToastService } from '../../../core/services/toast.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeActivatedRoute(procesoId: string | null = null) {
  return {
    snapshot: {
      paramMap: { get: (key: string) => (key === 'procesoId' || key === 'id' ? procesoId : null) },
    },
  };
}

const mockMensajes = [
  { id: 1, nombre: 'Msg1', payloadJson: '{}', tipo: 'THROW', correlationKey: 'key-1' },
];

function makeMensajeSvc() {
  return {
    getMensajes:  vi.fn().mockReturnValue(of({ success: true, message: 'OK', data: mockMensajes })),
    correlacionar: vi.fn().mockReturnValue(of({ success: true, message: 'Correlacionado', data: {} })),
  };
}

function makeProcesoSvc() {
  return {
    getProcesos: vi.fn().mockReturnValue(
      of({ success: true, message: 'OK', data: [{ id: 1, nombre: 'ProcA' }] })
    ),
  };
}

function makeSessionSvc() {
  return {
    getPoolId:    vi.fn().mockReturnValue(1),
    getEmpresaId: vi.fn().mockReturnValue(null),
    session$: of(null),
  };
}

function makeToastSvc() {
  return {
    mostrarExito: vi.fn(),
    mostrarError: vi.fn(),
    mostrarInfo:  vi.fn(),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('MensajesList', () => {
  let component: MensajesList;
  let fixture: ComponentFixture<MensajesList>;
  let mensajeSvc: ReturnType<typeof makeMensajeSvc>;
  let toastSvc: ReturnType<typeof makeToastSvc>;

  async function buildComponent(procesoId: string | null = null) {
    mensajeSvc = makeMensajeSvc();
    toastSvc   = makeToastSvc();

    await TestBed.configureTestingModule({
      imports: [MensajesList],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute,  useValue: makeActivatedRoute(procesoId) },
        { provide: MensajeService,  useValue: mensajeSvc },
        { provide: ProcesoService,  useValue: makeProcesoSvc() },
        { provide: Session,         useValue: makeSessionSvc() },
        { provide: ToastService,    useValue: toastSvc },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(MensajesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  // -----------------------------------------------------------------------
  // 1. Componente crea sin errores (sin procesoId en ruta)
  // -----------------------------------------------------------------------
  it('debe crear el componente sin procesoId en ruta', async () => {
    await buildComponent(null);
    expect(component).toBeTruthy();
    expect(component.mostrarSelector).toBe(true);
  });

  // -----------------------------------------------------------------------
  // 2. Componente crea y carga mensajes si hay procesoId en la ruta
  // -----------------------------------------------------------------------
  it('carga mensajes automáticamente cuando hay procesoId en la ruta', async () => {
    await buildComponent('5');

    expect(mensajeSvc.getMensajes).toHaveBeenCalledWith(5);
    expect(component.mensajes).toHaveLength(1);
    expect(component.loading).toBe(false);
  });

  // -----------------------------------------------------------------------
  // 3. correlacionar() con key vacía muestra toast de error
  // -----------------------------------------------------------------------
  it('correlacionar() con key vacía muestra toast de error y no llama al servicio', async () => {
    await buildComponent(null);

    component.correlationKeyInput = '';
    component.correlacionar();

    expect(toastSvc.mostrarError).toHaveBeenCalledWith('Ingresa una clave de correlación');
    expect(mensajeSvc.correlacionar).not.toHaveBeenCalled();
  });

  it('correlacionar() con key de solo espacios muestra toast de error', async () => {
    await buildComponent(null);

    component.correlationKeyInput = '   ';
    component.correlacionar();

    expect(toastSvc.mostrarError).toHaveBeenCalledOnce();
    expect(mensajeSvc.correlacionar).not.toHaveBeenCalled();
  });

  // -----------------------------------------------------------------------
  // 4. correlacionar() con key válida llama al servicio
  // -----------------------------------------------------------------------
  it('correlacionar() con key válida llama mensajeService.correlacionar con la key trimmeada', async () => {
    await buildComponent(null);

    component.correlationKeyInput = '  clave-abc  ';
    component.correlacionar();

    expect(mensajeSvc.correlacionar).toHaveBeenCalledWith('clave-abc');
  });

  it('correlacionar() exitosa muestra toast de éxito y limpia el input', async () => {
    await buildComponent(null);

    component.correlationKeyInput = 'clave-valida';
    component.correlacionar();

    expect(toastSvc.mostrarExito).toHaveBeenCalledWith('Correlacionado');
    expect(component.correlationKeyInput).toBe('');
    expect(component.correlacionando).toBe(false);
  });

  it('correlacionar() con error del servicio muestra toast de error', async () => {
    await buildComponent(null);
    mensajeSvc.correlacionar.mockReturnValue(
      throwError(() => ({ error: { message: 'No se encontraron mensajes para correlacionar' } }))
    );

    component.correlationKeyInput = 'clave-x';
    component.correlacionar();

    expect(toastSvc.mostrarError).toHaveBeenCalledWith('No se encontraron mensajes para correlacionar');
    expect(component.correlacionando).toBe(false);
  });

  // -----------------------------------------------------------------------
  // 5. correlacionar() activa y desactiva el flag correlacionando
  // -----------------------------------------------------------------------
  it('correlacionar() con respuesta síncronamente disponible termina con correlacionando=false', async () => {
    await buildComponent(null);

    component.correlationKeyInput = 'key-x';
    component.correlacionar();

    expect(component.correlacionando).toBe(false);
  });
});
