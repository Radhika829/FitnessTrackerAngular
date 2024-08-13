import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthGraphComponent } from './healthgraph.component';

describe('TechhomeComponent', () => {
  let component: HealthGraphComponent;
  let fixture: ComponentFixture<HealthGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HealthGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
