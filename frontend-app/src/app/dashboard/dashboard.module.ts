import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { UiModule } from '@egov/cvi-ng';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  providers: [],
  imports: [UiModule, FormsModule],
})
export class DashboardModule {}
