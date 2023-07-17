import { Injectable } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { Room } from '../models/room.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Booking } from '../models/booking.interface';
import { AuthService } from '../services/auth.service';
import { TimeService } from '../services/time.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerFacade {
  customerBookings = new BehaviorSubject<Booking[] | null>(null);
  customerBookings$ = this.customerBookings.asObservable();

  constructor(private readonly customerService: CustomerService, private readonly authService: AuthService, private readonly timeService: TimeService) {}

  getAvailableRooms(dateFrom: string, dateTo: string, guestCount: string) {
    const updatedDateFrom = this.timeService.convertDateServerFormat(dateFrom);
    const updatedDateTo = this.timeService.convertDateServerFormat(dateTo);
    return this.customerService.getAvailableRooms(updatedDateFrom, updatedDateTo, guestCount).pipe(
      map((data) => {
        return {
          ...data,
          availableRooms: data.availableRooms.map((room) => {
            const mappedRoom: Room = {
              airConditioning: room.airConditioning,
              balcony: room.balcony,
              bathrobeAndSlippers: room.bathrobeAndSlippers,
              freeBottledWater: room.freeBottledWater,
              freeWiFi: room.freeWiFi,
              inRoomSafe: room.inRoomSafe,
              ironAndIroningBoard: room.ironAndIroningBoard,
              professionalHairDryer: room.professionalHairDryer,
              smartTV: room.smartTV,
              rainShower: room.rainShower,
              roomId: room.roomId,
              peopleCapacity: room.peopleCapacity,
              priceBeforeTaxes: room.priceBeforeTaxes,
              pricePerNightIncludingTaxes: String(room.pricePerNightIncludingTaxes),
              estimatedTaxes: room.estimatedTaxes,
              roomNumber: room.roomNumber,
              roomSizeInSquareMeters: room.roomSizeInSquareMeters,
              roomType: room.roomType,
              bedsType: room.bedsType,
            };

            return mappedRoom;
          }),
        };
      })
    );
  }

  getBookings() {
    this.customerService
      .getBookings()
      .pipe(
        switchMap((bookings) => {
          let allRooms = bookings.map((booking) => this.customerService.getRoom(booking.roomId));

          return forkJoin(allRooms).pipe(
            map((room) => {
              return bookings.map(
                (x, index) =>
                  ({
                    ...x,
                    room: room[index],
                  } as Booking)
              );
            })
          );
        }),
        tap((bookings) => this.customerBookings.next(bookings))
      )
      .subscribe();
  }

  bookRoom(roomId: string, startDate: string, endDate: string) {
    return this.authService.user$.pipe(switchMap((user) => this.customerService.bookRoom(roomId, startDate, endDate, user.givenName, user.familyName)));
  }

  cancelBooking(bookingId: string) {
    return this.customerService.cancelBooking(bookingId).pipe(tap(() => this.removeCustomerBooking(bookingId)));
  }

  removeCustomerBooking(bookingId: string) {
    const customerBookings = this.customerBookings.getValue();
    const updatedCustomerBookings = customerBookings?.filter((booking) => booking.bookingId !== bookingId);
    this.customerBookings.next(updatedCustomerBookings ?? null);
  }
}
