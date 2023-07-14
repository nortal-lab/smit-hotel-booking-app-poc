import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeroComponent } from './hero.component';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Hero',
  component: HeroComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    imgSrc: {
      name: 'Image source',
    },
    onSubmit: {
      action: 'submitted'
    }
  },
  args: {
    imgSrc: '/assets/images/hero.jpg',
  },
} as Meta;

export const Default = {
  render: (args: HeroComponent) => ({
    props: args,
    /* template */
    template: `
      <cvi-ng-track flexDirection="vertical" [ngStyle]="{'height.%': 100}">
        <app-header><cvi-ng-button>Login</cvi-ng-button></app-header>
        <app-hero [imgSrc]="imgSrc">
          <form>
            <cvi-ng-track [horizontalAlignment]="'center'">
              <app-page-content-wrapper>
                <cvi-ng-track [gap]="4">
                  <cvi-ng-track [gap]="2">
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
                  <app-circular-button (click)="onSubmit()"></app-circular-button>
                </cvi-ng-track>
              </app-page-content-wrapper>
            </cvi-ng-track>
          </form>
        </app-hero>
        <app-footer></app-footer>
      </cvi-ng-track>
    `,
    styles: [
      `
        :host {
          height: 100%;
          display: block;
        }
      `,
    ],
  }),
};

const FormTemplate: StoryFn<HeroComponent> = (args: HeroComponent) => {
  const form = new FormGroup({
    date1: new FormControl('13.07.2023'),
    date2: new FormControl('14.07.2023'),
    room: new FormControl('1 room'),
    guest: new FormControl('2 guests'),
  });

  function selectedValue() {
    let selectedValues = {
      date1: form.controls.date1.value,
      date2: form.controls.date2.value,
      room: form.controls.room.value,
      guest: form.controls.guest.value
    };
    return selectedValues;
  }

  function displaySelectedValues() {
    const values = selectedValue();
    action('Selected Values')(JSON.stringify(values));
  }

  function onSubmit(formValue: any) {
    console.log(formValue);
  }
  return {
    props: {
      ...args,
      form,
      selectedValue,
      onSubmit,
      displaySelectedValues,
    },
    template: `
      <form [formGroup]="form" (ngSubmit)="onSubmit(form.value)">
        <cvi-ng-track [gap]="4">
          <cvi-ng-track [gap]="2">
            <cvi-ng-form-item label="Choose starting date" [isLabelHidden]="true" [htmlId]="htmliIdDatepicker1">
              <cvi-ng-datepicker [htmlId]="htmliIdDatepicker1" formControlName="date1"></cvi-ng-datepicker>
            </cvi-ng-form-item>
            <cvi-ng-form-item label="Choose end date" [isLabelHidden]="true" [htmlId]="htmliIdDatepicker2">
              <cvi-ng-datepicker [htmlId]="htmliIdDatepicker2" formControlName="date2"></cvi-ng-datepicker>
            </cvi-ng-form-item>
            <cvi-ng-form-item [label]="Date - 1" [isLabelHidden]="true" [htmlId]="htmlfor2" [labelId]="labelfor2">
              <cvi-ng-select
                [items]="['1 guest', '2 guests']"
                placeholder="2 guests"
                [labelId]="labelfor2"
                placeholder="2 guests"
                [htmlId]="htmlfor2"
                formControlName="guest"></cvi-ng-select>
            </cvi-ng-form-item>
          </cvi-ng-track>
          <cvi-ng-button (click)="displaySelectedValues()">Search</cvi-ng-button>
        </cvi-ng-track>
      </form>
    `,
  };
};

export const SearchForm = {
  render: FormTemplate,
};
