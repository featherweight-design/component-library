import React, { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Input from './Input';

export default {
  title: 'Components/Form/Input',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => {
  const [value, handleChangeTextValue] = useState('');

  const mockOnChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => handleChangeTextValue(value);

  return (
    <div className="story__input-container">
      <Input
        value={value}
        name="default"
        label="Label"
        onChange={mockOnChange}
      />
    </div>
  );
};

export const Types = (): JSX.Element => {
  const [value, handleChangeTextValue] = useState('');
  const [percentage, handleChangePercentage] = useState('');
  const [errorValue, handleChangeErrorValue] = useState('');

  const mockOnChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>): void => {
    console.log({ value });
    if (name === 'default') {
      handleChangeTextValue(value);
    }

    if (name === 'number') {
      handleChangePercentage(value);
    }

    if (name === 'errorValue') {
      handleChangeErrorValue(value);
    }
  };

  return (
    <div className="story__input-container">
      <Input
        value={value}
        name="default"
        label="Label"
        onChange={mockOnChange}
      />

      <Input
        value={percentage}
        name="number"
        type="number"
        label="Number"
        placeholder="%"
        min="0"
        max="100"
        onChange={mockOnChange}
      />

      <Input
        value={''}
        name="disabled"
        label="Disabled"
        onChange={(): void => console.log('Disabled')}
        disabled
      />

      <Input
        value={errorValue}
        name="errorValue"
        label="Label"
        errorMessage={errorValue ? '' : 'Please enter a value'}
        onChange={mockOnChange}
      />
    </div>
  );
};
