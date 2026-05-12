import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Notificaciones } from './notificaciones';
import { Notificacion as NotificacionService } from '../../../services/notificacion';
import { Session } from '../../../core/services/session';

describe('Notificaciones', () => {
  let component: Notificaciones;
  let fixture: ComponentFixture<Notificaciones>;

  const mockNotificacion = {
    getNotificaciones: vi.fn().mockReturnValue(of({ data: [], success: true })),
    enviarNotificacion: vi.fn().mockReturnValue(of({ data: {}, success: true }))
  };
  const mockSession = {
    session$: of(null),
    getEmpresaId: vi.fn().mockReturnValue(1),
    getPoolId: vi.fn().mockReturnValue(null)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Notificaciones],
      providers: [
        { provide: NotificacionService, useValue: mockNotificacion },
        { provide: Session, useValue: mockSession }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Notificaciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
