import { NgModule } from '@angular/core';
import { OrderSummaryBlockComponent } from './order-summary-block.component';
import { AppUiModule } from '../../app-ui/app-ui.module';
import { CommonModule } from '@angular/common';
import { RoomTypeModule } from '../../shared/pipes/room-type.module';
import { UiModule } from '@egov/cvi-ng';
import { DateFormatModule } from '../../shared/pipes/date-format.module';

@NgModule({
  declarations: [OrderSummaryBlockComponent],
  exports: [OrderSummaryBlockComponent],
  providers: [],
  imports: [AppUiModule, CommonModule, RoomTypeModule, UiModule, DateFormatModule],
})
export class OrderSummaryBlockModule {}
