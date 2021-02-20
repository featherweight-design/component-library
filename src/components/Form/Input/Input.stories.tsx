import { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import { inputCopy } from 'shared/data/copyContent';
import Input from './Input';

interface InputChangeHandlers {
  [key: string]: (value: string) => void;
}

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
  const [numberValue, handleChangeNumberValue] = useState('');
  const [errorValue, handleChangeErrorValue] = useState('');
  const [passwordValue, handleChangePasswordValue] = useState('');
  const [minimalValue, handleChangeMinimalValue] = useState('');

  const inputNames = {
    default: 'default',
    disabled: 'disabled',
    error: 'error',
    minimal: 'minimal',
    number: 'number',
    password: 'password',
  };

  const inputChangeHandlers: InputChangeHandlers = {
    default: handleChangeTextValue,
    error: handleChangeErrorValue,
    minimal: handleChangeMinimalValue,
    number: handleChangeNumberValue,
    password: handleChangePasswordValue,
  };

  const mockOnChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>): void => {
    const changeHandler = inputChangeHandlers[name as string];

    changeHandler(value);
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

      <Input
        variant="minimal"
        value={minimalValue}
        name={inputNames.minimal}
        label={inputCopy.minimalLabel}
        onChange={mockOnChange}
      />
    </div>
  );
};
