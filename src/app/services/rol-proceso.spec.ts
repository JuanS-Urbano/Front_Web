import { TestBed } from '@angular/core/testing';

import { RolProceso } from './rol-proceso';

describe('RolProceso', () => {
  let service: RolProceso;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolProceso);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
