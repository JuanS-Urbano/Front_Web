import { TestBed } from '@angular/core/testing';

import { Lane } from './lane';

describe('Lane', () => {
  let service: Lane;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lane);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
