import { computed, Injectable, signal } from '@angular/core';
import { addDays, addWeeks, format, parseISO, subWeeks } from 'date-fns';
import { AvailabilitySlot } from '../model/appointment';
import { getPreviousMonday, mergeMaps } from '../data/utils';

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

  setPreviousWeek() {
    this.visibleWeekStart.update(currentValue =>
      currentValue ? subWeeks(currentValue, 1) : null
    );
  }

  setNextWeek() {
    this.visibleWeekStart.update(currentValue =>
      currentValue ? addWeeks(currentValue, 1) : null
    );
  }

  // method to check if data about week was already fetched and added to allAvailableSlots
  isNextWeekAdded(): boolean {
    const all = this.allAvailableSlots();
    const currentWeekStart = this.visibleWeekStart();

    if (currentWeekStart) {
      // Get the monday of the next week
      const nextWeekMonday = addWeeks(getPreviousMonday(currentWeekStart), 2);

      // Convert Map keys (date strings) to an array and compare them to `nextWeekMonday`
      return Array.from(all.keys()).some(dateString => {
        const date = parseISO(dateString);
        return date >= nextWeekMonday; // Check if the date is in the next week
      });
    }

    return false;
  }
}
