import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { addWeeks, format, parseISO } from 'date-fns';
import { map, Observable, of, zip } from 'rxjs';
import {
  BACKEND_API_URL,
  BOOK_SLOTS_ENDPOINT,
  GET_WEEKLY_SLOTS_ENDPOINT,
} from '../../service-config';
import { Appointment, AvailabilitySlot } from '../model/appointment';
import { InitialAppointmentMock } from '../data/data-mock';
import { getPreviousMonday, mergeMaps } from '../data/utils';

export const DATE_FORMAT = 'yyyyMMdd';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  http = inject(HttpClient);

  // mock method to return currently selected appointment
  getAppointment(): Observable<Appointment> {
    return of(InitialAppointmentMock);
  }

  postAppointment(appointment: Appointment): Observable<null> {
    const url = `${BACKEND_API_URL}/${BOOK_SLOTS_ENDPOINT}`;
    return this.http.post<null>(url, appointment);
  }

  getSlotsAvailability(
    date: Date
  ): Observable<Map<string, AvailabilitySlot[]>> {
    const formattedDate = format(date, DATE_FORMAT);
    const url = `${BACKEND_API_URL}/${GET_WEEKLY_SLOTS_ENDPOINT}/${formattedDate}`;

    return this.http
      .get<AvailabilitySlot[]>(url)
      .pipe(map(slots => this.groupSlotsByDay(slots)));
  }

  getWeeklySlotsAvailability(
    startDate: Date
  ): Observable<Map<string, AvailabilitySlot[]>> {
    // endpoint requires date argument to be monday
    if (this.isMonday(startDate)) {
      return this.getSlotsAvailability(startDate);
    } else {
      const previousMonday = getPreviousMonday(startDate);
      const nextMonday = addWeeks(previousMonday, 1);

      return zip(
        this.getSlotsAvailability(previousMonday),
        this.getSlotsAvailability(nextMonday)
      ).pipe(
        map(([currentWeekSlots, nextWeekSlots]) => {
          // Combine the results of both weeks into a single Map
          return mergeMaps(currentWeekSlots, nextWeekSlots) as Map<
            string,
            AvailabilitySlot[]
          >;
        })
      );
    }
  }

  private groupSlotsByDay(
    slots: AvailabilitySlot[]
  ): Map<string, AvailabilitySlot[]> {
    // Use a Map to group slots by date
    const groupedMap = new Map<string, AvailabilitySlot[]>();

    // Group slots by date
    slots.forEach(slot => {
      const date = format(parseISO(slot.Start), 'yyyy-MM-dd');

      // If the date is already in the map, push the slot, otherwise, create a new entry
      if (!groupedMap.has(date)) {
        groupedMap.set(date, []);
      }
      groupedMap.get(date)?.push(slot);
    });

    return groupedMap;
  }

  private isMonday(date: Date): boolean {
    return date.getDay() === 1;
  }
}
