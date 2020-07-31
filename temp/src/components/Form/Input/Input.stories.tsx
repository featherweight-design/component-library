import React, { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Input from './Input';

export default {
  title: 'Components/Form/Input',
  decorators: [withA11y],
};

export const Types = (): JSX.Element => {
  const [value, updateTextValue] = useState('');
  const [required, updateRequired] = useState('');
  const [percentage, updatePercentage] = useState('');
  const [errorValue, updateErrorValue] = useState('');
  const [loadingValue, updateLoadingValue] = useState('');
  const [focusValue, updateFocusValue] = useState('');
  const [lightningIconValue, updateLightningIconValue] = useState('');
  const [materialIconValue, updateMaterialIconValue] = useState('');

  const handleChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>): void => {
    switch (name) {
      case 'default': {
        updateTextValue(value);
        break;
      }
      case 'required': {
        updateRequired(value);
        break;
      }
      case 'number': {
        updatePercentage(value);
        break;
      }
      case 'error': {
        updateErrorValue(value);
        break;
      }
      case 'loading': {
        updateLoadingValue(value);
        break;
      }
      case 'focus': {
        updateFocusValue(value);
        break;
      }
      case 'lightning-icon': {
        updateLightningIconValue(value);
        break;
      }
      case 'material-icon': {
        updateMaterialIconValue(value);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="story__input-container">
      <Input
        value={value}
        name="default"
        label="Default"
        placeholder="Type some text..."
        onChange={handleChange}
      />

      <Input
        required
        value={required}
        name="required"
        label="Required field"
        placeholder="Don't forget!..."
        onChange={handleChange}
      />

      <Input
        value={percentage}
        name="number"
        type="number"
        label="Number"
        placeholder="%"
        min="0"
        max="100"
        onChange={handleChange}
      />

      <Input
        value={''}
        name="disabled"
        label="Disabled"
        placeholder="Disabled typing..."
        onChange={(): void => console.log('Disabled')}
        disabled
      />

      <Input
        value={errorValue}
        name="error"
        label="With error"
        placeholder="Type to clear error..."
        errorMessage={errorValue ? '' : 'Please enter a value'}
        onChange={handleChange}
      />

      <Input
        value={loadingValue}
        name="loading"
        label="Loading"
        placeholder="Please hold..."
        loading
        onChange={handleChange}
      />

      <Input
        value={focusValue}
        name="focus"
        label="Initial focus"
        placeholder="I have the initial focus..."
        initialFocus
        onChange={handleChange}
      />

      <Input
        value={lightningIconValue}
        name="lightning-icon"
        label="With Lightning icon"
        placeholder="Default icons..."
        icon={{
          icon: 'search',
        }}
        onChange={handleChange}
      />

      <Input
        value={materialIconValue}
        name="material-icon"
        label="With Material icon"
        placeholder="Material icons..."
        icon={{
          designSystem: 'material',
          icon: 'search',
        }}
        onChange={handleChange}
      />
    </div>
  );
};
