import { NgModule } from '@angular/core';
import { SearchFormComponent } from './search-form.component';
import { UiModule } from '@egov/cvi-ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppUiModule } from '../app-ui/app-ui.module';
import { BookingProgressService } from '../booking-process/booking-progress.service';

@NgModule({
  declarations: [SearchFormComponent],
  exports: [SearchFormComponent],
  providers: [BookingProgressService],
  imports: [UiModule, FormsModule, CommonModule, HttpClientModule, RouterModule, AppUiModule],
})
export class SearchFormModule {}
