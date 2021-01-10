import React, { useState } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import { SelectOptionType } from 'types';
import Select from './Select';

export default {
  title: 'Components/Form/Select',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => {
  const [selected, handleSelectOption] = useState<SelectOptionType | undefined>(
    undefined
  );

  const mockOnSelect = (option: SelectOptionType): void => {
    console.log({ option });
    handleSelectOption(option);
  };

  return (
    <Select
      label="Favorite Creature"
      selected={selected}
      onSelect={mockOnSelect}
      options={[
        { value: 'alien', label: 'Alien 👽' },
        { value: 'dragon', label: 'Dragon 🐉' },
        { value: 'ghost', label: 'Ghost 👻' },
        { value: 'unicorn', label: 'Unicorn 🦄' },
      ]}
    />
  );
};

export const Types = (): JSX.Element => {
  const [selected, handleSelectOption] = useState<SelectOptionType | undefined>(
    undefined
  );

  const mockOnSelect = (option: SelectOptionType): void => {
    console.log({ option });
    handleSelectOption(option);
  };

  return (
    <div className="story__select-container">
      <Select
        label="Label"
        selected={selected}
        onSelect={mockOnSelect}
        options={[
          { value: 'alien', label: 'Alien 👽' },
          { value: 'dragon', label: 'Dragon 🐉' },
          { value: 'ghost', label: 'Ghost 👻' },
          { value: 'unicorn', label: 'Unicorn 🦄' },
        ]}
      />

      <Select
        disabled
        label="Disabled"
        selected={{
          value: 'disabled',
          label: 'Locked',
        }}
        onSelect={mockOnSelect}
        options={[
          { value: 'alien', label: 'Alien 👽' },
          { value: 'dragon', label: 'Dragon 🐉' },
          { value: 'ghost', label: 'Ghost 👻' },
          { value: 'unicorn', label: 'Unicorn 🦄' },
        ]}
      />

      <Select
        label="Label"
        selected={selected}
        onSelect={mockOnSelect}
        errorMessage="Please pick a Hartigan"
        options={[
          { value: 'alien', label: 'Alien 👽' },
          { value: 'dragon', label: 'Dragon 🐉' },
          { value: 'ghost', label: 'Ghost 👻' },
          { value: 'unicorn', label: 'Unicorn 🦄' },
        ]}
      />
    </div>
  );
};
