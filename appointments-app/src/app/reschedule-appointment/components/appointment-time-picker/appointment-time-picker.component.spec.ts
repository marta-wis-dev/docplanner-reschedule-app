import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTimePickerComponent } from './appointment-time-picker.component';

describe('AppointmentTimePickerComponent', () => {
  let component: AppointmentTimePickerComponent;
  let fixture: ComponentFixture<AppointmentTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentTimePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
