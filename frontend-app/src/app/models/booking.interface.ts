import { BookingStatus } from './booking-status.enum';
import { RoomType } from './room.interface';

export interface Booking {
  bookingIdentifierNumber: number;
  bookingId: string;
  creationDate: string;
  customerFirstName: string;
  customerLastName: string;
  roomType: RoomType;
  customerId: string;
  endDate: string;
  roomId: string;
  roomNumber: number;
  startDate: string;
  status: BookingStatus;
}
