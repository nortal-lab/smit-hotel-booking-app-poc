import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { PageContentWrapperComponent } from './page-content-wrapper.component';

const wrapperDecorators = [
  componentWrapperDecorator(PageContentWrapperComponent, ({ args }) => {
    return args;
  }),
];

const meta: Meta<PageContentWrapperComponent & { content: string }> = {
  title: 'Components/Page content wrapper',
  component: PageContentWrapperComponent,
  tags: ['autodocs'],
  render: (args: PageContentWrapperComponent) => ({
    props: args,
    template: `{{ content }}`,
  }),
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
  decorators: wrapperDecorators,
};

export default meta;

export const Default: Story = {
  args: {
    content: 'Gulf thus leave try clean whether metal stairs lungs quiet limited nearby surface eat blind island pretty atmosphere unless team current load shoe raw',
  },
};

type Story = StoryObj<PageContentWrapperComponent & { content: string }>;
