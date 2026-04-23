import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThrowMessageForm } from './throw-message-form';

describe('ThrowMessageForm', () => {
  let component: ThrowMessageForm;
  let fixture: ComponentFixture<ThrowMessageForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThrowMessageForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ThrowMessageForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
