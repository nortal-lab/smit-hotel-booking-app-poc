import { Pipe, PipeTransform } from '@angular/core';
import { BedType } from '../../models/room.interface';

@Pipe({
  name: 'bedType',
})
export class BedTypePipe implements PipeTransform {
  transform(bedType: BedType): string {
    switch (bedType) {
      case BedType.ONA_KING_AND_ONE_SOFA:
        return '1 king and 1 sofa';
      case BedType.ONE_DOUBLE:
        return '1 double';
      case BedType.ONE_TWIN:
        return '1 twin';
      case BedType.TWO_TWIN:
        return '2 twin';
    }
  }
}
