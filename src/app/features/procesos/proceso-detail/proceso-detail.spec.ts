import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoDetail } from './proceso-detail';

describe('ProcesoDetail', () => {
  let component: ProcesoDetail;
  let fixture: ComponentFixture<ProcesoDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcesoDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
