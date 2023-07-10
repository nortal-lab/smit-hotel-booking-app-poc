import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { concatMap, delay, from, of } from 'rxjs';
import { AppStepsComponent } from './steps.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

const withObservableTitlesDelay = 1000;

export default {
  title: 'Components/CVI Steps/Steps',
  parameters: {
    layout: 'padded',
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  argTypes: {
    stepsContent: {
      controls: false,
    },
    currentStepIndex: {
      name: 'Current step (starting from 0)',
      control: { type: 'number', min: 0 },
    },
  },
  args: {
    title: 'Abiellumine',
    currentStepIndex: null,
    directionalButtonsDisplayed: true,
    stepsContent: [
      '<a href="https://www.eesti.ee">Nevertheless, Cosy Moments thrives. It has its public.</a>',
      'Its contents are mildly interesting, if you like that sort of thing.',
      'There is a "Moments in the Nursery" page, conducted by Luella Granville Waterman.',
      'There is a "Moments of Meditation" page, conducted by the Reverend Edwin T. Philpotts.',
    ],
  },
} as Meta<AppStepsComponent>;

const Template: StoryFn<AppStepsComponent> = (args: AppStepsComponent) => {
  const form = new FormGroup({
    text: new FormControl('Some text'),
  });
  return {
    component: AppStepsComponent,
    props: {
      ...args,
      form: form,
      formMinRows: 5,
      formHtmlId: 'fk123sd4kfds',
      formLabel: 'Label',
    },
    /* template */
    template: `
      <cvi-app-steps [title]="title" [currentStepIndex]="currentStepIndex" [hasTableOfContents]="hasTableOfContents" [directionalButtonsDisplayed]="directionalButtonsDisplayed">
        <p cvi-steps="after-title">You can now add custom content before steps</p>
        <cvi-app-step>
          <cvi-app-step-panel [title]="title">
            fdsfsdds fsd fs
          </cvi-app-step-panel>
        </cvi-app-step>
        <cvi-app-step>
          <cvi-app-step-panel title="Second">
            {{ stepsContent[1] }}
          </cvi-app-step-panel>
        </cvi-app-step>
        <cvi-app-step>
          <cvi-app-step-panel title="Third">
            {{ stepsContent[2] }}
          </cvi-app-step-panel>
        </cvi-app-step>
        <cvi-app-step>
          <cvi-app-step-panel title="Fourth">
            {{ stepsContent[3] }}
          </cvi-app-step-panel>
        </cvi-app-step>
      </cvi-app-steps>
    `,
  };
};

export const Default = {
  render: Template,
};

export const WithoutNavButtons = {
  ...Default,
  args: {
    directionalButtonsDisplayed: false
  }
};

export const WithSelectedStep = {
  ...Default,
  args: {
    currentStepIndex: 0,
  },
};

export const Mobile = {
  ...Default,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
    viewport: {
      defaultViewport: 'iphone12mini',
    },
  },
};

export const MobileWithSelectedStep = {
  ...Default,
  args: {
    currentStepIndex: 0,
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
    viewport: {
      defaultViewport: 'iphone12mini',
    },
  },
};

const TemplateObservableTitles: StoryFn = (args) => ({
  props: {
    ...args,
    labels$: from([['First', 'Second', 'Third']]).pipe(
      concatMap((item) => of(item).pipe(delay(withObservableTitlesDelay)))
    ),
  },
  /* template */
  template: `
    <cvi-app-steps [title]="title" [currentStepIndex]="currentStepIndex" [hasTableOfContents]="hasTableOfContents" [directionalButtonsDisplayed]="directionalButtonsDisplayed">
      <ng-container *ngFor="let label of labels$ | async">
        <cvi-app-step>
          <cvi-app-step-panel [title]="label">
            {{ label }}
          </cvi-app-step-panel>
        </cvi-app-step>
      </ng-container>
    </cvi-app-steps>
  `,
});

export const WithObservableTitles = {
  render: TemplateObservableTitles,
};
