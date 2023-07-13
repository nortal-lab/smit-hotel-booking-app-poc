import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { DataSectionComponent } from './data-section.component';

const wrapperDecorators = [
  componentWrapperDecorator(DataSectionComponent, ({ args }) => {
    return args;
  }),
];

const meta: Meta<DataSectionComponent & { content: string }> = {
  title: 'Components/Data section',
  component: DataSectionComponent,
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
    title: 'Some data section title',
  },
};

export default meta;

export const Default: Story = {
  render: (args: DataSectionComponent) => ({
    props: args,
    template: `<div>{{ content }}</div>`,
  }),
  args: {
    content: 'Paragraph body pot curve region impossible frighten dried see reason felt mouse bee surrounded leaving steam thirty finally example voyage smooth hair cost bottle',
  },
  decorators: wrapperDecorators,
};

export const Multiple: Story = {
  render: (args: DataSectionComponent) => ({
    props: args,
    /* template */
    template: `
      <app-data-section [title]="title">
        <!-- wrap the content into a anonymous div or any other element -->
        <div>{{ content }}</div>
      </app-data-section>
      <app-data-section title="Another section">
        <cvi-ng-track [gap]="3" layout="grid" verticalAlignment="bottom" [gridRows]="3">
          <app-definition-item label="Room 1 cost">107.95€</app-definition-item>
          <app-definition-item label="Czech-in">Likely mark i</app-definition-item>
          <app-definition-item label="Czech-out">21.08.2023 14:00</app-definition-item>
          <app-definition-item label="Occupancy">2 rooms, 1 adult</app-definition-item>
          <app-definition-item label="First name">Porgand.ee</app-definition-item>
        </cvi-ng-track>
      </app-data-section>
      <app-data-section title="Personal details">
        <div>Rubber present passage rocket my weak stick slip later scientist mill if thrown correctly us person floor promised example dangerous park white search percent prove page escape worry dozen poet send position salmon electricity throughout strip vertical mirror angle helpful musical organized occasionally certain tonight gold name fair</div>
      </app-data-section>
    `,
  }),
  args: {
    content: 'Some content',
    title: 'A section with data',
  },
};

type Story = StoryObj<DataSectionComponent & { content: string }>;
