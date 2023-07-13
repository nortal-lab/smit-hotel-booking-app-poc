import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-payment-method-block',
  templateUrl: './payment-method-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethodBlockComponent {}
