import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {DateTimeInputSlotPipe} from "../../pipes/date-time-input-slot.pipe";

@Component({
  selector: 'app-date-time-input',
  standalone: true,
  imports: [NgOptimizedImage, DateTimeInputSlotPipe],
  templateUrl: './date-time-input.component.html',
  styleUrl: './date-time-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeInputComponent {
  value = input.required<string | undefined>();
  loading = input.required<boolean>();
  @Input() readonly = true;
}
