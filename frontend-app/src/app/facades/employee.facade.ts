import { Injectable } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { shareReplay, tap } from 'rxjs';
import { Booking } from '../models/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeFacade {
  activeBookings = new BehaviorSubject<Booking[]>([]);
  activeBookings$ = this.activeBookings.asObservable();

  constructor(private readonly employeeService: EmployeeService) {}

  getRooms() {
    return this.employeeService.getRooms();
  }

  getActiveBookings() {
    return this.employeeService.getActiveBookings().pipe(
      tap((bookings) => this.activeBookings.next(bookings)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  cancelBooking(bookingId: string) {
    this.employeeService
      .cancelBooking(bookingId)
      .pipe(tap(() => this.removeBookingFromActiveBookings(bookingId)))
      .subscribe();
  }

  removeBookingFromActiveBookings(bookingId: string) {
    const activeBookingList = this.activeBookings.getValue();
    const updatedActiveBookingList = activeBookingList.filter((booking) => booking.bookingId !== bookingId);
    this.activeBookings.next(updatedActiveBookingList);
  }
}
