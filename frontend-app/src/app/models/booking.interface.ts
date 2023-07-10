import { BookingStatus } from './booking-status.enum';

export interface Booking {
  bookingId: string;
  creationDate: string;
  endDate: string;
  roomId: string;
  startDate: string;
  status: BookingStatus;
}
