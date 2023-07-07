import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoomDTO } from '../models/room.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private readonly http: HttpClient) {}

  getAvailableRooms(dateFrom: string, dateTo: string, roomCount: string, guestCount: string) {
    return this.http.get<RoomDTO>('/api/rooms/available', {
      params: {
        startDate: dateFrom,
        endDate: dateTo,
      },
    });
  }

  getCustomerBookings() {
    return this.http.get('/api/bookings');
  }

  getEmployeeBookings() {
    return this.http.get('/api/employee/bookings/active');
  }
}
