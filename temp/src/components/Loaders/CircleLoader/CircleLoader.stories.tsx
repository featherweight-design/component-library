import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import CircleLoader from './CircleLoader';

export default {
  title: 'Components/Loaders/CircleLoader',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => <CircleLoader />;

export const WithCustomColor = (): JSX.Element => (
  <CircleLoader color="turquoise" />
);

export const WithCustomSize = (): JSX.Element => (
  <div style={{ height: '37rem' }}>
    <CircleLoader size="50rem" />
  </div>
);
