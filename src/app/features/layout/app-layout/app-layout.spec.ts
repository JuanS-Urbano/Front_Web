import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AppLayout } from './app-layout';
import { Session } from '../../../core/services/session';
import { ToastService } from '../../../core/services/toast.service';

describe('AppLayout', () => {
  let component: AppLayout;
  let fixture: ComponentFixture<AppLayout>;

  const mockSession = {
    session$: of(null),
    isLoggedIn: vi.fn().mockReturnValue(false),
    logout: vi.fn(),
    getEmpresaId: vi.fn().mockReturnValue(null),
    getPoolId: vi.fn().mockReturnValue(null)
  };

  const mockToast = {
    state$: of({ visible: false, tipo: 'info', mensaje: '' }),
    mostrarExito: vi.fn(),
    mostrarError: vi.fn(),
    cerrar: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLayout],
      providers: [
        provideRouter([]),
        { provide: Session, useValue: mockSession },
        { provide: ToastService, useValue: mockToast }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
