import { Meta, StoryFn } from '@storybook/angular';
import { BookingDetailsComponent } from './booking-details.component';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faRulerCombined } from '@fortawesome/free-solid-svg-icons';

export default {
  title: 'Components/Booking Details',
  component: BookingDetailsComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
  args: {
    img: {
      alt: 'room',
      src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
  },
} as Meta;

const Template: StoryFn<BookingDetailsComponent> = (args: BookingDetailsComponent) => ({
  component: BookingDetailsComponent,
  props: {
    ...args,
    faUser,
    faBed,
    faRulerCombined,
  },
  template: `
    <app-page-content-wrapper>
      <app-booking-details [img]="img">
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
          Free wifi • free bottled water • bathrobe and slippers • in-room safe • iron and ironing board • smart TV • air conditioning • rain shower • professional
          hair dryer • balcony
        </cvi-ng-track>
      </app-booking-details>
  </app-page-content-wrapper>
    `,
});

export const Default = {
  render: Template,
};

const WithDetails: StoryFn<BookingDetailsComponent> = (args: BookingDetailsComponent) => { 
  return {
    props: {
      ...args,
    },
    template: `
      <app-page-content-wrapper>
        <app-booking-details [img]="img">
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
            Free wifi • free bottled water • bathrobe and slippers • in-room safe • iron and ironing board • smart TV • air conditioning • rain shower • professional
            hair dryer • balcony
          </cvi-ng-track>
        </app-booking-details>
        <app-data-section title="Order Summary">
          <cvi-ng-track [gap]="3" layout="grid" verticalAlignment="bottom" [gridRows]="2">
            <app-definition-item label="Room Type">Deluxe</app-definition-item>
            <app-definition-item label="Occupancy">2 adults, 1 room</app-definition-item>
            <app-definition-item label="Check-in">Thu, 13.11.2023 - 15:00</app-definition-item>
            <app-definition-item label="Check-out">Fri, 14.11.2023 - 12:00</app-definition-item>
          </cvi-ng-track>
        </app-data-section>
        <app-data-section title="Extra Info">
          Lyrical poetry is a realm in which any statement immediately becomes truth. Yesterday the poet said life is a vale of tears; today he said life is a land of
          smiles; and he was right both times. There is no inconsistency. The lyrical poet does not have to prove anything. The only proof is the intensity of his own
          emotion.
        </app-data-section>
    </app-page-content-wrapper>
    `
  }
}

export const PageWithDetails = {
  name: 'Example with more data',
  render: WithDetails,
};