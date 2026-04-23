import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanesManager } from './lanes-manager';

describe('LanesManager', () => {
  let component: LanesManager;
  let fixture: ComponentFixture<LanesManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanesManager],
    }).compileComponents();

    fixture = TestBed.createComponent(LanesManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
