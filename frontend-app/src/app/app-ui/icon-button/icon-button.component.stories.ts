import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { IconButtonComponent } from './icon-button.component';

const wrapperDecorators = [
  componentWrapperDecorator(IconButtonComponent, ({ args }) => {
    return args;
  }),
];

const meta: Meta<IconButtonComponent & { content: string }> = {
  title: 'Components/Icon button',
  component: IconButtonComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onClick: { action: 'Button clicked!' },
    content: {
      name: 'Content',
      table: {
        category: 'Playground',
      },
    },
  },
};

export default meta;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `{{ content }}`,
  }),
  decorators: wrapperDecorators,
  args: {
    content: 'Sign out',
    iconName: 'logout',
  }
};

export const WithSVG: StoryObj = {
  render: (args) => ({
    props: args,
    /* template */
    template: `
      <app-icon-button (click)="onClick()">
        <!-- No need to use styles or cvi-ng-track. Just place SVG element and label next to each other -->
        <svg viewBox="0 0 18 18" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 5L12.59 6.41L14.17 8H6V10H14.17L12.59 11.58L14 13L18 9L14 5ZM2 2H9V0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H9V16H2V2Z" />
        </svg>
        Logout
      </app-icon-button>
    `,
  }),
};

type Story = StoryObj<IconButtonComponent & { content: string }>;
