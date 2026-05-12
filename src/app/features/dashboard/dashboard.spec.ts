import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Dashboard } from './dashboard';
import { Session } from '../../core/services/session';
import { Proceso as ProcesoService } from '../../services/proceso';
import { Usuario as UsuarioService } from '../../services/usuario';
import { RolProceso as RolProcesoService } from '../../services/rol-proceso';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  const mockSession = {
    session$: of(null),
    isLoggedIn: vi.fn().mockReturnValue(false),
    getEmpresaId: vi.fn().mockReturnValue(1),
    getPoolId: vi.fn().mockReturnValue(null)
  };
  const mockProceso = { getProcesos: vi.fn().mockReturnValue(of({ data: [], success: true })) };
  const mockUsuario = { getUsuariosPorEmpresa: vi.fn().mockReturnValue(of({ data: [], success: true })) };
  const mockRolProceso = { getRoles: vi.fn().mockReturnValue(of({ data: [], success: true })) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideRouter([]),
        { provide: Session, useValue: mockSession },
        { provide: ProcesoService, useValue: mockProceso },
        { provide: UsuarioService, useValue: mockUsuario },
        { provide: RolProcesoService, useValue: mockRolProceso }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
