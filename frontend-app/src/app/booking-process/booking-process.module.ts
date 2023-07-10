import { NgModule } from '@angular/core';
import { BookingProcessComponent } from './booking-process.component';
import { UiModule } from '@egov/cvi-ng';
import { CommonModule } from '@angular/common';
import { AvailableRoomsModule } from './available-rooms/available-rooms.module';

@NgModule({
  declarations: [BookingProcessComponent],
  exports: [BookingProcessComponent],
  providers: [],
  imports: [UiModule, CommonModule, AvailableRoomsModule],
})
export class BookingProcessModule {}
