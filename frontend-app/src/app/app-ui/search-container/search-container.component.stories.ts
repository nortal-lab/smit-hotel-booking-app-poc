import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppSearchContainerComponent } from './search-container.component';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Search container',
  component: AppSearchContainerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    guestItem: {
      name: 'Guest item',
    },
    datePickers: {
      name: 'Date picker items',
    },
  },
  args: {
    guestItem: {
      label: 'Select guest amount',
      htmlId: 'htmlfor1',
      formControlName: 'guestNumber',
      labelId: 'labelfor1',
      items: ['1 guest', '2 guests'],
      placeholder: '1 guest',
    },
    datePickers: [
      {
        label: 'Choose starting date',
        htmlId: 'htmliIdDatepicker1',
        formControlName: 'date1',
        placeholder: '13.07.2023',
      },
      {
        label: 'Choose end date',
        htmlId: 'htmliIdDatepicker2',
        formControlName: 'date2',
        placeholder: '15.07.2023',
      },
    ],
  },
} as Meta;

const Template: StoryFn<AppSearchContainerComponent> = (args: AppSearchContainerComponent) => {
  let form = new FormGroup({
    date1: new FormControl('13.07.2023'),
    date2: new FormControl('14.07.2023'),
    room: new FormControl('1 room'),
    guestNumber: new FormControl('2 guests'),
  });

  function selectedValue() {
    let selectedValues = {
      date1: form.controls.date1.value,
      date2: form.controls.date2.value,
      guestNumber: form.controls.guestNumber.value,
    };
    return selectedValues;
  }

  function displaySelectedValues() {
    const values = selectedValue();
    action('Selected Values')(JSON.stringify(values));
  }

  return {
    props: {
      ...args,
      form,
      displaySelectedValues,
    },
    template: `
      <app-search-container [form]="form" [guestItem]="guestItem" [datePickers]="datePickers" (onsSearchClick)="displaySelectedValues()"></app-search-container>
      `,
  };
};

export const Default = {
  render: Template,
};
