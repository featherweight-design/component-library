import React, { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import Checkbox from './Checkbox';

storiesOf('Checkbox', module)
  .addDecorator(withA11y)
  .add('Default', () => {
    const [options, updateOptions] = useState([
      { checked: true, label: 'Torin' },
      { checked: false, label: 'Juniper' },
      { checked: false, label: 'Pooch' },
      { checked: false, label: 'Luna' },
      { checked: false, label: 'Disabled', disabled: true },
      { checked: true, label: 'Disabled Checked', disabled: true },
    ]);

    const handleChange = ({
      target: { name, checked },
    }: ChangeEvent<HTMLInputElement>): void => {
      const newOptions = options.map(option =>
        option.label === name ? { ...option, checked } : option
      );

      updateOptions(newOptions);
    };

    return (
      <div style={{ display: 'flex ' }}>
        <Checkbox onChange={handleChange} options={options} />
      </div>
    );
  });
