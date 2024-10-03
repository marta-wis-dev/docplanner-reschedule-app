import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {DatePipe, JsonPipe, SlicePipe} from '@angular/common';
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
  // startDate$ = toObservable(this.startDate);
  //
  // private appointmentService = inject(AppointmentService);
  // private appointmentTimePickerService = inject(AppointmentTimePickerService);
  //
  // // Signal to hold the availability data
  // visibleSlots = this.appointmentTimePickerService.visibleSlots;
  //
  // ngOnInit() {
  //   this.startDate$.pipe(
  //     tap(startDate => {
  //       const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  //       this.appointmentTimePickerService.setVisibleWeekStart(formattedStartDate);
  //   })).subscribe()
  // }
  //
  //
  // // constructor() {
  // //   // Create an effect to watch for changes in startDate
  // //   effect(() => {
  // //     const startDateValue = this.startDate(); // Reactive read of the startDate signal
  // //     this.appointmentTimePickerService.setVisibleWeekStart(format(startDateValue, 'yyyy-MM-dd'));
  // //
  // //     // Call generateWeekView and subscribe to the observable
  // //     this.generateWeekView(startDateValue).subscribe((availability: any[]) => {
  // //       console.log(availability);
  // //       this.appointmentTimePickerService.addAvailableSlots(availability);
  // //     });
  // //   },{ allowSignalWrites: true });
  // // }
  //
  // // Function to return the observable from the service
  // private generateWeekView(startDate: Date): Observable<any[]> {
  //   return this.appointmentService.getSlotsAvailability(startDate);
  // }
  today = signal<string>(format(new Date(), 'yyyy-mm-dd'));
}
