import { Meta, StoryFn } from '@storybook/angular';
import { AppStepComponent } from './step.component';

export default {
  title: 'Components/CVI Steps/Step',
  component: AppStepComponent,
  parameters: {
    layout: 'padded',
  },
} as Meta;

const Template: StoryFn<AppStepComponent> = (args: AppStepComponent) => ({
  component: AppStepComponent,
  props: {
    ...args,
  },
  /* template */
  template: `
    <cvi-app-steps title="Abiellumine" [currentStepIndex]="0">
      <cvi-app-step>
        <cvi-app-step-panel title="The title">
          Some content for the first step
        </cvi-app-step-panel>
      </cvi-app-step>
      <cvi-app-step>
        <cvi-app-step-panel title="Another step">
          Some more content
        </cvi-app-step-panel>
      </cvi-app-step>
    </cvi-app-steps>
  `,
});

export const Default = {
  render: Template,
};
