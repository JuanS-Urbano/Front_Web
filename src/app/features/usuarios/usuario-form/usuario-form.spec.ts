import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { UsuarioForm } from './usuario-form';
import { Usuario as UsuarioService } from '../../../services/usuario';
import { Session } from '../../../core/services/session';
import { ToastService } from '../../../core/services/toast.service';

describe('UsuarioForm', () => {
  let component: UsuarioForm;
  let fixture: ComponentFixture<UsuarioForm>;

  const mockUsuario = { crearUsuario: vi.fn().mockReturnValue(of({ data: {}, success: true, message: 'OK' })) };
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
      imports: [UsuarioForm],
      providers: [
        provideRouter([]),
        { provide: UsuarioService, useValue: mockUsuario },
        { provide: Session, useValue: mockSession },
        { provide: ToastService, useValue: mockToast }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
