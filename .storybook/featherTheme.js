import { create } from '@storybook/theming/create';

const featherTheme = create({
  base: 'light',
  brandImage: 'favicon-32x32.png',
  brandTitle: 'Featherweight Design Component Library',
  brandUrl:
    '(https://github.com/featherweight-design/component-library',
  fontBase: '"Open Sans", Arial, sans-serif',
});

export default featherTheme;