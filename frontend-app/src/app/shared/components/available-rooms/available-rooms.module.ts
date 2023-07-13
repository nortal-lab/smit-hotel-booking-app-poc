import { NgModule } from '@angular/core';
import { AvailableRoomsComponent } from './available-rooms.component';
import { BedTypePipe } from '../../pipes/bed-type.pipe';
import { RoomTypePipe } from '../../pipes/room-type.pipe';
import { AppUiModule } from '../../../app-ui/app-ui.module';
import { UiModule } from '@egov/cvi-ng';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AvailableRoomsComponent, BedTypePipe, RoomTypePipe],
  exports: [AvailableRoomsComponent],
  providers: [],
  imports: [AppUiModule, UiModule, FontAwesomeModule, CommonModule],
})
export class AvailableRoomsModule {}
