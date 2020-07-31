import React, { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import AutoSuggest from './AutoSuggest';
import { Suggestion } from 'types';

const animalsList = [
  {
    label: 'Alligator',
    value: 'Alligator',
  },
  {
    label: 'Bear',
    value: 'Bear',
  },
  {
    label: 'Cat',
    value: 'Cat',
  },
  {
    label: 'Donkey',
    value: 'Donkey',
  },
  {
    label: 'Elephant',
    value: 'Elephant',
  },
  {
    label: 'Flamingo',
    value: 'Flamingo',
  },
  {
    label: 'Giraffe',
    value: 'Giraffe',
  },
  {
    label: 'Hippopotamus',
    value: 'Hippopotamus',
  },
  {
    label: 'Iguana',
    value: 'Iguana',
  },
  {
    label: 'Jaguar',
    value: 'Jaguar',
  },
  {
    label: 'Kangaroo',
    value: 'Kangaroo',
  },
  {
    label: 'Lion',
    value: 'Lion',
  },
  {
    label: 'Macaw',
    value: 'Macaw',
  },
  {
    label: 'Newt',
    value: 'Newt',
  },
  {
    label: 'Ostrich',
    value: 'Ostrich',
  },
  {
    label: 'Pig',
    value: 'Pig',
  },
  {
    label: 'Quail',
    value: 'Quail',
  },
  {
    label: 'Rhinoceros',
    value: 'Rhinoceros',
  },
  {
    label: 'Sheep',
    value: 'Sheep',
  },
  {
    label: 'Tiger',
    value: 'Tiger',
  },
  {
    label: 'Urial',
    value: 'Urial',
  },
  {
    label: 'Vole',
    value: 'Vole',
  },
  {
    label: 'Wolf',
    value: 'Wolf',
  },
  {
    label: 'X-ray Tetra',
    value: 'X-ray Tetra',
  },
  {
    label: 'Yak',
    value: 'Yak',
  },
  {
    label: 'Zebra',
    value: 'Zebra',
  },
];

export default {
  title: 'Components/Form/AutoSuggest',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => {
  const [inputValue, updateInputValue] = useState('');
  const [suggestions, updateSuggestions] = useState<Suggestion[]>([]);
  const [loading, updateLoading] = useState(false);

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    updateInputValue(value);
  };

  const handleOnSearch = (searchValue: string) => {
    updateLoading(true);

    window.setTimeout(() => {
      updateSuggestions(
        animalsList.filter(name =>
          name.value.toLowerCase().includes(searchValue.toLowerCase())
        )
      );

      updateLoading(false);
    }, 1500);
  };

  const handleSelectResult = (suggestion: Suggestion) => {
    updateInputValue(suggestion.value);
    updateSuggestions([]);
  };

  return (
    <div style={{ height: '12rem', padding: '1rem' }}>
      <AutoSuggest
        required
        className="ai-clm-controls__input"
        name="accountSearch"
        value={inputValue}
        label="Animal search"
        placeholder="Type some stuff..."
        onChange={handleChange}
        onSearch={handleOnSearch}
        onSelectResult={handleSelectResult}
        suggestions={suggestions}
        loading={loading}
        searchThreshold={1}
      />
    </div>
  );
};
