import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import DemoButton from './DemoButton';

export default {
  title: 'Components/Buttons/DemoButton',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => (
  <DemoButton
    value="Click me!"
    onClick={() => console.log("I've been clicked!")}
  />
);

export const Disabled = (): JSX.Element => (
  <DemoButton
    value="Click me!"
    onClick={() => console.log("I've been clicked!")}
    disabled
  />
);

export const Loading = (): JSX.Element => (
  <DemoButton
    value="Click me!"
    onClick={() => console.log("I've been clicked!")}
    loading
  />
);

export const CustomBackgroundColor = (): JSX.Element => (
  <DemoButton
    value="Click me!"
    onClick={() => console.log("I've been clicked!")}
    backgroundColor="#ffb75d"
  />
);
