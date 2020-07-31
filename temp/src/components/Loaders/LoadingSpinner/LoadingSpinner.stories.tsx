import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import LoadingSpinner from './LoadingSpinner';

export default {
  title: 'Components/Loaders/LoadingSpinner',
  decorators: [withA11y],
};

export const DefaultTypeLarge = (): JSX.Element => (
  <div className="story__loading-spinner-container">
    <LoadingSpinner />
  </div>
);

export const WithCustomSize = (): JSX.Element => (
  <div className="story__loading-spinner-container" style={{ height: '20rem' }}>
    <LoadingSpinner size="15rem" />
  </div>
);

export const WithNoDelay = (): JSX.Element => (
  <div className="story__loading-spinner-container">
    <LoadingSpinner delayMilliseconds={0} />
  </div>
);

export const WithTypeMedium = (): JSX.Element => (
  <div className="story__loading-spinner-container">
    <LoadingSpinner type="medium" />
  </div>
);

export const WithTypeSmall = (): JSX.Element => (
  <div className="story__loading-spinner-container">
    <LoadingSpinner type="small" />
  </div>
);
