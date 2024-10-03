import { computed, Injectable, signal } from '@angular/core';
import { Appointment, AvailabilitySlot } from '../model/appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentStore {
  appointment = signal<Appointment | null>(null);
  loading = signal<boolean>(true);
  newSlot = signal<AvailabilitySlot | null>(null);
  newAppointment = computed<Appointment | null>(() => {
    const currentAppointment = this.appointment();
    const selectedSlot = this.newSlot();

    // If either currentAppointment or selectedSlot is null, return null
    if (!currentAppointment || !selectedSlot) {
      return null;
    }

    // Return a new Appointment object with updated Start and End times
    return {
      ...currentAppointment, // Spread the existing appointment details
      Start: selectedSlot.Start, // Override Start time with the selected slot
      End: selectedSlot.End, // Override End time with the selected slot
    };
  });

  setAppointment(appointment: Appointment) {
    this.appointment.set(appointment);
  }

  setNewAppointment() {
    const newAppointment = this.newAppointment();
    this.appointment.set(newAppointment);
  }

  setLoading(value: boolean) {
    this.loading.set(value);
  }

  setNewSlot(slot: AvailabilitySlot) {
    this.newSlot.set(slot);
  }
}
