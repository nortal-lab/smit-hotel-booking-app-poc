import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiPath = '/api';

  constructor(private readonly http: HttpClient) {}

  getActiveBookings() {
    return this.http.get(`${this.apiPath}/employee/bookings/active`);
  }

  getRooms() {
    return this.http.get(`${this.apiPath}/employee/rooms`);
  }
}
