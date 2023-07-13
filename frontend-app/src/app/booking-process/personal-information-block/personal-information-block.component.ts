import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-personal-information-block',
  templateUrl: './personal-information-block.component.html',
  styleUrls: ['./personal-information-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInformationBlockComponent {
  @Input() userCredentials?: User;
}
