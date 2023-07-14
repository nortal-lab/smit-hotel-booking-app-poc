import { NgModule } from '@angular/core';
import { RoomReservationDetailsComponent } from './room-reservation-details.component';
import { AppUiModule } from '../../app-ui/app-ui.module';
import { CommonModule } from '@angular/common';
import { RoomTypeModule } from '../../shared/pipes/room-type.module';
import { UiModule } from '@egov/cvi-ng';

@NgModule({
  declarations: [RoomReservationDetailsComponent],
  exports: [RoomReservationDetailsComponent],
  providers: [],
  imports: [UiModule, AppUiModule, CommonModule, RoomTypeModule],
})
export class RoomReservationDetailsModule {}
