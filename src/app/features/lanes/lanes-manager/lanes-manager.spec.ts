import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { LanesManager } from './lanes-manager';
import { Lane as LaneService } from '../../../services/lane';

describe('LanesManager', () => {
  let component: LanesManager;
  let fixture: ComponentFixture<LanesManager>;

  const mockLaneService = {
    getLanes: vi.fn().mockReturnValue(of({ data: [], success: true })),
    deleteLane: vi.fn().mockReturnValue(of({ data: {}, success: true }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanesManager],
      providers: [
        provideRouter([]),
        { provide: LaneService, useValue: mockLaneService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LanesManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
