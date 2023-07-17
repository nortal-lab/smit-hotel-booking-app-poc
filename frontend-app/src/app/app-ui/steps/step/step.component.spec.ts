import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppStepComponent } from './step.component';

describe('AppStepComponent', () => {
  let component: AppStepComponent;
  let fixture: ComponentFixture<AppStepComponent>;
  let mockElementRef = new ElementRef({ nativeElement: {} });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppStepComponent],
      providers: [ChangeDetectorRef, { provide: ElementRef, useValue: mockElementRef }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct host classes', () => {
    const hostElement = fixture.debugElement.nativeElement;
    expect(hostElement.getAttribute('class')).toContain('cvi-steps__step');
  });

  it('should not render content if isVisible is false', () => {
    component.isVisible = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('ng-content'))).toBeNull();
  });
});
