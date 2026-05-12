import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { CatchMessageConfig } from './catch-message-config';
import { Mensaje as MensajeService } from '../../../services/mensaje';
import { Proceso as ProcesoService } from '../../../services/proceso';
import { Session } from '../../../core/services/session';

describe('CatchMessageConfig', () => {
  let component: CatchMessageConfig;
  let fixture: ComponentFixture<CatchMessageConfig>;

  const mockMensaje = {
    getMensajes: vi.fn().mockReturnValue(of({ data: [], success: true })),
    recibirMensaje: vi.fn().mockReturnValue(of({ data: {}, success: true })),
    crearMensajeCatch: vi.fn().mockReturnValue(of({ data: {}, success: true }))
  };
  const mockProceso = { getProcesos: vi.fn().mockReturnValue(of({ data: [], success: true })) };
  const mockSession = {
    session$: of(null),
    getEmpresaId: vi.fn().mockReturnValue(1),
    getPoolId: vi.fn().mockReturnValue(null)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatchMessageConfig],
      providers: [
        provideRouter([]),
        { provide: MensajeService, useValue: mockMensaje },
        { provide: ProcesoService, useValue: mockProceso },
        { provide: Session, useValue: mockSession }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatchMessageConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
