import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-date-time-input',
  standalone: true,
  imports: [],
  templateUrl: './date-time-input.component.html',
  styleUrl: './date-time-input.component.scss',
})
export class DateTimeInputComponent {
  value = input.required<string | undefined>();
  loading = input.required<boolean>();
  @Input() readonly = true;
}
