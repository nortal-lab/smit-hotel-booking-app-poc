import { Meta, StoryObj } from '@storybook/angular';
import { BookingCardComponent } from './booking-card.component';

const meta: Meta<BookingCardComponent & { content: string }> = {
  title: 'Components/Booking card',
  component: BookingCardComponent,
  tags: ['autodocs'],
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
  args: {
    title: 'Standard double or twin room',
    img: {
      alt: 'chocolate',
      src: 'https://i.imgur.com/r8ySn9d.jpeg'
    },
    summary: '1 night/2 adults',
    price: '87€'
  },
};

export default meta;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    /* template */
    template: `
      <cvi-ng-track flexDirection="vertical" [gap]="4">
        <app-booking-card [title]="title" [price]="price" [img]="img" [summary]="summary">
          anywhere mother heard branch drink plant previous younger put hurried disappear cake nodded voyage direct tribe war former paragraph successful oil determine noted leaving
          <cvi-ng-button>View</cvi-ng-button>
        </app-booking-card>
        <app-booking-card title="Some title that is very long" price="13€" [img]="{ src: 'https://i.imgur.com/HNyuxM3.jpeg', alt: 'planet'}" summary="6 days, 4 nights">
          Main pipe standard castle fair fast test diameter up entire could sat our action biggest throw dress adult slightly almost send character including tie
          <cvi-ng-button>Book</cvi-ng-button>
        </app-booking-card>
      </cvi-ng-track>
    `,
  })
};

type Story = StoryObj<BookingCardComponent & { content: string }>;
