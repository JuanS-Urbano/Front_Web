import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadesActividad } from './propiedades-actividad';

describe('PropiedadesActividad', () => {
  let component: PropiedadesActividad;
  let fixture: ComponentFixture<PropiedadesActividad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropiedadesActividad],
    }).compileComponents();

    fixture = TestBed.createComponent(PropiedadesActividad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
