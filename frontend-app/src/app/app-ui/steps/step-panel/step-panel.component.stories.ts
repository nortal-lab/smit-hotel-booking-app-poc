import { Meta, StoryFn } from '@storybook/angular';
import { AppStepPanelComponent } from './step-panel.component';

export default {
  title: 'Components/CVI Steps/Step panel',
  component: AppStepPanelComponent,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    content: {
      name: 'Content',
      table: {
        category: 'Playground',
      },
    },
    stepsDirectionalButtonsDisplayed: {
      name: 'Directional navigation displayed',
      table: {
        category: 'Playground',
      },
      control: {
        type: 'boolean'
      }
    }
  },
  args: {
    title: 'Another step title',
    themed: true,
    disabled: false,
    titleHidden: false,
    content: 'Another step content.',
    stepsDirectionalButtonsDisplayed: true
  },
} as Meta;

const Template: StoryFn<AppStepPanelComponent> = (args: AppStepPanelComponent) => ({
  component: AppStepPanelComponent,
  props: {
    ...args,
  },
  /* template */
  template: `
    <cvi-app-steps title="Abiellumine" [currentStepIndex]="0" [directionalButtonsDisplayed]="stepsDirectionalButtonsDisplayed">
      <cvi-app-step>
        <cvi-app-step-panel title="First step">
          <cvi-ng-button>Hey</cvi-ng-button>
        </cvi-app-step-panel>
      </cvi-app-step>
      <cvi-app-step>
        <cvi-app-step-panel title="Second step">
          Say ooh la-la come on come on
        </cvi-app-step-panel>
      </cvi-app-step>
      <cvi-app-step>
        <cvi-app-step-panel [title]="title" [themed]="themed" [disabled]="disabled" [titleHidden]="titleHidden">
          {{ content }}
        </cvi-app-step-panel>
      </cvi-app-step>
    </cvi-app-steps>
  `,
});

export const Default = {
  render: Template,
};

export const Unthemed = {
  ...Default,
  args: {
    title: 'Unthemed step panel without navigation and title',
    themed: false, 
    titleHidden: true,
    stepsDirectionalButtonsDisplayed: false
  }
};

export const Disabled = {
  ...Default,
  args: {
    title: 'I am disabled!',
    disabled: true, 
    stepsDirectionalButtonsDisplayed: false
  }
};
