import React, { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import TextArea from './TextArea';

export default {
  title: 'Components/Form/TextArea',
  decorators: [withA11y],
};

export const Types = (): JSX.Element => {
  const [defaultValue, updateDefaultValue] = useState('');
  const [required, updateRequiredValue] = useState('');
  const [errorValue, updateErrorValue] = useState('');
  const [minValue, updateMinValue] = useState('');
  const [maxValue, updateMaxValue] = useState('');
  const [focusValue, updateFocusValue] = useState('I have the initial focus');

  const handleOnChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLTextAreaElement>) => {
    switch (name) {
      case 'default': {
        updateDefaultValue(value);
        break;
      }
      case 'required': {
        updateRequiredValue(value);
        break;
      }
      case 'error': {
        updateErrorValue(value);
        break;
      }
      case 'min': {
        updateMinValue(value);
        break;
      }
      case 'max': {
        updateMaxValue(value);
        break;
      }
      case 'focus': {
        updateFocusValue(value);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="story__input-container">
      <TextArea
        name="default"
        label="Default"
        value={defaultValue}
        onChange={handleOnChange}
      />

      <TextArea
        required
        name="required"
        label="Required"
        value={required}
        onChange={handleOnChange}
      />

      <TextArea
        disabled
        name="disabled"
        label="Disabled"
        value={'You cannot touch me!!! MWAAAHAHAHAHAHA!'}
        onChange={handleOnChange}
      />

      <TextArea
        name="error"
        label="With error"
        value={errorValue}
        onChange={handleOnChange}
        errorMessage={errorValue ? '' : 'Please enter a value'}
      />

      <TextArea
        name="min"
        label="Minimum Value"
        value={minValue}
        min={10}
        minLengthMessage="You must enter at least 10 characters"
        onChange={handleOnChange}
      />

      <TextArea
        name="max"
        label="Maximum Value"
        placeholder="Go crazy with typing!..."
        value={maxValue}
        max={20}
        maxLengthMessage="You mist limit your response to 20 characters"
        onChange={handleOnChange}
      />

      <TextArea
        initialFocus
        name="focus"
        label="Initial Focus"
        value={focusValue}
        onChange={handleOnChange}
      />
    </div>
  );
};
