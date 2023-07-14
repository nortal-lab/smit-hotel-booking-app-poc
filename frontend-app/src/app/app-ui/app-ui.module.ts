import { NgModule } from '@angular/core';
import { UiModule } from '@egov/cvi-ng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AppStepsComponent } from './steps/steps/steps.component';
import { AppStepComponent } from './steps/step/step.component';
import { AppStepPanelComponent } from './steps/step-panel/step-panel.component';
import { HeroComponent } from './hero/hero.component';
import { TitleContainerComponent } from './title-container/title-container.component';
import { BookingCardComponent } from './booking-card/booking-card.component';
import { PageContentWrapperComponent } from './page-content-wrapper/page-content-wrapper.component';
import { SearchContainerComponent } from './search-container/search-container.component';
import { BookingSidebarComponent } from './booking-sidebar/booking-sidebar.component';
import { DataSectionComponent } from './data-section/data-section.component';
import { DefinitionTableComponent } from './definition-table/definition-table.component';
import { DefinitionItemComponent } from './definition-item/definition-item.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { CircularButtonComponent } from './circular-button/circular-button.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';

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
  TitleContainerComponent,
  HeroComponent,
  SearchContainerComponent,
  CircularButtonComponent,
  SearchInputComponent,
  BookingDetailsComponent,
  FooterComponent,
  HeaderComponent,
  IconButtonComponent,
  PageWrapperComponent
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
