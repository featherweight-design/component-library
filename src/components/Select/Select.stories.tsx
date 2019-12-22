import React, { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import Select from './Select';

storiesOf('Select', module)
  .addDecorator(withA11y)
  .add('Default', () => {
    const [value, handleChange] = useState('');

    const mockOnChange = ({
      target: { value, name },
    }: ChangeEvent<HTMLSelectElement>) => {
      console.log({ value });
      handleChange(value);
    };

    return (
      <div>
        <Select
          name="default"
          label="Label"
          value={value}
          onChange={mockOnChange}
        >
          <option>Blah</option>
          <option>Blah</option>
          <option>Blah</option>
          <option>Blah</option>
          <option>Blah</option>
          <option>Blah</option>
          <option>Blah</option>
        </Select>
      </div>
    );
  });
