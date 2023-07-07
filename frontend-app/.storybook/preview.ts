import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import docJson from '../documentation.json';
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
};

export default preview;
