import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { Proceso } from './proceso';

describe('Proceso', () => {
  let service: Proceso;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(Proceso);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
