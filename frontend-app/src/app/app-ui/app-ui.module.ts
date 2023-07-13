import { NgModule } from '@angular/core';
import { UiModule } from '@egov/cvi-ng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AppStepsComponent } from './steps/steps/steps.component';
import { AppStepComponent } from './steps/step/step.component';
import { AppStepPanelComponent } from './steps/step-panel/step-panel.component';
import { AppTitleContainerComponent } from './title-container/title-container.component';
import { BookingCardComponent } from './booking-card/booking-card.component';
import { PageContentWrapperComponent } from './page-content-wrapper/page-content-wrapper.component';
import { AppSearchContainerComponent } from './search-container/search-container.component';
import { BookingSidebarComponent } from './booking-sidebar/booking-sidebar.component';
import { DataSectionComponent } from './data-section/data-section.component';
import { DefinitionTableComponent } from './definition-table/definition-table.component';
import { DefinitionItemComponent } from './definition-item/definition-item.component';
import { CircularButtonComponent } from './circular-button/circular-button.component';
import { SearchInputComponent } from './search-input/search-input.component';

const components = [
  AppStepsComponent,
  AppStepComponent,
  AppStepPanelComponent,
  BookingCardComponent,
  PageContentWrapperComponent,
  BookingSidebarComponent,
  DataSectionComponent,
  DefinitionTableComponent,
  DefinitionItemComponent,
  AppTitleContainerComponent,
  AppSearchContainerComponent,
  CircularButtonComponent,
  SearchInputComponent
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  providers: [],
  imports: [
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FontAwesomeModule
  ],
})
export class AppUiModule {}
