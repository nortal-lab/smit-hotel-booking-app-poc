import { NgModule } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { UiModule } from '@egov/cvi-ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';

@NgModule({
  declarations: [AdminDashboardComponent, DateFormatPipe],
  exports: [AdminDashboardComponent],
  providers: [],
  imports: [UiModule, FormsModule, CommonModule],
})
export class AdminDashboardModule {}
