import type { Preview } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import docJson from '../documentation.json';
import { AppUiModule } from 'src/app/app-ui/app-ui.module';
import { UiModule } from '@egov/cvi-ng';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import '../src/styles.scss';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        AppUiModule, 
        UiModule,
        FontAwesomeModule
      ],
    }),
  ]
};

export default preview;
