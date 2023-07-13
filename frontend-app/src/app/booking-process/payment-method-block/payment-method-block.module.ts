import { NgModule } from '@angular/core';
import { PaymentMethodBlockComponent } from './payment-method-block.component';
import { AppUiModule } from '../../app-ui/app-ui.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PaymentMethodBlockComponent],
  exports: [PaymentMethodBlockComponent],
  providers: [],
  imports: [AppUiModule, CommonModule],
})
export class PaymentMethodBlockModule {}
