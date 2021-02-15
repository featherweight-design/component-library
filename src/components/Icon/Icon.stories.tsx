import { withA11y } from '@storybook/addon-a11y';

import Icon from './Icon';

export default {
  title: 'Components/Icon',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => <Icon icon="search" />;

export const WithCustomColor = (): JSX.Element => (
  <Icon icon="search" color="red" />
);
