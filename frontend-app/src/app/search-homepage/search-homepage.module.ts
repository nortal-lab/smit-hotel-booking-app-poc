import { NgModule } from '@angular/core';
import { SearchHomepageComponent } from './search-homepage.component';
import { UiModule } from '@egov/cvi-ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchContainerModule } from '../shared/search-container/search-container.module';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [SearchHomepageComponent],
  exports: [SearchHomepageComponent],
  providers: [],
  imports: [UiModule, FormsModule, CommonModule, HttpClientModule, SearchContainerModule, RouterOutlet, BrowserAnimationsModule],
})
export class SearchHomepageModule {}
