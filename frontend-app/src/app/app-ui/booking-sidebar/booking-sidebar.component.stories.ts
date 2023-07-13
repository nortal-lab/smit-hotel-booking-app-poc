import { Meta, StoryObj } from '@storybook/angular';
import { BookingSidebarComponent } from './booking-sidebar.component';

const meta: Meta<BookingSidebarComponent> = {
  title: 'Components/Booking sidebar',
  component: BookingSidebarComponent,
  tags: ['autodocs'],
  args: {
    img: {
      alt: 'chocolate',
      src: 'https://i.imgur.com/r8ySn9d.jpeg'
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => ({
    props: args,
    /* template */
    template: `
      <app-booking-sidebar [img]="img">
        <app-data-section title="Deluxe"></app-data-section>
        <app-data-section title="My booking">
          <cvi-ng-track flexDirection="vertical" [gap]="2" [ngStyle]="{'--app-definition-item--label--font-size': 'var(--cvi-font-size-70)'}">
            <app-definition-item label="Occupancy">2 adults, 1 room</app-definition-item>
            <app-definition-item label="Check-in">Thu, 13.11.2023 - 15:00</app-definition-item>
            <app-definition-item label="Check-out">Thu, 14.11.2023 - 12:00</app-definition-item>
          </cvi-ng-track>
        </app-data-section>
        <app-data-section title="Price summary">
          <cvi-ng-track flexDirection="vertical" [gap]="4">
            <app-definition-table>
              <app-definition-item label="Room 1 cost">107.95€</app-definition-item>
              <app-definition-item label="Additional services">3993.3€</app-definition-item>
              <app-definition-item label="Subtotal" [isHighlighted]="true">4010.32€</app-definition-item>
            </app-definition-table>
            <app-definition-table>
              <app-definition-item label="Estimated taxes">19.05€</app-definition-item>
            </app-definition-table>
          </cvi-ng-track>
        </app-data-section>
        <app-data-section>
          <app-definition-table>
            <app-definition-item label="Total price" [isHighlighted]="true">4016€</app-definition-item>
          </app-definition-table>
        </app-data-section>
      </app-booking-sidebar>
    `,
  })
};
