export interface TimeSlot {
  Start: string; // Start timestamp (string "YYYY-MM-DD HH:mm:ss"),
  End: string; // End timestamp (string "YYYY-MM-DD HH:mm:ss"),
}

export interface Appointment extends TimeSlot {
  Comments: string; // Additional instructions for the doctor
  Patient: User;
  Doctor: User;
}

export interface User {
  Name: string; // Name
  SecondName: string; // SecondName
  Email: string; // Email
  Phone: string; // Phone
}

export interface AvailabilitySlot extends TimeSlot {
  Taken?: boolean;
}

export interface GroupedSlots {
  date: string; // Date (e.g., '2024-09-30')
  slots: AvailabilitySlot[]; // Slots for that daydate: string;
}
