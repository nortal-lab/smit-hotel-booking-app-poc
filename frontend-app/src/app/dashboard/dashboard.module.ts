import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { UiModule } from '@egov/cvi-ng';

@NgModule({
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  providers: [],
  imports: [UiModule],
})
export class DashboardModule {}
