import type { StorybookConfig } from '@storybook/angular';
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../src'],
  addons: [
    '@storybook/addon-links', 
    '@storybook/addon-essentials', 
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'About',
  },
};
export default config;
