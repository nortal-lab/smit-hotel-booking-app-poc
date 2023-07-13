import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { CircularButtonComponent } from './circular-button.component';

const wrapperDecorators = [
  componentWrapperDecorator(CircularButtonComponent, ({ args }) => {
    return args;
  }),
];

const meta: Meta<CircularButtonComponent> = {
  title: 'Components/Circular button',
  component: CircularButtonComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onClick: { action: 'Button clicked!' },
  },
  args: {
    kind: 'button'
  }
};

export default meta;

export const Default: StoryObj = {
  render: (args) => ({
    props: args,
  }),
  decorators: wrapperDecorators,
};
