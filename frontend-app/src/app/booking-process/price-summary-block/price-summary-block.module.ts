import { NgModule } from '@angular/core';
import { PriceSummaryBlockComponent } from './price-summary-block.component';
import { AppUiModule } from '../../app-ui/app-ui.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PriceSummaryBlockComponent],
  exports: [PriceSummaryBlockComponent],
  providers: [],
  imports: [AppUiModule, CommonModule],
})
export class PriceSummaryBlockModule {}
