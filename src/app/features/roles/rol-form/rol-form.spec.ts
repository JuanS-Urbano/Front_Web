import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolForm } from './rol-form';

describe('RolForm', () => {
  let component: RolForm;
  let fixture: ComponentFixture<RolForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolForm],
    }).compileComponents();

    fixture = TestBed.createComponent(RolForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
