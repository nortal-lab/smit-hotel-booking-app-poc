import { Injectable } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { AvailableRooms, Room, RoomData } from '../models/room.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Booking } from '../models/booking.interface';
import { AuthService } from '../services/auth.service';
import { TimeService } from '../services/time.service';
import { ToastService } from '@egov/cvi-ng';

@Injectable({
  providedIn: 'root',
})
export class CustomerFacade {
  customerBookings = new BehaviorSubject<Booking[] | null>(null);
  customerBookings$ = this.customerBookings.asObservable();

  constructor(
    private readonly customerService: CustomerService,
    private readonly authService: AuthService,
    private readonly timeService: TimeService,
    private readonly toastService: ToastService
  ) {}

  getAvailableRooms(dateFrom: string, dateTo: string, guestCount: string): Observable<AvailableRooms> {
    const updatedDateFrom = this.timeService.convertDateServerFormat(dateFrom);
    const updatedDateTo = this.timeService.convertDateServerFormat(dateTo);
    const differenceInHours = this.timeService.differenceInHours(updatedDateTo, updatedDateFrom);
    if (differenceInHours < 24) {
      this.toastService.error('Only full day stay is possible');
      return of({
        startDate: updatedDateFrom,
        endDate: updatedDateTo,
        availableRooms: [],
      } as AvailableRooms);
    }

    return this.customerService.getAvailableRooms(updatedDateFrom, updatedDateTo, guestCount).pipe(
      map((data) => {
        return {
          ...data,
          availableRooms: data.availableRooms.map((roomData) => {
            const mappedRoom: Room = {
              airConditioning: roomData.room.airConditioning,
              balcony: roomData.room.balcony,
              bathrobeAndSlippers: roomData.room.bathrobeAndSlippers,
              freeBottledWater: roomData.room.freeBottledWater,
              freeWiFi: roomData.room.freeWiFi,
              inRoomSafe: roomData.room.inRoomSafe,
              ironAndIroningBoard: roomData.room.ironAndIroningBoard,
              professionalHairDryer: roomData.room.professionalHairDryer,
              smartTV: roomData.room.smartTV,
              rainShower: roomData.room.rainShower,
              roomId: roomData.room.roomId,
              peopleCapacity: roomData.room.peopleCapacity,
              priceBeforeTaxes: roomData.room.priceBeforeTaxes,
              pricePerNightIncludingTaxes: String(roomData.room.pricePerNightIncludingTaxes),
              estimatedTaxes: roomData.room.estimatedTaxes,
              roomNumber: roomData.room.roomNumber,
              roomSizeInSquareMeters: roomData.room.roomSizeInSquareMeters,
              roomType: roomData.room.roomType,
              bedsType: roomData.room.bedsType,
            };

            return {
              room: mappedRoom,
              totalPriceForStayDuration: String(roomData.totalPriceForStayDuration),
              estimatedTaxesForFullStayDuration: roomData.estimatedTaxesForFullStayDuration,
              priceBeforeTaxesForFullStayDuration: roomData.priceBeforeTaxesForFullStayDuration,
            } as RoomData;
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
