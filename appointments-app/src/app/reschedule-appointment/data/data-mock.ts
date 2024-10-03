import { Appointment } from '../model/appointment';

export const PatientMock = {
  Name: 'Patient Name',
  SecondName: 'SecondName',
  Email: 'patient1@vp.pl',
  Phone: '111331313',
};

export const DoctorMock = {
  Name: 'Simeon',
  SecondName: 'Molas',
  Email: '',
  Phone: '',
};

export const InitialAppointmentMock: Appointment = {
  Start: '2024-12-06 10:30:00',
  End: '2024-12-06 10:45:00',
  Comments: '',
  Patient: PatientMock,
  Doctor: DoctorMock,
};
