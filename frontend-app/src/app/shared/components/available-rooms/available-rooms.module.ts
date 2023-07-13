import { NgModule } from '@angular/core';
import { AvailableRoomsComponent } from './available-rooms.component';
import { AppUiModule } from '../../../app-ui/app-ui.module';
import { UiModule } from '@egov/cvi-ng';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { BedTypeModule } from '../../pipes/bed-type.module';
import { RoomTypeModule } from '../../pipes/room-type.module';

@NgModule({
  declarations: [AvailableRoomsComponent],
  exports: [AvailableRoomsComponent],
  providers: [],
  imports: [AppUiModule, UiModule, FontAwesomeModule, CommonModule, BedTypeModule, RoomTypeModule],
})
export class AvailableRoomsModule {}
