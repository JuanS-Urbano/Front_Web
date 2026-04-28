import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolConfig } from './pool-config';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PoolConfig', () => {
  let component: PoolConfig;
  let fixture: ComponentFixture<PoolConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoolConfig],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(PoolConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
