import React, { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import TextArea from './TextArea';

export default {
  component: 'Components/Form/TextArea',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => {
  const [value, updateValue] = useState('');

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement>): void => updateValue(value);

  return (
    <TextArea
      name="default"
      label="Label"
      value={value}
      onChange={handleChange}
    />
  );
};

export const Disabled = (): JSX.Element => {
  const [value, updateValue] = useState(
    'You will never change me! MWAAAAHAHAHAHAHAHA!'
  );

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement>): void => updateValue(value);

  return (
    <TextArea
      disabled
      name="default"
      label="Label"
      value={value}
      onChange={handleChange}
    />
  );
};

export const Error = (): JSX.Element => {
  const [value, updateValue] = useState('');

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement>): void => updateValue(value);

  return (
    <TextArea
      name="default"
      label="Pirate lore"
      placeholder="Yarrrr... t'was many moons ago when I..."
      value={value}
      onChange={handleChange}
      errorMessage={value ? '' : 'Write me a story, ye heathen!'}
    />
  );
};
