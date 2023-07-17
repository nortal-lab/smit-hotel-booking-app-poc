import { Component, QueryList, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { AppStepsComponent } from './steps.component';

@Component({
  selector: 'cvi-app-step-panel',
  template: '',
})
class MockAppStepPanelComponent {
  titleChangeSubject = new Subject();
  disabledChangeSubject = new Subject();
}

// @ts-ignore
class MockQueryList<T> extends QueryList<T> {
  override get changes() {
    return of(this);
  }

  override toArray() {
    return this._results;
  }

  override reset(results: T[]) {
    this._results = results;
  }

  constructor(private override _results: T[]) {
    super();
  }
}

describe('AppStepsComponent', () => {
  let component: AppStepsComponent;
  let fixture: ComponentFixture<AppStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppStepsComponent, MockAppStepPanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStepsComponent);
    component = fixture.componentInstance;
    // @ts-ignore
    component.stepPanels = new MockQueryList([new MockAppStepPanelComponent(), new MockAppStepPanelComponent()]);
    fixture.detectChanges();
  });

  it('should emit a step change event when a step is selected', (done) => {
    component.stepChange.subscribe((stepIndex) => {
      expect(stepIndex).toBe(0);
      done();
    });

    component.stepSelected(0);
  });

  it('should update progress when a step is selected', () => {
    component.stepTitles = ['Step 1', 'Step 2'];
    component.stepSelected(0);
    expect(component.currentProgressCSSVar).toBe(50);
  });
});
