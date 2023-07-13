import { Injectable } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { catchError, of, shareReplay, tap } from 'rxjs';
import { Booking } from '../models/booking.interface';
import { ToastService } from '@egov/cvi-ng';

@Injectable({
  providedIn: 'root',
})
export class EmployeeFacade {
  activeBookings = new BehaviorSubject<Booking[]>([]);
  activeBookings$ = this.activeBookings.asObservable();

  constructor(private readonly employeeService: EmployeeService, private readonly toastService: ToastService) {}

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
      .pipe(
        tap(() => this.removeBookingFromActiveBookings(bookingId)),
        catchError(() => of(this.toastService.error('Unable to cancel booking, please contact system Administrator.')))
      )
      .subscribe();
  }

  removeBookingFromActiveBookings(bookingId: string) {
    const activeBookingList = this.activeBookings.getValue();
    const updatedActiveBookingList = activeBookingList.filter((booking) => booking.bookingId !== bookingId);
    this.activeBookings.next(updatedActiveBookingList);
  }
}
