import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaneForm } from './lane-form';

describe('LaneForm', () => {
  let component: LaneForm;
  let fixture: ComponentFixture<LaneForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaneForm],
    }).compileComponents();

    fixture = TestBed.createComponent(LaneForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
