import { Pipe, PipeTransform } from '@angular/core';
import { RoomType } from '../../models/room.interface';

@Pipe({
  name: 'roomType',
})
export class RoomTypePipe implements PipeTransform {
  transform(roomType: RoomType): string {
    switch (roomType) {
      case RoomType.DELUXE:
        return 'Deluxe';
      case RoomType.FAMILY:
        return 'Family';
      case RoomType.SINGLE:
        return 'Single';
      case RoomType.STUDIO:
        return 'Studio';
      case RoomType.STANDARD_DOUBLE:
        return 'Standard double';
      case RoomType.STANDARD_TWIN:
        return 'Standard twin';
    }
  }
}
