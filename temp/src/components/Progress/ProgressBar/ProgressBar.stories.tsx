import React, { useState, useEffect, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import { ProgressItem, ProgressBarSizes } from 'types';
import { SIZES_ENUM, DEFAULT_SIZE } from './utilities/defaults';
import ProgressBar from './ProgressBar';
import { Button } from 'components/Buttons';
import Input from 'components/Form/Input/Input';
import Select from 'components/Form/Select/Select';

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
  const [size, updateSize] = useState<ProgressBarSizes>(DEFAULT_SIZE);
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

  return (
    <div className="container">
      <div className="story__controls-container">
        <Input
          label="Container width (rem)"
          type="number"
          name="container-width"
          value={containerWidth}
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
            updateContainerWidth(value)
          }
        />

        <Input
          label="Number of complete items (1-10)"
          type="number"
          name="number-complete"
          value={numberComplete}
          min="0"
          max="10"
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
            updateNumberComplete(Number(value))
          }
        />

        <Select
          name="size"
          value={size}
          label="Size options"
          onChange={({ target: { value } }) =>
            updateSize(value as ProgressBarSizes)
          }
        >
          {Object.keys(SIZES_ENUM).map(sizeOption => (
            <option key={sizeOption} value={sizeOption}>
              {sizeOption}
            </option>
          ))}
        </Select>

        <Button
          type="brand"
          onClick={() => toggleIsRounded(!isRounded)}
        >{`isRounded: ${isRounded}`}</Button>

        <Button type="brand" onClick={() => toggleIsGreen(!isGreen)}>
          Toggle color
        </Button>

        <Button
          type="brand"
          onClick={() => {
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
          size={size}
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
