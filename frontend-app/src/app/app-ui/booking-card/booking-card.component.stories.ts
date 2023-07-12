import { Meta, StoryObj } from '@storybook/angular';
import { BookingCardComponent } from './booking-card.component';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faRulerCombined } from '@fortawesome/free-solid-svg-icons';

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
    price: '87€',
    badgeLabel: 'In 5 months'
  },
};

export default meta;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      faUser,
      faBed,
      faRulerCombined
    },
    /* template */
    template: `
      <cvi-ng-track flexDirection="vertical" [gap]="4">
        <app-booking-card [title]="title" [price]="price" [img]="img" [summary]="summary" [badgeLabel]="badgeLabel">
          anywhere mother heard branch drink plant previous younger put hurried disappear cake nodded voyage direct tribe war former paragraph successful oil determine noted leaving
          <cvi-ng-button>View</cvi-ng-button>
        </app-booking-card>
        <app-booking-card title="Some title that is very long" price="13€" [img]="{ src: 'https://i.imgur.com/HNyuxM3.jpeg', alt: 'planet'}" summary="6 days, 4 nights">
          <cvi-ng-track [gap]="4" flexDirection="vertical">
            <cvi-ng-track [gap]="4">
              <cvi-ng-track [gap]="1">
                <fa-icon [icon]="faUser"></fa-icon>
                2 people
              </cvi-ng-track>  
              <cvi-ng-track [gap]="1">
                <fa-icon [icon]="faBed"></fa-icon>
                1 king or 2 twin
              </cvi-ng-track>  
              <cvi-ng-track [gap]="1">
                <fa-icon [icon]="faRulerCombined"></fa-icon>
                28 m<sup>2</sup>
              </cvi-ng-track>
            </cvi-ng-track>
            Free wifi &bull; free bottled water &bull; bathrobe and slippers &bull; in-room safe &bull; iron and ironing board &bull; smart TV &bull; air conditioning &bull; rain shower
          </cvi-ng-track>
          Main pipe standard castle fair fast test diameter up entire could sat our action biggest throw dress adult slightly almost send character including tie
          <cvi-ng-button>Book</cvi-ng-button>
        </app-booking-card>
      </cvi-ng-track>
    `,
  })
};

type Story = StoryObj<BookingCardComponent & { content: string }>;
