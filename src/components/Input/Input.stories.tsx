import React, { useState, ChangeEvent } from 'react';
import { withA11Y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import Input from './Input';

storiesOf('Input', module)
  .addDecorator(withA11Y)
  .add('Types', () => {
    const [value, handleChangeTextValue] = useState('');
    const [percentage, handleChangePercentage] = useState('');

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
    };

    return (
      <div style={{ display: 'flex' }}>
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
          value={value}
          name="disabled"
          label="Disabled"
          onChange={mockOnChange}
          disabled
        />
      </div>
    );
  });
