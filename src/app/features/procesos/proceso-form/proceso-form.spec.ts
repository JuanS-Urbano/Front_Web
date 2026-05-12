import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ProcesoForm } from './proceso-form';
import { Proceso as ProcesoService } from '../../../services/proceso';
import { Session } from '../../../core/services/session';
import { ToastService } from '../../../core/services/toast.service';

describe('ProcesoForm', () => {
  let component: ProcesoForm;
  let fixture: ComponentFixture<ProcesoForm>;

  const mockProceso = {
    getProcesoById: vi.fn().mockReturnValue(of({ data: {}, success: true })),
    crearProceso: vi.fn().mockReturnValue(of({ data: {}, success: true })),
    updateProceso: vi.fn().mockReturnValue(of({ data: {}, success: true }))
  };
  const mockSession = {
    session$: of(null),
    getEmpresaId: vi.fn().mockReturnValue(1),
    getPoolId: vi.fn().mockReturnValue(null)
  };
  const mockToast = {
    state$: of({ visible: false, tipo: 'info', mensaje: '' }),
    mostrarExito: vi.fn(),
    mostrarError: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoForm],
      providers: [
        provideRouter([]),
        { provide: ProcesoService, useValue: mockProceso },
        { provide: Session, useValue: mockSession },
        { provide: ToastService, useValue: mockToast }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProcesoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
