import { Pipe, PipeTransform } from '@angular/core';
import { format, isToday, isTomorrow } from 'date-fns';

@Pipe({
  name: 'dayLabel',
  standalone: true,
})
export class DayLabelPipe implements PipeTransform {
  transform(originalDate: string): string {
    const date = new Date(originalDate);
    if (isToday(date)) {
      return 'Today';
    } else if (isTomorrow(date)) {
      return 'Tomorrow';
    } else {
      return format(date, 'EE'); // Return the name of the day (e.g., Mon, Tue)
    }
  }
}
