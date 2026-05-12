import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RolesSelect } from './roles-select';
import { RolProceso as RolService } from '../../../services/rol-proceso';
import { Session } from '../../../core/services/session';

describe('RolesSelect', () => {
  let component: RolesSelect;
  let fixture: ComponentFixture<RolesSelect>;

  const mockRolService = { getRoles: vi.fn().mockReturnValue(of({ data: [], success: true })) };
  const mockSession = {
    session$: of(null),
    getEmpresaId: vi.fn().mockReturnValue(1),
    getPoolId: vi.fn().mockReturnValue(null)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesSelect],
      providers: [
        { provide: RolService, useValue: mockRolService },
        { provide: Session, useValue: mockSession }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RolesSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
