import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRoutineComponent } from './customerroutine.component';

describe('EdittourComponent', () => {
  let component: CustomerRoutineComponent;
  let fixture: ComponentFixture<CustomerRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerRoutineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
