import { Injectable } from '@angular/core';
import { RoomService } from '../services/room.service';

@Injectable({
  providedIn: 'root',
})
export class RoomFacade {
  constructor(private readonly roomService: RoomService) {}

  getAvailableRooms(dateFrom: string, dateTo: string, roomCount: string, guestCount: string) {
    return this.roomService.getAvailableRooms(dateFrom, dateTo, roomCount, guestCount);
  }
}
