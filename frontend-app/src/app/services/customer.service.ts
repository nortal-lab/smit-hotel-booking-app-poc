import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AvailableRoomsDTO, RoomDTO } from '../models/room.interface';
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
        peopleCapacity: guestCount,
      },
    });
  }

  getBookings() {
    return this.http.get<Booking[]>(`${this.apiPath}/bookings`);
  }

  getRoom(roomId: string) {
    return this.http.get<RoomDTO>(`${this.apiPath}/rooms/${roomId}`);
  }

  bookRoom(roomId: string, startDate: string, endDate: string, firstName: string, familyName: string) {
    return this.http.post(`${this.apiPath}/bookings`, {
      roomId,
      startDate,
      endDate,
      customerLastName: familyName,
      customerFirstName: firstName,
    });
  }

  cancelBooking(bookingId: string) {
    return this.http.delete(`${this.apiPath}/bookings/${bookingId}`);
  }
}
