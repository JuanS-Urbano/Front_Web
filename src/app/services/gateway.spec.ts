import { TestBed } from '@angular/core/testing';

import { Gateway } from './gateway';

describe('Gateway', () => {
  let service: Gateway;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gateway);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
