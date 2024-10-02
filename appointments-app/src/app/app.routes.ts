import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'reschedule-appointment',
  },
  {
    path: 'reschedule-appointment',
    loadComponent: () =>
      import('./reschedule-appointment/reschedule-appointment.component').then(
        c => c.RescheduleAppointmentComponent
      ),
  },
];
