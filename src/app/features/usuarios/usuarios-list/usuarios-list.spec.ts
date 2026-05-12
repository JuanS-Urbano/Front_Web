import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { UsuariosList } from './usuarios-list';
import { Usuario as UsuarioService } from '../../../services/usuario';
import { Session } from '../../../core/services/session';

describe('UsuariosList', () => {
  let component: UsuariosList;
  let fixture: ComponentFixture<UsuariosList>;

  const mockUsuario = { getUsuariosPorEmpresa: vi.fn().mockReturnValue(of({ data: [], success: true })) };
  const mockSession = {
    session$: of(null),
    getEmpresaId: vi.fn().mockReturnValue(1),
    getPoolId: vi.fn().mockReturnValue(null)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosList],
      providers: [
        provideRouter([]),
        { provide: UsuarioService, useValue: mockUsuario },
        { provide: Session, useValue: mockSession }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
