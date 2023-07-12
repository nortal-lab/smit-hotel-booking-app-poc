import { Meta, StoryFn } from '@storybook/angular';
import { AppTitleContainerComponent } from './title-container.component';

export default {
  title: 'Components/Title container',
  component: AppTitleContainerComponent,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: {
      name: 'Title',
    },
    withContentRight: {
      name: 'With content on a right',
      type: 'boolean',
    },
  },
  args: {
    title: 'Title of the title container(hi!)',
    withContentRight: false,
  },
} as Meta;

const Template: StoryFn<AppTitleContainerComponent> = (args: AppTitleContainerComponent) => ({
  component: AppTitleContainerComponent,
  props: {
    ...args,
  },
  template: `
      <app-title-container title="Title of the title container(hi!)" [withContentRight]="withContentRight">
          <cvi-ng-track [gap]="2" verticalAlignment="center">
            <span><b>with some extra content on the right</b></span>
            <cvi-ng-button [size]="'m'">and a button</cvi-ng-button>
          </cvi-ng-track>
      </app-title-container>
    `,
});

export const Default = {
  render: Template,
};

export const WithContentRight = {
  ...Default,
  name: 'With content on a right',
  args: {
    withContentRight: true,
  },
};
