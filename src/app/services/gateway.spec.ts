import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { Gateway } from './gateway';

describe('Gateway', () => {
  let service: Gateway;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(Gateway);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
