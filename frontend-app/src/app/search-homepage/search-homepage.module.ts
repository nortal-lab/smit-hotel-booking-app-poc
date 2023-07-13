import { NgModule } from '@angular/core';
import { SearchHomepageComponent } from './search-homepage.component';
import { UiModule } from '@egov/cvi-ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppUiModule } from '../app-ui/app-ui.module';

@NgModule({
  declarations: [SearchHomepageComponent],
  exports: [SearchHomepageComponent],
  providers: [],
  imports: [UiModule, FormsModule, CommonModule, HttpClientModule, RouterOutlet, BrowserAnimationsModule, AppUiModule],
})
export class SearchHomepageModule {}
