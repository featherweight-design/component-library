import { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import { Button } from 'components/Buttons';
import Radio from './Radio';

export default {
  title: 'Components/Form/Radio',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => {
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
};

export const Disabled = (): JSX.Element => {
  const [selected, handleChangeSelected] = useState('Other');

  return (
    <div>
      <Radio
        disabled
        label="Best Candy Bar"
        selected={selected}
        options={[
          'Snickers',
          'Three Musketeers',
          'Baby Ruth',
          'Butterfinger, duh',
        ]}
        onChange={(event): void => {
          handleChangeSelected(event.target.name);
        }}
      />
    </div>
  );
};

export const Error = (): JSX.Element => {
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
          variant="destructive"
          onClick={(): void => handleChangeSelected('')}
        >
          Pick no one!
        </Button>
      </div>
    </div>
  );
};

export const WithOtherOption = (): JSX.Element => {
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
};
