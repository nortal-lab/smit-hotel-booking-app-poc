import { NgModule } from '@angular/core';
import { OrderSummaryBlockComponent } from './order-summary-block.component';
import { AppUiModule } from '../../app-ui/app-ui.module';
import { CommonModule } from '@angular/common';
import { RoomTypeModule } from '../../shared/pipes/room-type.module';
import { UiModule } from '@egov/cvi-ng';

@NgModule({
  declarations: [OrderSummaryBlockComponent],
  exports: [OrderSummaryBlockComponent],
  providers: [],
  imports: [AppUiModule, CommonModule, RoomTypeModule, UiModule],
})
export class OrderSummaryBlockModule {}
