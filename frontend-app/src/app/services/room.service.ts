import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private readonly http: HttpClient) {}

  getAvailableRooms() {
    return this.http.get('/api/rooms/available');
  }

  getCustomerBookings() {
    return this.http.get('/api/bookings');
  }

  getEmployeeBookings() {
    return this.http.get('/api/employee/bookings/active');
  }
}
