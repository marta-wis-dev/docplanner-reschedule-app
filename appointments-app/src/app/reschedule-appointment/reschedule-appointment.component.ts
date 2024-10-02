import { Component } from '@angular/core';
import { DateTimeInputComponent } from './components/date-time-input/date-time-input.component';
import { AppointmentTimePickerComponent } from './components/appointment-time-picker/appointment-time-picker.component';

@Component({
  selector: 'app-reschedule-appointment',
  standalone: true,
  imports: [DateTimeInputComponent, AppointmentTimePickerComponent],
  templateUrl: './reschedule-appointment.component.html',
  styleUrl: './reschedule-appointment.component.scss',
})
export class RescheduleAppointmentComponent {}
