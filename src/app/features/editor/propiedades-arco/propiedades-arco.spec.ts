import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadesArco } from './propiedades-arco';

describe('PropiedadesArco', () => {
  let component: PropiedadesArco;
  let fixture: ComponentFixture<PropiedadesArco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropiedadesArco],
    }).compileComponents();

    fixture = TestBed.createComponent(PropiedadesArco);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
