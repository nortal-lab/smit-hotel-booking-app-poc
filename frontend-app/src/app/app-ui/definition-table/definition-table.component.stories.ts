import { Meta, StoryObj } from '@storybook/angular';
import { DefinitionTableComponent } from './definition-table.component';

const meta: Meta<DefinitionTableComponent> = {
  title: 'Components/Definition table',
  component: DefinitionTableComponent,
  tags: ['autodocs'],
  args: {
    hasZebraStripes: false
  }
};

export default meta;

export const Default: StoryObj = {
  render: (args) => ({
    props: args,
    /* template */
    template: `
      <app-definition-table [hasZebraStripes]="hasZebraStripes">
        <app-definition-item label="Room 1 cost">107.95€</app-definition-item>
        <app-definition-item label="Additional services">3993.3€</app-definition-item>
        <app-definition-item label="Subtotal" [isHighlighted]="true">4010.32€</app-definition-item>
      </app-definition-table>
    `,
  })
};

export const WithStripes: StoryObj = {
  ...Default,
  args: {
    hasZebraStripes: true
  }
};
