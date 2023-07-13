import { BookingStatus } from './booking-status.enum';

export interface Booking {
  bookingIdentifierNumber: number;
  bookingId: string;
  creationDate: string;
  customerFirstName: string;
  customerLastName: string;
  customerId: string;
  endDate: string;
  roomId: string;
  startDate: string;
  status: BookingStatus;
}
