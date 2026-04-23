import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesList } from './mensajes-list';

describe('MensajesList', () => {
  let component: MensajesList;
  let fixture: ComponentFixture<MensajesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajesList],
    }).compileComponents();

    fixture = TestBed.createComponent(MensajesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
