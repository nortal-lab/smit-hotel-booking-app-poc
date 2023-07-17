import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../models/booking.interface';
import { RoomDTO } from '../models/room.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiPath = '/api';

  constructor(private readonly http: HttpClient) {}

  getActiveBookings() {
    return this.http.get<Booking[]>(`${this.apiPath}/employee/bookings/active`);
  }

  getRooms() {
    return this.http.get<RoomDTO[]>(`${this.apiPath}/employee/rooms`);
  }

  getRoom(roomId: string) {
    return this.http.get<RoomDTO>(`${this.apiPath}/employee/rooms/${roomId}`);
  }

  cancelBooking(bookingId: string) {
    return this.http.delete(`${this.apiPath}/employee/bookings/${bookingId}`);
  }
}
