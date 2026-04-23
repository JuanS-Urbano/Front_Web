import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCanvas } from './editor-canvas';

describe('EditorCanvas', () => {
  let component: EditorCanvas;
  let fixture: ComponentFixture<EditorCanvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorCanvas],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorCanvas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
