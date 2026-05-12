import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { ThrowMessageForm } from './throw-message-form';
import { Mensaje as MensajeService } from '../../../services/mensaje';
import { Proceso as ProcesoService } from '../../../services/proceso';
import { Session } from '../../../core/services/session';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const mockProcesos = [
  { id: 1, nombre: 'ProcA', descripcion: '', categoria: 'RRHH', estado: 'ACTIVO' },
  { id: 2, nombre: 'ProcB', descripcion: '', categoria: 'TI',   estado: 'ACTIVO' },
];

function makeMensajeSvc() {
  return {
    enviarMensaje: vi.fn().mockReturnValue(
      of({ success: true, message: 'Enviado', data: { correlationKey: 'key-123', status: 'PENDING' } })
    ),
  };
}

function makeProcesoSvc() {
  return {
    getProcesos: vi.fn().mockReturnValue(
      of({ success: true, message: 'OK', data: mockProcesos })
    ),
  };
}

function makeSessionSvc(poolId: number | null = 1) {
  return {
    getPoolId:   vi.fn().mockReturnValue(poolId),
    getEmpresaId: vi.fn().mockReturnValue(null),
    session$: of(null),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ThrowMessageForm', () => {
  let component: ThrowMessageForm;
  let fixture: ComponentFixture<ThrowMessageForm>;
  let mensajeSvc: ReturnType<typeof makeMensajeSvc>;

  beforeEach(async () => {
    mensajeSvc = makeMensajeSvc();

    await TestBed.configureTestingModule({
      imports: [ThrowMessageForm],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MensajeService, useValue: mensajeSvc },
        { provide: ProcesoService, useValue: makeProcesoSvc() },
        { provide: Session,        useValue: makeSessionSvc() },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(ThrowMessageForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // -----------------------------------------------------------------------
  // 1. Componente crea sin errores
  // -----------------------------------------------------------------------
  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // -----------------------------------------------------------------------
  // 2. Formulario inválido no llama enviarMensaje
  // -----------------------------------------------------------------------
  it('formulario vacío es inválido y onSubmit() no invoca enviarMensaje', () => {
    // El formulario nace vacío → inválido
    expect(component.messageForm.invalid).toBe(true);

    component.onSubmit();

    expect(mensajeSvc.enviarMensaje).not.toHaveBeenCalled();
  });

  it('formulario con campos faltantes no invoca enviarMensaje', () => {
    component.messageForm.patchValue({ nombre: 'NombreOK' }); // resto vacío
    component.onSubmit();

    expect(mensajeSvc.enviarMensaje).not.toHaveBeenCalled();
  });

  it('onSubmit() con formulario inválido marca todos los campos como touched', () => {
    component.onSubmit();

    const controls = component.messageForm.controls;
    Object.values(controls).forEach(ctrl => {
      expect(ctrl.touched).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // 3. Formulario válido llama enviarMensaje con datos correctos
  // -----------------------------------------------------------------------
  it('formulario válido llama enviarMensaje con el payload correcto', () => {
    component.messageForm.setValue({
      nombre:           'MiMensaje',
      payloadJson:      '{"clave":"valor"}',
      correlationKey:   'clave-corr-001',
      procesoOrigenId:  1,
      procesoDestinoId: 2,
    });

    expect(component.messageForm.valid).toBe(true);

    component.onSubmit();

    expect(mensajeSvc.enviarMensaje).toHaveBeenCalledOnce();
    const llamada = mensajeSvc.enviarMensaje.mock.calls[0][0];
    expect(llamada.nombre).toBe('MiMensaje');
    expect(llamada.payloadJson).toBe('{"clave":"valor"}');
    expect(llamada.correlationKey).toBe('clave-corr-001');
    expect(llamada.tipo).toBe('THROW');
    expect(llamada.proceso.id).toBe(1);
    expect(llamada.procesoDestino.id).toBe(2);
  });

  it('respuesta exitosa asigna resultado y resetea el formulario', () => {
    component.messageForm.setValue({
      nombre: 'X', payloadJson: '{}', correlationKey: 'k1', procesoOrigenId: 1, procesoDestinoId: 2,
    });

    component.onSubmit();

    expect(component.resultado).not.toBeNull();
    // El form debe resetearse (controls vacíos)
    expect(component.messageForm.value.nombre).toBeNull();
    expect(component.cargando).toBe(false);
  });

  it('error en enviarMensaje asigna mensajes de error', () => {
    mensajeSvc.enviarMensaje.mockReturnValue(
      throwError(() => ({ error: { message: 'Proceso destino no existe' } }))
    );

    component.messageForm.setValue({
      nombre: 'X', payloadJson: '{}', correlationKey: 'k1', procesoOrigenId: 1, procesoDestinoId: 2,
    });

    component.onSubmit();

    expect(component.error).toBe('Proceso destino no existe');
    expect(component.cargando).toBe(false);
  });

  // -----------------------------------------------------------------------
  // 4. procesoOrigenId con valor < 1 hace el formulario inválido
  // -----------------------------------------------------------------------
  it('procesoOrigenId = 0 hace el formulario inválido', () => {
    component.messageForm.setValue({
      nombre: 'X', payloadJson: '{}', correlationKey: 'k', procesoOrigenId: 0, procesoDestinoId: 2,
    });
    expect(component.messageForm.invalid).toBe(true);
    component.onSubmit();
    expect(mensajeSvc.enviarMensaje).not.toHaveBeenCalled();
  });
});
