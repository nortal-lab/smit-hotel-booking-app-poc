import { NgModule } from '@angular/core';
import { BookingProcessComponent } from './booking-process.component';
import { UiModule } from '@egov/cvi-ng';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppUiModule } from '../app-ui/app-ui.module';
import { FormsModule } from '@angular/forms';
import { AvailableRoomsModule } from '../shared/components/available-rooms/available-rooms.module';
import { PersonalInformationBlockModule } from './personal-information-block/personal-information-block.module';
import { PaymentMethodBlockModule } from './payment-method-block/payment-method-block.module';
import { OrderSummaryBlockModule } from './order-summary-block/order-summary-block.module';
import { PriceSummaryBlockModule } from './price-summary-block/price-summary-block.module';
import { RoomReservationDetailsModule } from './room-reservation-details/room-reservation-details.module';

@NgModule({
  declarations: [BookingProcessComponent],
  exports: [BookingProcessComponent],
  providers: [],
  imports: [
    UiModule,
    CommonModule,
    RouterModule,
    AppUiModule,
    FormsModule,
    AvailableRoomsModule,
    PersonalInformationBlockModule,
    PaymentMethodBlockModule,
    OrderSummaryBlockModule,
    PriceSummaryBlockModule,
    RoomReservationDetailsModule,
  ],
})
export class BookingProcessModule {}
