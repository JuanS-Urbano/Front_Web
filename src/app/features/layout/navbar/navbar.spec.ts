import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Navbar } from './navbar';
import { Session } from '../../../core/services/session';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  const mockSession = {
    session$: of(null),
    isLoggedIn: vi.fn().mockReturnValue(false),
    logout: vi.fn(),
    getEmpresaId: vi.fn().mockReturnValue(null),
    getPoolId: vi.fn().mockReturnValue(null)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideRouter([]),
        { provide: Session, useValue: mockSession }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
