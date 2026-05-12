import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RegistroEmpresa } from './registro-empresa';
import { Empresa } from '../../../services/empresa';

describe('RegistroEmpresa', () => {
  let component: RegistroEmpresa;
  let fixture: ComponentFixture<RegistroEmpresa>;

  const mockEmpresa = { crearEmpresa: vi.fn().mockReturnValue(of({ data: {}, success: true })) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEmpresa],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Empresa, useValue: mockEmpresa }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroEmpresa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
