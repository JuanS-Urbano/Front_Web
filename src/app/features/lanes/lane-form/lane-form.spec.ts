import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { LaneForm } from './lane-form';
import { Lane as LaneService } from '../../../services/lane';
import { RolProceso as RolService } from '../../../services/rol-proceso';
import { Session } from '../../../core/services/session';

describe('LaneForm', () => {
  let component: LaneForm;
  let fixture: ComponentFixture<LaneForm>;

  const mockLaneService = {
    getLanes: vi.fn().mockReturnValue(of({ data: [], success: true })),
    crearLane: vi.fn().mockReturnValue(of({ data: {}, success: true })),
    updateLane: vi.fn().mockReturnValue(of({ data: {}, success: true }))
  };
  const mockRolService = { getRoles: vi.fn().mockReturnValue(of({ data: [], success: true })) };
  const mockSession = {
    session$: of(null),
    getEmpresaId: vi.fn().mockReturnValue(1),
    getPoolId: vi.fn().mockReturnValue(null)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaneForm],
      providers: [
        provideRouter([]),
        { provide: LaneService, useValue: mockLaneService },
        { provide: RolService, useValue: mockRolService },
        { provide: Session, useValue: mockSession }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LaneForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
