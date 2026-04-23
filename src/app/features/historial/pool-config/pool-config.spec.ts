import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolConfig } from './pool-config';

describe('PoolConfig', () => {
  let component: PoolConfig;
  let fixture: ComponentFixture<PoolConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoolConfig],
    }).compileComponents();

    fixture = TestBed.createComponent(PoolConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
