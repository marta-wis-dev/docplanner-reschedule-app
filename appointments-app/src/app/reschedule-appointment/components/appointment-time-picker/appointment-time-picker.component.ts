import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DatePipe, JsonPipe, SlicePipe } from '@angular/common';
import { format } from 'date-fns';
import { AvailabilitySlot, GroupedSlots } from '../../model/appointment';
import { DayLabelPipe } from '../../pipes/day-label.pipe';

@Component({
  selector: 'app-appointment-time-picker',
  standalone: true,
  imports: [CarouselModule, JsonPipe, DatePipe, DayLabelPipe, SlicePipe],
  templateUrl: './appointment-time-picker.component.html',
  styleUrl: './appointment-time-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentTimePickerComponent {
  visibleSlots = input.required<GroupedSlots[]>();
  prev = output<void>();
  next = output<void>();
  onSelectSlot = output<AvailabilitySlot>();
  showAll = signal<boolean>(false);
  today = signal<string>(format(new Date(), 'yyyy-MM-dd'));
  selectedSlot = signal<AvailabilitySlot | null>(null);

  selectSlot(slot: AvailabilitySlot) {
    this.onSelectSlot.emit(slot);
    this.selectedSlot.set(slot);
    this.showAll.set(false);
  }
}
