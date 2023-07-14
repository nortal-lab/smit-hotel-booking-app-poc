import {
  Component, Input,
} from '@angular/core';
import { UiLink } from '../../models/ui/link.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() extraLink!: UiLink | null; 
}
