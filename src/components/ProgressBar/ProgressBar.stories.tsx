import React, { useState, useEffect, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import { ProgressItem, SelectOptionType } from 'types';
import { SIZES_ENUM, DEFAULT_SIZE } from './utilities/defaults';
import ProgressBar from './ProgressBar';
import { Button } from 'components/Buttons';
import Input from 'components/Input/Input';
import Select from 'components/Select/Select';

export default {
  title: 'Components/Progress/ProgressBar',
  decorators: [withA11y],
};

const containerStyles = { width: '40rem', padding: '1rem' };

const initialItems = [
  {
    isComplete: true,
  },
  {
    isComplete: true,
  },
  {
    isComplete: true,
  },
  {
    isComplete: false,
  },
  {
    isComplete: false,
  },
  {
    isComplete: false,
  },
  {
    isComplete: false,
  },
  {
    isComplete: false,
  },
  {
    isComplete: false,
  },
  {
    isComplete: false,
  },
];

export const Default = (): JSX.Element => (
  <div style={containerStyles}>
    <ProgressBar itemsToComplete={initialItems} />
  </div>
);

export const Playground = (): JSX.Element => {
  const [containerWidth, updateContainerWidth] = useState<string>('40');
  const [items, updateItems] = useState<ProgressItem[]>(initialItems);
  const [size, updateSize] = useState<SelectOptionType>({
    label: 'medium',
    value: DEFAULT_SIZE,
  });
  const [isRounded, toggleIsRounded] = useState<boolean>(false);
  const [isGreen, toggleIsGreen] = useState<boolean>(true);
  const [numberComplete, updateNumberComplete] = useState<number>(
    items.filter(({ isComplete }) => isComplete).length
  );

  useEffect(() => {
    const newItems = items.map((item, index) => ({
      isComplete: index < numberComplete,
    }));

    updateItems(newItems);
  }, [numberComplete]);

  const isComplete = !items.find(({ isComplete }) => !isComplete);
  const sizeOptions = Object.keys(SIZES_ENUM).map(label => ({
    label,
    value: label,
  }));

  return (
    <div className="container">
      <div className="story__controls-container">
        <Input
          label="Container width (rem)"
          type="number"
          name="container-width"
          value={containerWidth}
          onChange={({
            target: { value },
          }: ChangeEvent<HTMLInputElement>): void =>
            updateContainerWidth(value)
          }
        />

        <Input
          label="Number of complete items (1-10)"
          type="number"
          name="number-complete"
          value={numberComplete.toString()}
          min="0"
          max="10"
          onChange={({
            target: { value },
          }: ChangeEvent<HTMLInputElement>): void =>
            updateNumberComplete(Number(value))
          }
        />

        <Select
          selected={size}
          label="Size options"
          onSelect={(option: SelectOptionType): void => updateSize(option)}
          options={sizeOptions}
        />

        <Button
          type="brand"
          onClick={(): void => toggleIsRounded(!isRounded)}
        >{`isRounded: ${isRounded}`}</Button>

        <Button type="brand" onClick={(): void => toggleIsGreen(!isGreen)}>
          Toggle color
        </Button>

        <Button
          type="brand"
          onClick={(): void => {
            updateItems(items.map(() => ({ isComplete: !isComplete })));
            updateNumberComplete(isComplete ? 0 : 10);
          }}
        >
          {`${isComplete ? 'Reset' : 'Complete'} all items`}
        </Button>
      </div>

      <div style={{ width: `${containerWidth}rem`, padding: '1rem' }}>
        <ProgressBar
          itemsToComplete={items}
          size={size.value}
          isRounded={isRounded}
          color={isGreen ? '#4bca81' : '#46a7fc'}
        />
      </div>
    </div>
  );
};

export const SizeTypes = (): JSX.Element => (
  <div style={containerStyles}>
    <div style={{ marginBottom: '1rem' }}>
      <p>X-small (0.125rem)</p>
      <ProgressBar itemsToComplete={initialItems} size="x-small" />
    </div>

    <div style={{ marginBottom: '1rem' }}>
      <p>Small (0.25rem)</p>
      <ProgressBar itemsToComplete={initialItems} size="small" />
    </div>

    <div style={{ marginBottom: '1rem' }}>
      <p>Medium (default - 0.5rem)</p>
      <ProgressBar itemsToComplete={initialItems} />
    </div>

    <div style={{ marginBottom: '1rem' }}>
      <p>Large (0.75rem)</p>
      <ProgressBar itemsToComplete={initialItems} size="large" />
    </div>

    <div style={{ marginBottom: '1rem' }}>
      <p>X-large (1rem)</p>
      <ProgressBar itemsToComplete={initialItems} size="x-large" />
    </div>
  </div>
);

export const WithCustomColor = (): JSX.Element => (
  <div style={containerStyles}>
    <ProgressBar itemsToComplete={initialItems} color="#46a7fc" />
  </div>
);

export const WithRoundedCorners = (): JSX.Element => (
  <div style={containerStyles}>
    <ProgressBar itemsToComplete={initialItems} isRounded />
  </div>
);

export const WithoutDescriptions = (): JSX.Element => (
  <div style={containerStyles}>
    <ProgressBar
      itemsToComplete={initialItems}
      shouldShowCountComplete={false}
      shouldShowPercentageComplete={false}
    />
  </div>
);
