import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { Lane } from './lane';

describe('Lane', () => {
  let service: Lane;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(Lane);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
