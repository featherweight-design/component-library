import React, { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import TextArea from './TextArea';

storiesOf('TextArea', module)
  .addDecorator(withA11y)
  .add('Default', () => {
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
  })
  .add('Disabled', () => {
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
  })
  .add('Error', () => {
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
  });
