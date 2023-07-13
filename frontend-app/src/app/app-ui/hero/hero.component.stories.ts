import { Meta, StoryFn } from '@storybook/angular';
import { AppHeroComponent } from './hero.component';

export default {
  title: 'Components/Hero',
  component: AppHeroComponent,
  tags: ['autodocs'],
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

const Template: StoryFn<AppHeroComponent> = (args: AppHeroComponent) => ({
  component: AppHeroComponent,
  props: {
    ...args,
  },
  template: `
        <app-hero [imgSrc]="imgSrc">
          <cvi-ng-track style="padding-top: 100px;" [horizontalAlignment]="'center'">
            <cvi-ng-track [gap]="4"  style="padding: calc(var(--cvi-spacing-rapla) * 4); background-color: var(--cvi-color-white); border-radius: var(--cvi-spacing-unit)">
              <cvi-ng-track [gap]="2">
                <cvi-ng-datepicker [placeholder]="13.11.2023" [htmlId]="htmlId"></cvi-ng-datepicker>
                <cvi-ng-datepicker [placeholder]="14.11.2023" [htmlId]="htmlId"></cvi-ng-datepicker>
                <cvi-ng-form-item [label]="Date" [isLabelHidden]="true" [htmlId]="htmlfor1" [labelId]="labelfor1">
                  <cvi-ng-select [items]="['1 room', '2 rooms']" [labelId]="labelfor1" placeholder="1 room" [htmlId]="htmlfor1"></cvi-ng-select>
                </cvi-ng-form-item>
                <cvi-ng-form-item [label]="Date-1" [isLabelHidden]="true" [htmlId]="htmlfor2" [labelId]="labelfor2">
                  <cvi-ng-select [items]="['1 guest', '2 guests']" [labelId]="labelfor2" placeholder="2 guests" [htmlId]="htmlfor2"></cvi-ng-select>
                </cvi-ng-form-item>
              </cvi-ng-track>
                <cvi-ng-button>Search</cvi-ng-button>
            </cvi-ng-track>
          </cvi-ng-track>
        </app-hero>
      `,
});

export const Default = {
  name: 'Default example with form',
  render: Template,
};
