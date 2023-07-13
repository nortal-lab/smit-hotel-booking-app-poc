import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { DefinitionItemComponent } from './definition-item.component';

const wrapperDecorators = [
  componentWrapperDecorator(DefinitionItemComponent, ({ args }) => {
    return args;
  }),
];

const meta: Meta<DefinitionItemComponent & { content: string }> = {
  title: 'Components/Definition item',
  component: DefinitionItemComponent,
  tags: ['autodocs'],
  argTypes: {
    content: {
      name: 'Content',
      table: {
        category: 'Playground',
      },
    },
  },
  args: {
    label: 'Personal Identification Number',
  },
};

export default meta;

export const Default: Story = {
  render: (args: DefinitionItemComponent) => ({
    props: args,
    template: `{{ content }}`,
  }),
  args: {
    content: '4993828284',
  },
  decorators: wrapperDecorators,
};

export const WithSmallLabel: Story = {
  render: (args: DefinitionItemComponent) => ({
    props: args,
    template: `{{ content }}`,
    styles: [
      `:host {
        --app-definition-item--label--font-size: var(--cvi-font-size-70);
      }`,
    ],
  }),
  args: {
    content: '4993828284',
  },
  decorators: wrapperDecorators,
};

export const Multiple: Story = {
  render: (args: DefinitionItemComponent) => ({
    props: args,
    /* template */
    template: `
      <cvi-ng-track flexDirection="vertical" [gap]="2">
        <app-definition-item [label]="label" [isHighlighted]="isHighlighted">{{ content }}</app-definition-item>
        <app-definition-item label="Additional services">3993.3€</app-definition-item>
        <app-definition-item label="Subtotal" [isHighlighted]="true">4010.32€</app-definition-item>
      </cvi-ng-track>
    `,
  }),
  args: {
    content: '4993828284',
    label: 'Room cost',
    isHighlighted: false
  },
};

export const WithDefinitionTable: Story = {
  render: (args: DefinitionItemComponent) => ({
    props: args,
    /* template */
    template: `
      <app-definition-table>
        <app-definition-item [label]="label" [isHighlighted]="isHighlighted">{{ content }}</app-definition-item>
        <app-definition-item label="Additional services">3993.3€</app-definition-item>
        <app-definition-item label="Subtotal" [isHighlighted]="true">4010.32€</app-definition-item>
      </app-definition-table>
    `,
  }),
  args: {
    content: '4993828284',
    label: 'Room cost',
    isHighlighted: false
  },
};

type Story = StoryObj<DefinitionItemComponent & { content: string }>;
