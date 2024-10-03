import { computed, Injectable, signal } from '@angular/core';
import { addDays, format } from 'date-fns';
import { AvailabilitySlot } from '../model/appointment';
import { mergeMaps } from '../data/utils';

@Injectable({
  providedIn: 'root',
})
export class AppointmentTimePickerService {
  // visible date range start for available slots
  visibleWeekStart = signal<Date | null>(null);

  // all fetched slots
  allAvailableSlots = signal<Map<string, AvailabilitySlot[]>>(new Map());

  // filtered slots for visible date range
  visibleSlots = computed(() =>
    this.getVisibleSlots(this.visibleWeekStart(), this.allAvailableSlots())
  );

  setVisibleWeekStart(value: Date) {
    this.visibleWeekStart.set(value);
  }

  addAvailableSlots(newSlots: Map<string, AvailabilitySlot[]>) {
    this.allAvailableSlots.update(slots => mergeMaps(slots, newSlots));
  }

  private getVisibleSlots(
    weekStart: Date | null,
    allSlots: Map<string, AvailabilitySlot[]>
  ) {
    const rangeStart = weekStart || new Date();

    // Get the next 7 days starting from first day
    const next7Days: string[] = Array.from({ length: 7 }, (_, i) => {
      return format(addDays(rangeStart, i), 'yyyy-MM-dd');
    });

    // TODO: eliminate past slots of today
    // Create the final grouped slots array
    return next7Days.map(date => ({
      date,
      slots: allSlots.get(date) || [], // Use the existing slots or an empty array
    }));
  }

  setPreviousWeek() {}

  setNextWeek() {}
}
