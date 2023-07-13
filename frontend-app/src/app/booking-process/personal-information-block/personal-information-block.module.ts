import { NgModule } from '@angular/core';
import { PersonalInformationBlockComponent } from './personal-information-block.component';
import { AppUiModule } from '../../app-ui/app-ui.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PersonalInformationBlockComponent],
  exports: [PersonalInformationBlockComponent],
  providers: [],
  imports: [AppUiModule, CommonModule],
})
export class PersonalInformationBlockModule {}
