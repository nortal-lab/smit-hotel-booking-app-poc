import { NgModule } from '@angular/core';
import { UiModule } from '@egov/cvi-ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppStepsComponent } from './steps/steps/steps.component';
import { AppStepComponent } from './steps/step/step.component';
import { AppStepPanelComponent } from './steps/step-panel/step-panel.component';
import { AppTitleContainerComponent } from './title-container/title-container.component';

@NgModule({
  declarations: [AppStepsComponent, AppStepComponent, AppStepPanelComponent, AppTitleContainerComponent],
  exports: [AppStepsComponent, AppStepComponent, AppStepPanelComponent, AppTitleContainerComponent],
  providers: [],
  imports: [UiModule, FormsModule, CommonModule, HttpClientModule],
})
export class AppUiModule {}
