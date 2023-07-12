import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoomDTO } from '../models/room.interface';
import { Booking } from '../models/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiPath = '/api';

  constructor(private readonly http: HttpClient) {}

  getAvailableRooms(dateFrom: string, dateTo: string, guestCount: string) {
    return this.http.get<RoomDTO[]>(`${this.apiPath}/rooms/available`, {
      params: {
        startDate: dateFrom,
        endDate: dateTo,
      },
    });
  }

  getBookings() {
    return this.http.get<Booking[]>(`${this.apiPath}/bookings`);
  }
}
