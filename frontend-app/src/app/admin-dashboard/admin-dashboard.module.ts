import { NgModule } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { UiModule } from '@egov/cvi-ng';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@NgModule({
  declarations: [AdminDashboardComponent],
  exports: [AdminDashboardComponent],
  providers: [],
  imports: [UiModule, FormsModule, NgIf, AsyncPipe, JsonPipe],
})
export class AdminDashboardModule {}
