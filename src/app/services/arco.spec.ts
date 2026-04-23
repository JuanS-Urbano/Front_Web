import { TestBed } from '@angular/core/testing';

import { Arco } from './arco';

describe('Arco', () => {
  let service: Arco;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Arco);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
