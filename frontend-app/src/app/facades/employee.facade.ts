import { Injectable } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { forkJoin, map, shareReplay, switchMap, tap } from 'rxjs';
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
      switchMap((bookings) => {
        let allRooms = bookings.map((booking) => this.employeeService.getRoom(booking.roomId));

        return forkJoin(allRooms).pipe(
          map((room) => {
            return bookings.map(
              (x, index) =>
                ({
                  ...x,
                  roomNumber: room[index].roomNumber,
                  roomType: room[index].roomType,
                } as Booking)
            );
          })
        );
      }),
      tap((bookings) => this.activeBookings.next(bookings)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  cancelBooking(bookingId: string) {
    return this.employeeService.cancelBooking(bookingId).pipe(tap(() => this.removeBookingFromActiveBookings(bookingId)));
  }

  removeBookingFromActiveBookings(bookingId: string) {
    const activeBookingList = this.activeBookings.getValue();
    const updatedActiveBookingList = activeBookingList.filter((booking) => booking.bookingId !== bookingId);
    this.activeBookings.next(updatedActiveBookingList);
  }
}
