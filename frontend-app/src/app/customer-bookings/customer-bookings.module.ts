import { NgModule } from '@angular/core';
import { CustomerBookingsComponent } from './customer-bookings.component';
import { CommonModule } from '@angular/common';
import { UiModule } from '@egov/cvi-ng';
import { RouterModule } from '@angular/router';
import { AppUiModule } from '../app-ui/app-ui.module';
import { RoomTypeModule } from '../shared/pipes/room-type.module';
import { BedTypeModule } from '../shared/pipes/bed-type.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DateFormatModule } from '../shared/pipes/date-format.module';

@NgModule({
  declarations: [CustomerBookingsComponent],
  exports: [CustomerBookingsComponent],
  providers: [],
  imports: [CommonModule, UiModule, RouterModule, AppUiModule, RoomTypeModule, BedTypeModule, FontAwesomeModule, DateFormatModule],
})
export class CustomerBookingsModule {}
