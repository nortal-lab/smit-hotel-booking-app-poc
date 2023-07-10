import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoomDTO } from '../models/room.interface';
import { Booking } from '../models/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private readonly http: HttpClient) {}

  getAvailableRooms(dateFrom: string, dateTo: string, roomCount: string, guestCount: string) {
    return this.http.get<RoomDTO>('/api/rooms/available', {
      params: {
        startDate: dateFrom,
        endDate: dateTo,
      },
    });
  }

  getBookings() {
    return this.http.get<Booking[]>('/api/bookings');
  }

  getEmployeeBookings() {
    return this.http.get('/api/employee/bookings/active');
  }
}
