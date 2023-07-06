import { componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';
import { ButtonComponent} from '@egov/cvi-ng';

const wrapperDecorators = [
  componentWrapperDecorator(ButtonComponent, ({ args }) => {
    return args;
  }),
];

const meta: Meta<ButtonComponent & { content: string }> = {
  title: 'Components/CVI Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  render: (args: ButtonComponent) => ({
    props: args,
    template: `{{ content }}`,
  }),
  argTypes: {
    content: {
      name: 'Content',
      table: {
        category: 'Playground',
      },
    },
  },
  decorators: wrapperDecorators,
};

export default meta;

export const Default: Story = {
  args: {
    content: 'Button label',
  },
};

type Story = StoryObj<ButtonComponent & { content: string }>;
