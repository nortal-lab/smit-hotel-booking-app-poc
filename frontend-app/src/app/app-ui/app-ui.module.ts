import { NgModule } from '@angular/core';
import { UiModule } from '@egov/cvi-ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppStepsComponent } from './steps/steps/steps.component';
import { AppStepComponent } from './steps/step/step.component';
import { AppStepPanelComponent } from './steps/step-panel/step-panel.component';
import { BookingCardComponent } from './booking-card/booking-card.component';

const components = [
  AppStepsComponent, 
  AppStepComponent, 
  AppStepPanelComponent,
  BookingCardComponent
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  providers: [],
  imports: [UiModule, FormsModule, CommonModule, HttpClientModule],
})
export class AppUiModule {}
