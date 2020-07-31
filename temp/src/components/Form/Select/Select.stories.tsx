import React, { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Select from './Select';

export default {
  title: 'Components/Form/Select',
  decorators: [withA11y],
};

export const Types = (): JSX.Element => {
  const [defaultValue, updateDefaultValue] = useState('');
  const [requiredValue, updateRequired] = useState('');
  const [errorValue, updateErrorValue] = useState('');
  const [multipleValue, updateMultipleValue] = useState<string[]>([]);
  const [focusValue, updateFocusValue] = useState('');
  const [loading, updateLoadingValue] = useState('');

  const handleOnChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLSelectElement>): void => {
    switch (name) {
      case 'default': {
        updateDefaultValue(value);
        break;
      }
      case 'required': {
        updateRequired(value);
        break;
      }
      case 'error': {
        updateErrorValue(value);
        break;
      }
      case 'focus': {
        updateFocusValue(value);
        break;
      }
      case 'loading': {
        updateLoadingValue(value);
        break;
      }
      default:
        break;
    }
  };

  const handleMultipleOnChange = ({
    target: { options },
  }: ChangeEvent<HTMLSelectElement>) => {
    const fieldValue = [];

    for (let idx = 1; idx < options.length; idx++) {
      const { selected, value } = options[idx];

      if (selected) {
        fieldValue.push(value);
      }
    }

    updateMultipleValue(fieldValue);
  };

  return (
    <div className="story__select-container">
      <Select
        label="Default"
        name="default"
        placeholder="Select a pet..."
        value={defaultValue}
        onChange={handleOnChange}
      >
        <option>Cat</option>
        <option>Dog</option>
        <option>Lizard</option>
        <option>Ocelot</option>
        <option>Hippogriff</option>
      </Select>

      <Select
        required
        label="Required input"
        name="required"
        placeholder="Don't forget!..."
        value={requiredValue}
        onChange={handleOnChange}
      >
        <option>Very</option>
        <option>Important</option>
        <option>Things</option>
        <option>To</option>
        <option>Select</option>
      </Select>

      <Select
        label="Multiple"
        name="multiple"
        placeholder="Select one or more..."
        value={multipleValue}
        onChange={handleMultipleOnChange}
        multiple
      >
        <option>You</option>
        <option>Can</option>
        <option>Select</option>
        <option>As</option>
        <option>Many</option>
        <option>ås</option>
        <option>Ÿou</option>
        <option>Want</option>
      </Select>

      <Select
        label="Disabled"
        name="default"
        value="Nothing"
        onChange={handleOnChange}
        disabled
      >
        <option>Nothing</option>
      </Select>

      <Select
        label="With error"
        name="error"
        placeholder="Select to clear..."
        value={errorValue}
        onChange={handleOnChange}
        errorMessage={errorValue ? '' : 'Please select a value'}
      >
        <option>!!!Errors!!!</option>
        <option>!!!Are!!!</option>
        <option>!!!Bad!!!</option>
      </Select>

      <Select
        label="Loading"
        name="loading"
        placeholder="Select a size..."
        value={loading}
        onChange={handleOnChange}
        loading
      >
        <option>Teeny-tiny</option>
        <option>Itsy-bitsy</option>
        <option>Small</option>
        <option>Medium</option>
        <option>Large</option>
        <option>X-Large</option>
        <option>XX-Large</option>
        <option>OMG-Large</option>
      </Select>

      <Select
        label="Initial focus"
        name="focus"
        value={focusValue}
        placeholder="I have the initial focus..."
        initialFocus
        onChange={handleOnChange}
      >
        <option>Pay</option>
        <option>Attention</option>
        <option>To</option>
        <option>Me!</option>
      </Select>
    </div>
  );
};
