import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnDestroy,
} from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'cvi-app-step-panel',
  templateUrl: './step-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppStepPanelComponent implements OnDestroy {
  _title!: string;
  @Input()
  set title(title: string) {
    this._title = title;
    this.titleChangeSubject.next(title);
  }
  get title() {
    return this._title;
  }
  _disabled!: boolean;
  @Input()
  set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.disabledChangeSubject.next(disabled);
  }
  get disabled() {
    return this._disabled;
  }
  @Input() themed = true;

  /** @internal */
  public titleChangeSubject = new ReplaySubject<string>(1);

  /** @internal */
  public disabledChangeSubject = new ReplaySubject<boolean>(1);

  @HostBinding('class') get getHostClasses(): string {
    return `${this.themed ? 'cvi-steps__content-panel' : ''}`;
  }

  ngOnDestroy(): void {
    this.titleChangeSubject.complete();
    this.disabledChangeSubject.complete();
  }
}
