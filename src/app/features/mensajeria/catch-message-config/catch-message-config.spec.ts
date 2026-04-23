import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchMessageConfig } from './catch-message-config';

describe('CatchMessageConfig', () => {
  let component: CatchMessageConfig;
  let fixture: ComponentFixture<CatchMessageConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatchMessageConfig],
    }).compileComponents();

    fixture = TestBed.createComponent(CatchMessageConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
