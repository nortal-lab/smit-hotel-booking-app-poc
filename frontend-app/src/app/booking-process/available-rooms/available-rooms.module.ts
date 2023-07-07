import { NgModule } from '@angular/core';
import { UiModule } from '@egov/cvi-ng';
import { CommonModule } from '@angular/common';
import { AvailableRoomsComponent } from './available-rooms.component';

@NgModule({
  declarations: [AvailableRoomsComponent],
  exports: [AvailableRoomsComponent],
  providers: [],
  imports: [UiModule, CommonModule],
})
export class AvailableRoomsModule {}
