import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'dateTimeInputSlot',
  standalone: true,
})
export class DateTimeInputSlotPipe implements PipeTransform {
  transform(value: string | undefined, addOn: boolean = false): string {
    if (!value) {
      return '';
    }

    // Format the date
    const formattedDate = format(value, "EEEE, dd MMMM yyyy 'at' HH:mm");

    // Add the prefix "On " if addOn is true
    return addOn ? `On ${formattedDate}` : formattedDate;
  }
}
