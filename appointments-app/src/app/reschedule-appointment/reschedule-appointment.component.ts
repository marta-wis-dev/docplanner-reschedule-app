import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DateTimeInputComponent } from './components/date-time-input/date-time-input.component';
import { AppointmentTimePickerComponent } from './components/appointment-time-picker/appointment-time-picker.component';
import { AppointmentService } from './services/appointment.service';
import { Subscription, tap } from 'rxjs';
import { AppointmentTimePickerService } from './services/appointment-time-picker.service';
import { Appointment, AvailabilitySlot } from './model/appointment';
import { JsonPipe } from '@angular/common';
import { AppointmentStore } from './services/appointment.store';
import { addWeeks } from 'date-fns';
import { DateTimeInputSlotPipe } from './pipes/date-time-input-slot.pipe';

@Component({
  selector: 'app-reschedule-appointment',
  standalone: true,
  imports: [
    DateTimeInputComponent,
    AppointmentTimePickerComponent,
    JsonPipe,
    DateTimeInputSlotPipe,
  ],
  templateUrl: './reschedule-appointment.component.html',
  styleUrl: './reschedule-appointment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RescheduleAppointmentComponent implements OnInit, OnDestroy {
  appointmentService = inject(AppointmentService);
  appointmentStore = inject(AppointmentStore);
  appointmentTimePickerService = inject(AppointmentTimePickerService);

  appointment = this.appointmentStore.appointment;
  loading = this.appointmentStore.loading;
  visibleSlots = this.appointmentTimePickerService.visibleSlots;
  newSlot = this.appointmentStore.newSlot;

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.fetchAppointment();
    this.fetchAvailableSlotsForCurrentWeek();
  }

  submitSelection() {
    this.appointmentStore.setLoading(true);
    const newAppointment = this.appointmentStore.newAppointment();

    if (newAppointment) {
      this.subscription.add(
        this.appointmentService
          .postAppointment(newAppointment)
          .pipe(
            tap(() => {
              this.appointmentStore.setNewAppointment();
              this.appointmentStore.setLoading(false);
            })
          )
          .subscribe()
      );
    }
  }

  selectSlot(slot: AvailabilitySlot) {
    this.appointmentStore.setNewSlot(slot);
  }

  setPreviousWeek() {
    this.appointmentTimePickerService.setPreviousWeek();
  }

  setNextWeek() {
    if (!this.appointmentTimePickerService.isNextWeekAdded()) {
      // fetch next week data if not added yet
      this.fetchNextWeekSlots();
    }
    this.appointmentTimePickerService.setNextWeek();
  }

  private fetchNextWeekSlots() {
    const visibleWeekStart =
      this.appointmentTimePickerService.visibleWeekStart();

    if (visibleWeekStart) {
      const nextWeekStart = addWeeks(visibleWeekStart, 1);

      this.appointmentService
        .getWeeklySlotsAvailability(nextWeekStart)
        .pipe(
          tap(newSlots =>
            this.appointmentTimePickerService.addAvailableSlots(newSlots)
          )
        )
        .subscribe();
    }
  }

  private fetchAppointment() {
    this.subscription.add(
      this.appointmentService
        .getAppointment()
        .pipe(
          tap((appointment: Appointment) => {
            this.appointmentStore.setAppointment(appointment);
            this.appointmentStore.setLoading(false);
          })
        )
        .subscribe()
    );
  }

  private fetchAvailableSlotsForCurrentWeek() {
    const today = new Date();
    this.appointmentTimePickerService.setVisibleWeekStart(today);

    this.subscription.add(
      this.appointmentService
        .getWeeklySlotsAvailability(today)
        .pipe(
          tap(slots => {
            this.appointmentTimePickerService.addAvailableSlots(slots);
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
