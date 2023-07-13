import { Injectable } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { catchError, map, of, tap } from 'rxjs';
import { Room } from '../models/room.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Booking } from '../models/booking.interface';
import { ToastService } from '@egov/cvi-ng';

@Injectable({
  providedIn: 'root',
})
export class CustomerFacade {
  customerBookings = new BehaviorSubject<Booking[] | null>(null);
  customerBookings$ = this.customerBookings.asObservable();

  constructor(private readonly customerService: CustomerService, private readonly toastService: ToastService) {}

  getAvailableRooms(dateFrom: string, dateTo: string, guestCount: string) {
    return this.customerService.getAvailableRooms(dateFrom, dateTo, guestCount).pipe(
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
        tap((bookings) => this.customerBookings.next(bookings)),
        catchError(() => of(this.toastService.error('Unable to retrieve reservations, please contact system Administrator.')))
      )
      .subscribe();
  }

  bookRoom() {
    return this.customerService.bookRoom();
  }

  cancelBooking(bookingId: string) {
    return this.customerService.cancelBooking(bookingId).pipe(
      tap(() => this.removeCustomerBooking(bookingId)),
      catchError(() => of(this.toastService.error('Unable to cancel booking, please contact system Administrator.')))
    );
  }

  removeCustomerBooking(bookingId: string) {
    const customerBookings = this.customerBookings.getValue();
    const updatedCustomerBookings = customerBookings?.filter((booking) => booking.bookingId !== bookingId);
    this.customerBookings.next(updatedCustomerBookings ?? null);
  }
}
