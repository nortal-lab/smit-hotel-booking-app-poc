import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { AppStepComponent } from '../step/step.component';
import { AppStepPanelComponent } from '../step-panel/step-panel.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cvi-app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppStepsComponent
  implements AfterViewInit, AfterContentInit, OnChanges, OnDestroy
{
  @Input() title!: string;

  @Input() currentStepIndex: number | null = null;
  @Input() hasTableOfContents = false;
  @Input() directionalButtonsDisplayed = true;

  /** Index of a step, used to initiate step change from a parent component */
  @Input() stepIndex: number | null = null;

  @Output() stepChange = new EventEmitter<number>();

  stepTitles!: string[];
  stepDisabledStates!: boolean[];
  @Input() currentProgressCSSVar = 0;
  @Input() anyStepSelected = false;
  @ContentChildren(AppStepComponent) stepChildren!: QueryList<AppStepComponent>;

  panelSubscription!: Subscription;
  _stepPanels!: QueryList<AppStepPanelComponent>;
  @ContentChildren(AppStepPanelComponent, { descendants: true })
  set stepPanels(panels: QueryList<AppStepPanelComponent>) {
    if (this.panelSubscription) {
      this.panelSubscription.unsubscribe();
    }
    this.panelSubscription = new Subscription();
    this._stepPanels = panels;
    this._stepPanels
      .toArray()
      .forEach((stepPanel: AppStepPanelComponent, i: number) => {
        this.panelSubscription.add(
          stepPanel.titleChangeSubject.subscribe((title: string) => {
            if (this.stepTitles && title) {
              this.stepTitles[i] = title;
            }
          })
        );
        this.panelSubscription.add(
          stepPanel.disabledChangeSubject.subscribe((disabled: boolean) => {
            if (this.stepDisabledStates && disabled) {
              this.stepDisabledStates[i] = disabled;
            }
          })
        );
      });
  }
  get stepPanels() {
    return this._stepPanels;
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  @HostBinding('class') get getHostClasses(): string {
    return `cvi-steps${this.anyStepSelected ? ' is-any-step-selected' : ''}${
      this.hasTableOfContents ? ' has-toc' : ''
    }`;
  }

  @HostBinding('style.--current-step') get getCurrentStepAsCSSVar(): string {
    return this.currentStepIndex === null
      ? ''
      : `'${this.currentStepIndex + 1}'`;
  }

  ngAfterContentInit(): void {
    this.updateTitles(this.getPanels());
    this.updateDisabledStates(this.getPanels());
    if (this.currentStepIndex !== null) {
      this.anyStepSelected = true;
      this.setProgress(this.currentStepIndex);
    }
    this.hideStepsContent();
  }

  ngAfterViewInit(): void {
    this.stepChildren.changes.subscribe(() => {
      this.hideStepsContent();
      this.cdRef.markForCheck();
    });
    this._stepPanels.changes.subscribe((stepPanels: AppStepPanelComponent[]) => {
      this.updateTitles(stepPanels);
      this.updateDisabledStates(stepPanels);
      this.cdRef.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const stepIndexChange = changes['stepIndex'];
    if (stepIndexChange && this.stepChildren) {
      this.stepSelected(stepIndexChange.currentValue);
    }
  }

  ngOnDestroy(): void {
    if (this.panelSubscription) {
      this.panelSubscription.unsubscribe();
    }
  }
  
  getPanels() {
    return this._stepPanels.toArray();
  }

  updateTitles(stepPanels: AppStepPanelComponent[]) {
    this.stepTitles = stepPanels.map(
      (stepPanel: AppStepPanelComponent) => stepPanel.title
    );
  }

  updateDisabledStates(stepPanels: AppStepPanelComponent[]) {
    this.stepDisabledStates = stepPanels.map(
      (stepPanel: AppStepPanelComponent) => stepPanel.disabled
    );
  }

  stepSelected(stepIndex: number): void {
    if (this.currentStepIndex == stepIndex) {
      return;
    }
    this.anyStepSelected = true;
    this.currentStepIndex = stepIndex;
    this.hideStepsContent();
    this.setProgress(stepIndex);
    this.stepChange.emit(this.currentStepIndex);
  }

  hideStepsContent(): void {
    this.stepChildren.map((step: AppStepComponent, stepIndex: number) => {
      step.isVisible = stepIndex === this.currentStepIndex;
    });
  }

  setProgress(stepIndex: number) {
    this.currentProgressCSSVar = Math.round(
      ((stepIndex + 1) / this.stepTitles.length) * 100
    );
  }
}
