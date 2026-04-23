import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesosList } from './procesos-list';

describe('ProcesosList', () => {
  let component: ProcesosList;
  let fixture: ComponentFixture<ProcesosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesosList],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcesosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
