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
  },
  args: {
    title: 'First step',
    content: 'First step content.',
  },
} as Meta;

const Template: StoryFn<AppStepPanelComponent> = (args: AppStepPanelComponent) => ({
  component: AppStepPanelComponent,
  props: {
    ...args,
  },
  /* template */
  template: `
    <cvi-app-steps title="Abiellumine" [currentStepIndex]="0">
      <cvi-app-step>
        <cvi-app-step-panel [title]="title">
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
