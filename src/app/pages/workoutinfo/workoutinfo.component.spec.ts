import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutInfoComponent } from './workoutinfo.component';

describe('BooktourComponent', () => {
  let component: WorkoutInfoComponent;
  let fixture: ComponentFixture<WorkoutInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
