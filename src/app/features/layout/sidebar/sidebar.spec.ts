import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Sidebar } from './sidebar';
import { Session } from '../../../core/services/session';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  const mockSession = {
    session$: of(null),
    isLoggedIn: vi.fn().mockReturnValue(false),
    logout: vi.fn(),
    getEmpresaId: vi.fn().mockReturnValue(null),
    getPoolId: vi.fn().mockReturnValue(null)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [
        provideRouter([]),
        { provide: Session, useValue: mockSession }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
