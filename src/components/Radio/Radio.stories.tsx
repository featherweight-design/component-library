import React, { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import Radio from './Radio';

storiesOf('Radio', module)
  .addDecorator(withA11y)
  .add('Default', () => {
    const [selected, handleChangeSelected] = useState('');

    return (
      <div>
        <Radio
          label="Baby Names"
          selected={selected}
          options={['Torin', 'Juniper', 'Pooch', 'Luna']}
          onChange={(event): void => {
            handleChangeSelected(event.target.name);
          }}
        />
      </div>
    );
  })
  .add('With "Other" option', () => {
    const [selected, handleChangeSelected] = useState('');
    const [otherValue, updateOther] = useState('');

    const handleChangeOther = ({
      target: { value },
    }: ChangeEvent<HTMLInputElement>): void => updateOther(value);

    return (
      <div>
        <Radio
          label="Best Potato 🥔"
          selected={selected}
          options={['Yukon Gold', 'Red', 'Russet', 'Purple', 'Other']}
          other={{
            value: otherValue,
            onChange: handleChangeOther,
          }}
          onChange={(event): void => {
            handleChangeSelected(event.target.name);
          }}
        />
      </div>
    );
  });
