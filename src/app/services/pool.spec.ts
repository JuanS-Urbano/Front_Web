import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { Pool } from './pool';

describe('Pool', () => {
  let service: Pool;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(Pool);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
