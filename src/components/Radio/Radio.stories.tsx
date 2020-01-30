import React, { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import Button from '../Button/Button';
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
  })
  .add('Disabled', () => {
    const [selected, handleChangeSelected] = useState('Other');
    const [otherValue, updateOther] = useState('Butterfinger, duh');

    const handleChangeOther = ({
      target: { value },
    }: ChangeEvent<HTMLInputElement>): void => updateOther(value);

    return (
      <div>
        <Radio
          disabled
          label="Best Candy Bar"
          selected={selected}
          options={['Snickers', 'Three Musketeers', 'Baby Ruth', 'Other']}
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
  })
  .add('Error', () => {
    const [selected, handleChangeSelected] = useState('');

    return (
      <div>
        <Radio
          label="Pick me!"
          selected={selected}
          options={['ME!', 'No, ME!', 'Me, me, me!', 'MEEEEeeeEEE']}
          onChange={(event): void => {
            handleChangeSelected(event.target.name);
          }}
          errorMessage={selected ? '' : 'You HAVE to pick someone'}
        />

        <div style={{ marginTop: '1rem' }}>
          <Button
            type="destructive"
            onClick={(): void => handleChangeSelected('')}
          >
            Pick no one!
          </Button>
        </div>
      </div>
    );
  });
