export type PillIconType = 'pill' | 'capsule' | 'tablet' | 'liquid' | 'injection';

export type MedicationStatus = 'pending' | 'taken' | 'snoozed' | 'missed';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string; // e.g., "09:00 AM"
  timeMinutes: number; // for sorting, e.g. 540 for 09:00
  type: PillIconType;
  instructions: string;
  color: string; // soft color accent
  bgLight: string;
  status: MedicationStatus;
  takenAt?: string;
  snoozedUntil?: string;
  totalPills: number;
  remainingPills: number;
  frequency: string;
  prescribedBy: string;
}

export type TabType = 'today' | 'calendar' | 'medications' | 'profile';

export interface WeatherInfo {
  temp: number;
  condition: string;
  city: string;
  humidity: number;
  uvIndex: number;
}

export interface UserProfileData {
  name: string;
  email: string;
  bloodType: string;
  emergencyContact: string;
  doctorName: string;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
}
