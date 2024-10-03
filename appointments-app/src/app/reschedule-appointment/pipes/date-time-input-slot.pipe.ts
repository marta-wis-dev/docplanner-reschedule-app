import { Pipe, PipeTransform } from '@angular/core';
import {format} from "date-fns";

@Pipe({
  name: 'dateTimeInputSlot',
  standalone: true
})
export class DateTimeInputSlotPipe implements PipeTransform {

  transform(value: string | undefined): string {
    return value ? format(value, "'On' EEEE, dd MMMM yyyy 'at' HH:mm") : '';
  }

}
