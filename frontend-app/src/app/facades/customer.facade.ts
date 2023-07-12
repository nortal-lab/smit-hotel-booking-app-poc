import { Injectable } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { map } from 'rxjs';
import { Room } from '../models/room.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerFacade {
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
            pricePerNight: String(room.pricePerNight),
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
    return this.customerService.getBookings();
  }
}
