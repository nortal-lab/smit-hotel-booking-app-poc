import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppStepPanelComponent } from './step-panel.component';

describe('AppStepPanelComponent', () => {
  let component: AppStepPanelComponent;
  let fixture: ComponentFixture<AppStepPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppStepPanelComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppStepPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update title property and emit a new value when title input changes', (done) => {
    const newTitle = 'New Title';
    component.titleChangeSubject.subscribe((value) => {
      expect(value).toBe(newTitle);
      done();
    });

    component.title = newTitle;
  });

  it('should update disabled property and emit a new value when disabled input changes', (done) => {
    const newDisabled = true;
    component.disabledChangeSubject.subscribe((value) => {
      expect(value).toBe(newDisabled);
      done();
    });

    component.disabled = newDisabled;
  });

  it('should not apply themed class when themed property is false', () => {
    component.themed = false;
    fixture.detectChanges();

    const panelElement = fixture.debugElement.query(By.css('.cvi-steps__content-panel'));
    expect(panelElement).toBeNull();
  });

  it('should complete the titleChangeSubject and disabledChangeSubject when component is destroyed', () => {
    const spy1 = jest.spyOn(component.titleChangeSubject, 'complete');
    const spy2 = jest.spyOn(component.disabledChangeSubject, 'complete');

    component.ngOnDestroy();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});
