import { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import { checkboxCopy } from 'shared/data/copyContent';
import Checkbox from './Checkbox';

export default {
  title: 'Components/Form/Checkbox',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => {
  const [options, updateOptions] = useState([
    { checked: true, label: checkboxCopy.torin },
    { checked: false, label: checkboxCopy.juniper },
    { checked: false, label: checkboxCopy.pooch },
    { checked: false, label: checkboxCopy.luna },
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
      <Checkbox
        label={checkboxCopy.bestDogs}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};

export const Disabled = (): JSX.Element => {
  const options = [
    { checked: false, label: checkboxCopy.disabled, disabled: true },
    { checked: true, label: checkboxCopy.disabledChecked, disabled: true },
  ];

  return (
    <div style={{ display: 'flex ' }}>
      <Checkbox
        label={checkboxCopy.disabledLabel}
        /* eslint-disable-next-line no-console */
        onChange={(): void => console.log('Disabled')}
        options={options}
      />
    </div>
  );
};

export const Error = (): JSX.Element => {
  const [options, updateOptions] = useState([
    { checked: false, label: checkboxCopy.cat },
    { checked: false, label: checkboxCopy.dog },
    { checked: false, label: checkboxCopy.goldFish },
    { checked: false, label: checkboxCopy.guineaPig },
    { checked: false, label: checkboxCopy.hedgehog },
    { checked: false, label: checkboxCopy.ocelot },
    { checked: false, label: checkboxCopy.cthulhu },
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
        errorMessage={!hasOptionChecked ? checkboxCopy.errorMessage : ''}
      />
    </div>
  );
};

export const WithOtherOptions = (): JSX.Element => {
  const [otherValue, updateOther] = useState('');
  const [options, updateOptions] = useState([
    { checked: true, label: checkboxCopy.chocolate },
    { checked: false, label: checkboxCopy.vanilla },
    { checked: false, label: checkboxCopy.saltedOreo },
    { checked: false, label: checkboxCopy.cookieDough },
    { checked: false, label: checkboxCopy.other },
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
        label={checkboxCopy.bestIceCream}
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
