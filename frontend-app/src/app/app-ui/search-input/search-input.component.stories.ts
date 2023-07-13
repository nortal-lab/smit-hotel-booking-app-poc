import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { SearchInputComponent } from './search-input.component';

const wrapperDecorators = [
  componentWrapperDecorator(SearchInputComponent, ({ args }) => {
    return args;
  }),
];

const meta: Meta<SearchInputComponent> = {
  title: 'Components/Search input',
  component: SearchInputComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    placeholder: 'I wanna have search on the beach',
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => ({
    props: args,
  }),
  decorators: wrapperDecorators,
};
