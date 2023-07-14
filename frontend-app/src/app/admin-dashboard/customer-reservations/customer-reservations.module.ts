import { NgModule } from '@angular/core';
import { CustomerReservationsComponent } from './customer-reservations.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { DateFormatModule } from '../../shared/pipes/date-format.module';
import { UiModule } from '@egov/cvi-ng';
import { RoomTypeModule } from '../../shared/pipes/room-type.module';

@NgModule({
  declarations: [CustomerReservationsComponent],
  exports: [CustomerReservationsComponent],
  providers: [],
  imports: [AsyncPipe, DateFormatModule, NgForOf, UiModule, NgIf, RoomTypeModule],
})
export class CustomerReservationsModule {}
