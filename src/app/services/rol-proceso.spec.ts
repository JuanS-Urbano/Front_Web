import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { RolProceso } from './rol-proceso';

describe('RolProceso', () => {
  let service: RolProceso;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(RolProceso);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
