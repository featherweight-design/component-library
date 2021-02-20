import { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import { inputCopy } from 'shared/data/copyContent';
import Input from './Input';

export default {
  title: 'Components/Form/Input',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => {
  const [inputValue, handleChangeTextValue] = useState('');

  const mockOnChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => handleChangeTextValue(value);

  return (
    <div className="story__input-container">
      <Input
        value={inputValue}
        name="default"
        label={inputCopy.textLabel}
        onChange={mockOnChange}
      />
    </div>
  );
};

export const Types = (): JSX.Element => {
  const [defaultValue, handleChangeTextValue] = useState('');
  const [numberValue, handleChangePercentage] = useState('');
  const [errorValue, handleChangeErrorValue] = useState('');
  const [passwordValue, handleChangePasswordValue] = useState('');

  const inputNames = {
    default: 'default',
    disabled: 'disabled',
    error: 'error',
    number: 'number',
    password: 'password',
  };

  const mockOnChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>): void => {
    if (name === inputNames.default) {
      handleChangeTextValue(value);
    }

    if (name === inputNames.number) {
      handleChangePercentage(value);
    }

    if (name === inputNames.error) {
      handleChangeErrorValue(value);
    }

    if (name === inputNames.password) {
      handleChangePasswordValue(value);
    }
  };

  return (
    <div className="story__input-container">
      <Input
        value={defaultValue}
        name={inputNames.default}
        label={inputCopy.textLabel}
        onChange={mockOnChange}
      />

      <Input
        value={numberValue}
        name={inputNames.number}
        type="number"
        label={inputCopy.numberLabel}
        placeholder={inputCopy.numberPlaceholder}
        min="0"
        max="100"
        onChange={mockOnChange}
      />

      <Input
        value=""
        name={inputNames.disabled}
        label={inputCopy.disabledLabel}
        onChange={mockOnChange}
        disabled
      />

      <Input
        value={errorValue}
        name={inputNames.error}
        label={inputCopy.errorLabel}
        errorMessage={errorValue ? '' : inputCopy.errorMessage}
        onChange={mockOnChange}
      />

      <Input
        value={passwordValue}
        name={inputNames.password}
        type="password"
        label={inputCopy.passwordLabel}
        onChange={mockOnChange}
      />
    </div>
  );
};
