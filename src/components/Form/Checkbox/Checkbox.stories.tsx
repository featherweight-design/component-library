import { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Checkbox from './Checkbox';

export default {
  title: 'Components/Form/Checkbox',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => {
  const [options, updateOptions] = useState([
    { checked: true, label: 'Torin' },
    { checked: false, label: 'Juniper' },
    { checked: false, label: 'Pooch' },
    { checked: false, label: 'Luna' },
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
      <Checkbox label="Best Dogs" onChange={handleChange} options={options} />
    </div>
  );
};

export const Disabled = (): JSX.Element => {
  const options = [
    { checked: false, label: 'Disabled', disabled: true },
    { checked: true, label: 'Disabled Checked', disabled: true },
  ];

  return (
    <div style={{ display: 'flex ' }}>
      <Checkbox
        label="Label"
        /* eslint-disable-next-line no-console */
        onChange={(): void => console.log('Disabled')}
        options={options}
      />
    </div>
  );
};

export const Error = (): JSX.Element => {
  const [options, updateOptions] = useState([
    { checked: false, label: 'Cat' },
    { checked: false, label: 'Dog' },
    { checked: false, label: 'Gold Fish' },
    { checked: false, label: 'Guinea Pig' },
    { checked: false, label: 'Hedgehog' },
    { checked: false, label: 'Ocelot' },
    { checked: false, label: 'Cthulhu' },
  ]);

  const handleChange = ({
    target: { name, checked },
  }: ChangeEvent<HTMLInputElement>): void => {
    const newOptions = options.map(option =>
      option.label === name ? { ...option, checked } : option
    );

    updateOptions(newOptions);
  };

  const hasOptionChecked = options.find(({ checked }) => checked);

  return (
    <div style={{ display: 'flex ' }}>
      <Checkbox
        label="Label"
        onChange={handleChange}
        options={options}
        errorMessage={!hasOptionChecked ? 'Please pick a favorite pet' : ''}
      />
    </div>
  );
};

export const WithOtherOptions = (): JSX.Element => {
  const [otherValue, updateOther] = useState('');
  const [options, updateOptions] = useState([
    { checked: true, label: 'Chocolate' },
    { checked: false, label: 'Vanilla' },
    { checked: false, label: 'Salted Oreo' },
    { checked: false, label: 'Cookie Dough' },
    { checked: false, label: 'Other' },
  ]);

  const handleChange = ({
    target: { name, checked },
  }: ChangeEvent<HTMLInputElement>): void => {
    const newOptions = options.map(option =>
      option.label === name ? { ...option, checked } : option
    );

    if (name === 'Other' && !checked) {
      updateOther('');
    }

    updateOptions(newOptions);
  };

  const handleChangeOther = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => updateOther(value);

  return (
    <div style={{ display: 'flex ' }}>
      <Checkbox
        label="Best Ice Cream"
        onChange={handleChange}
        options={options}
        other={{
          value: otherValue,
          onChange: handleChangeOther,
        }}
      />
    </div>
  );
};
