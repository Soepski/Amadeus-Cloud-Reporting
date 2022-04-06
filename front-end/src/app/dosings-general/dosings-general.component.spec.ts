import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosingsGeneralComponent } from './dosings-general.component';

describe('DosingsGeneralComponent', () => {
  let component: DosingsGeneralComponent;
  let fixture: ComponentFixture<DosingsGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DosingsGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DosingsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
