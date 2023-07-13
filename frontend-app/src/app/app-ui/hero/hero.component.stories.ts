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
  },
  args: {
    imgSrc:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
} as Meta;

const Template: StoryFn<HeroComponent> = (args: HeroComponent) => ({
  component: HeroComponent,
  props: {
    ...args,
  },
  template: `
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
              <cvi-ng-button>Search</cvi-ng-button>
            </cvi-ng-track>
          </app-page-content-wrapper>
        </cvi-ng-track>
      </form>
  </app-hero>
      `,
});

export const Default = {
  name: 'Default example with form',
  render: Template,
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
