import { NgModule } from '@angular/core';
import { BookingProcessComponent } from './booking-process.component';
import { UiModule } from '@egov/cvi-ng';
import { CommonModule } from '@angular/common';
import { AvailableRoomsModule } from './available-rooms/available-rooms.module';
import { RouterModule } from '@angular/router';
import { AppUiModule } from '../app-ui/app-ui.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BookingProcessComponent],
  exports: [BookingProcessComponent],
  providers: [],
  imports: [UiModule, CommonModule, AvailableRoomsModule, RouterModule, AppUiModule, FormsModule],
})
export class BookingProcessModule {}
