import { NgModule } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { UiModule } from '@egov/cvi-ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AvailableRoomsModule } from '../shared/components/available-rooms/available-rooms.module';
import { DateFormatModule } from '../shared/pipes/date-format.module';
import { AppUiModule } from '../app-ui/app-ui.module';
import { CustomerReservationsModule } from './customer-reservations/customer-reservations.module';

@NgModule({
  declarations: [AdminDashboardComponent],
  exports: [AdminDashboardComponent],
  providers: [],
  imports: [UiModule, FormsModule, CommonModule, AvailableRoomsModule, DateFormatModule, AppUiModule, CustomerReservationsModule],
})
export class AdminDashboardModule {}
