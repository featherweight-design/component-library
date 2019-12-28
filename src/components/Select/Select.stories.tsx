import React, { useState, MouseEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import Select from './Select';
import { SelectOptionType } from '../../types';

storiesOf('Select', module)
  .addDecorator(withA11y)
  .add('Default', () => {
    const [value, handleChange] = useState('');

    const mockOnClick = (option: SelectOptionType) => {
      console.log({ option });
      handleChange(option.label);
    };

    return (
      <div>
        <Select
          name="default"
          label="Label"
          value={value}
          onClick={mockOnClick}
          options={[
            { value: 'huey', label: 'Huhu' },
            { value: 'juliana', label: 'Juju' },
            { value: 'torin', label: 'Tor-bear' },
            { value: 'juniper', label: 'Jean-june' },
          ]}
        />
      </div>
    );
  });
