import { NgModule } from '@angular/core';
import { RoomReservationDetailsComponent } from './room-reservation-details.component';
import { AppUiModule } from '../../app-ui/app-ui.module';
import { CommonModule } from '@angular/common';
import { RoomTypeModule } from '../../shared/pipes/room-type.module';

@NgModule({
  declarations: [RoomReservationDetailsComponent],
  exports: [RoomReservationDetailsComponent],
  providers: [],
  imports: [AppUiModule, CommonModule, RoomTypeModule],
})
export class RoomReservationDetailsModule {}
