import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosingDetailsComponent } from './dosing-details.component';

describe('DosingDetailsComponent', () => {
  let component: DosingDetailsComponent;
  let fixture: ComponentFixture<DosingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DosingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DosingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
