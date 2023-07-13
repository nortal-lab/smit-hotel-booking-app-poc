import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AvailableRoomsDTO } from '../models/room.interface';
import { Booking } from '../models/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiPath = '/api';

  constructor(private readonly http: HttpClient) {}

  getAvailableRooms(dateFrom: string, dateTo: string, guestCount: string) {
    return this.http.get<AvailableRoomsDTO>(`${this.apiPath}/rooms/available`, {
      params: {
        startDate: dateFrom,
        endDate: dateTo,
        guestCount: guestCount,
      },
    });
  }

  getBookings() {
    return this.http.get<Booking[]>(`${this.apiPath}/bookings`);
  }

  bookRoom() {
    return this.http.post(`${this.apiPath}/bookings`, {
      roomId: '7c6ad62a-e424-4ebb-b747-a8027299459a',
      startDate: '2023-07-20',
      endDate: '2023-07-22',
    });
  }

  cancelBooking(bookingId: string) {
    return this.http.delete(`${this.apiPath}/bookings/${bookingId}`);
  }
}
