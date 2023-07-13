import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { FooterComponent } from './footer.component';

const wrapperDecorators = [
  componentWrapperDecorator(FooterComponent, ({ args }) => {
    return args;
  }),
];

const meta: Meta<FooterComponent> = {
  title: 'Components/Footer',
  component: FooterComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => ({
    props: args,
  }),
  decorators: wrapperDecorators,
};
