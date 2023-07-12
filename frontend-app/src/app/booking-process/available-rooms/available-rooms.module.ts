import { NgModule } from '@angular/core';
import { UiModule } from '@egov/cvi-ng';
import { CommonModule } from '@angular/common';
import { AvailableRoomsComponent } from './available-rooms.component';
import { AppUiModule } from '../../app-ui/app-ui.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BedTypePipe } from '../../shared/pipes/bed-type.pipe';
import { RoomTypePipe } from '../../shared/pipes/room-type.pipe';

@NgModule({
  declarations: [AvailableRoomsComponent, BedTypePipe, RoomTypePipe],
  exports: [AvailableRoomsComponent],
  providers: [],
  imports: [UiModule, CommonModule, AppUiModule, FontAwesomeModule],
})
export class AvailableRoomsModule {}
