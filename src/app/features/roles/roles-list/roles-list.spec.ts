import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { RolesList } from './roles-list';
import { RolProceso as RolService } from '../../../services/rol-proceso';
import { Session } from '../../../core/services/session';
import { ToastService } from '../../../core/services/toast.service';

describe('RolesList', () => {
  let component: RolesList;
  let fixture: ComponentFixture<RolesList>;

  const mockRolService = {
    getRoles: vi.fn().mockReturnValue(of({ data: [], success: true })),
    deleteRol: vi.fn().mockReturnValue(of({ data: {}, success: true }))
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
      imports: [RolesList],
      providers: [
        provideRouter([]),
        { provide: RolService, useValue: mockRolService },
        { provide: Session, useValue: mockSession },
        { provide: ToastService, useValue: mockToast }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RolesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
