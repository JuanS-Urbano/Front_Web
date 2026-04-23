import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadesGateway } from './propiedades-gateway';

describe('PropiedadesGateway', () => {
  let component: PropiedadesGateway;
  let fixture: ComponentFixture<PropiedadesGateway>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropiedadesGateway],
    }).compileComponents();

    fixture = TestBed.createComponent(PropiedadesGateway);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
