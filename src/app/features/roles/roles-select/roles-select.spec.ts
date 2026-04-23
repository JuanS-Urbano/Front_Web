import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesSelect } from './roles-select';

describe('RolesSelect', () => {
  let component: RolesSelect;
  let fixture: ComponentFixture<RolesSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(RolesSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
