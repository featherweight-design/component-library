import { addons } from '@storybook/addons';
import featherTheme from './featherTheme';

addons.setConfig({
  theme: featherTheme,
  panelPosition: 'right',
});
