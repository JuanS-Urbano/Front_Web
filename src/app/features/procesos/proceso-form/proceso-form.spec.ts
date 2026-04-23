import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoForm } from './proceso-form';

describe('ProcesoForm', () => {
  let component: ProcesoForm;
  let fixture: ComponentFixture<ProcesoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcesoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
