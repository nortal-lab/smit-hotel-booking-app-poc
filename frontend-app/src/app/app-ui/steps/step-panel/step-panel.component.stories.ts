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
    title: 'First step',
    themed: true,
    content: 'First step content.',
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
        <cvi-app-step-panel [title]="title" [themed]="themed">
          {{ content }}
        </cvi-app-step-panel>
      </cvi-app-step>
      <cvi-app-step title="Another step">
        <cvi-app-step-panel title="Another step title">
          <cvi-ng-button>Hey</cvi-ng-button>
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
    themed: false, 
    stepsDirectionalButtonsDisplayed: false
  }
};
