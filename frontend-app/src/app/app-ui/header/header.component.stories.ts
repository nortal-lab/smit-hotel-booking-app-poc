import { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header.component';

const meta: Meta<HeaderComponent> = {
  title: 'Components/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    onLogout: { action: 'Logout happened!' },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => ({
    props: args,
    /* template */
    template: `
      <app-header>
        Form component - add me first!
        <cvi-ng-button>Login - i go second</cvi-ng-button>
      </app-header>
    `
  }),
};

export const WithSearchForm: StoryObj = {
  render: (args) => ({
    props: args,
    /* template */
    template: `
      <app-header>

        <!-- Search container below -->
        <cvi-ng-track [gap]="4">
          <cvi-ng-track [gap]="2" [flexIsMultiline]="true">
            <cvi-ng-form-item label="Choose starting date" [isLabelHidden]="true" [htmlId]="htmliIdDatepicker1">
              <cvi-ng-datepicker [placeholder]="13.11.2023" [htmlId]="htmliIdDatepicker1"></cvi-ng-datepicker>
            </cvi-ng-form-item>
            <cvi-ng-form-item label="Choose end date" [isLabelHidden]="true" [htmlId]="htmliIdDatepicker2">
              <cvi-ng-datepicker [placeholder]="14.11.2023" [htmlId]="htmliIdDatepicker2"></cvi-ng-datepicker>
            </cvi-ng-form-item>
            <cvi-ng-form-item [label]="Date" [isLabelHidden]="true" [htmlId]="htmlfor1" [labelId]="labelfor1">
              <cvi-ng-select [items]="['1 room', '2 rooms']" [labelId]="labelfor1" placeholder="1 room" [htmlId]="htmlfor1"></cvi-ng-select>
            </cvi-ng-form-item>
            <cvi-ng-form-item [label]="Date - 1" [isLabelHidden]="true" [htmlId]="htmlfor2" [labelId]="labelfor2">
              <cvi-ng-select [items]="['1 guest', '2 guests']" [labelId]="labelfor2" placeholder="2 guests" [htmlId]="htmlfor2"></cvi-ng-select>
            </cvi-ng-form-item>
          </cvi-ng-track>
          <app-circular-button></app-circular-button>
        </cvi-ng-track>

        <cvi-ng-button>Login</cvi-ng-button>
      </app-header>
    `
  }),
};

export const WithLogoutButton: StoryObj = {
  render: (args) => ({
    props: args,
    /* template */
    template: `
      <app-header>

        <!-- Search container below -->
        <cvi-ng-track [gap]="4">
          <cvi-ng-track [gap]="2" [flexIsMultiline]="true">
            <cvi-ng-form-item label="Choose starting date" [isLabelHidden]="true" [htmlId]="htmliIdDatepicker1">
              <cvi-ng-datepicker [placeholder]="13.11.2023" [htmlId]="htmliIdDatepicker1"></cvi-ng-datepicker>
            </cvi-ng-form-item>
            <cvi-ng-form-item label="Choose end date" [isLabelHidden]="true" [htmlId]="htmliIdDatepicker2">
              <cvi-ng-datepicker [placeholder]="14.11.2023" [htmlId]="htmliIdDatepicker2"></cvi-ng-datepicker>
            </cvi-ng-form-item>
            <cvi-ng-form-item [label]="Date" [isLabelHidden]="true" [htmlId]="htmlfor1" [labelId]="labelfor1">
              <cvi-ng-select [items]="['1 room', '2 rooms']" [labelId]="labelfor1" placeholder="1 room" [htmlId]="htmlfor1"></cvi-ng-select>
            </cvi-ng-form-item>
            <cvi-ng-form-item [label]="Date - 1" [isLabelHidden]="true" [htmlId]="htmlfor2" [labelId]="labelfor2">
              <cvi-ng-select [items]="['1 guest', '2 guests']" [labelId]="labelfor2" placeholder="2 guests" [htmlId]="htmlfor2"></cvi-ng-select>
            </cvi-ng-form-item>
          </cvi-ng-track>
          <app-circular-button></app-circular-button>
        </cvi-ng-track>

        <!-- Logout button below -->
        <app-icon-button (click)="onLogout()">
          <!-- No need to use styles or cvi-ng-track. Just place SVG element and label next to each other -->
          <svg viewBox="0 0 18 18" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 5L12.59 6.41L14.17 8H6V10H14.17L12.59 11.58L14 13L18 9L14 5ZM2 2H9V0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H9V16H2V2Z" />
          </svg>
          Logout
        </app-icon-button>
      </app-header>
    `
  }),
};
