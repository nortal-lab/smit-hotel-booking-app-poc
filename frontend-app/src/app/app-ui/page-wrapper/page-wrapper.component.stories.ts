import { Meta, StoryFn } from '@storybook/angular';
import { PageWrapperComponent } from './page-wrapper.component';

export default {
  title: 'Components/Page wrapper',
  component: PageWrapperComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
  },
} as Meta;

const Template: StoryFn<PageWrapperComponent> = (args: PageWrapperComponent) => ({
  component: PageWrapperComponent,
  props: {
    ...args,
  },
  template: `
  <app-header></app-header>
  <app-page-wrapper>
    <app-page-content-wrapper>
    <app-booking-details [img]="">
        <cvi-ng-track [gap]="4" flexDirection="vertical">
        <strong>Content inside PageWrapper recieves inline and block paddings</strong>
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
  </app-page-wrapper>
    `,
});

export const Default = {
  render: Template,
};
