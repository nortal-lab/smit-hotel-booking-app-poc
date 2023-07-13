import { Injectable } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { map, tap } from 'rxjs';
import { Room } from '../models/room.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Booking } from '../models/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerFacade {
  customerBookings = new BehaviorSubject<Booking[] | null>(null);
  customerBookings$ = this.customerBookings.asObservable();

  constructor(private readonly customerService: CustomerService) {}

  getAvailableRooms(dateFrom: string, dateTo: string, guestCount: string) {
    return this.customerService.getAvailableRooms(dateFrom, dateTo, guestCount).pipe(
      map((data) => {
        return data.map((room) => {
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
        });
      })
    );
  }

  getBookings() {
    this.customerService
      .getBookings()
      .pipe(tap((bookings) => this.customerBookings.next(bookings)))
      .subscribe();
  }

  bookRoom() {
    return this.customerService.bookRoom();
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
