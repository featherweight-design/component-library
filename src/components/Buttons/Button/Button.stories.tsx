import { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { Meta } from '@storybook/react';

import { Input } from 'components/Form';
import { buttonCopy } from 'shared/data/copyContent';
import Button from './Button';

export default {
  title: 'Components/Buttons/Button',
  decorators: [withA11y],
} as Meta;

/* eslint-disable-next-line no-console */
const mockClick = (): void => console.log("I've been clicked!");

export const Default = (): JSX.Element => (
  <Button onClick={mockClick} variant="brand">
    Click Me!
  </Button>
);

export const Playground = (): JSX.Element => {
  const [color, updateColorValue] = useState('#000');
  const [backgroundColor, updateBackgroundColorValue] = useState('#F56C70');
  const [borderColor, updateBorderColor] = useState('#00FFE5');

  return (
    <div className="container">
      <div className="story__controls-container">
        <Input
          label="Brand color"
          name="brand-color"
          value={color}
          onChange={({
            target: { value },
          }: ChangeEvent<HTMLInputElement>): void => updateColorValue(value)}
        />

        <Input
          label="Brand background color"
          name="brand-background-color"
          value={backgroundColor}
          onChange={({
            target: { value },
          }: ChangeEvent<HTMLInputElement>): void =>
            updateBackgroundColorValue(value)
          }
        />

        <Input
          label="Outline border color"
          name="outline-border-color"
          value={borderColor}
          onChange={({
            target: { value },
          }: ChangeEvent<HTMLInputElement>): void => updateBorderColor(value)}
        />
      </div>

      <div className="story__button-container">
        <Button
          onClick={mockClick}
          variant="brand"
          style={{ backgroundColor, color }}
        >
          {buttonCopy.brand}
        </Button>

        <Button onClick={mockClick} variant="outline" style={{ borderColor }}>
          {buttonCopy.outline}
        </Button>
      </div>
    </div>
  );
};

export const Shapes = (): JSX.Element => (
  <div className="story__button-container">
    <Button onClick={mockClick} variant="brand">
      {buttonCopy.roundedSquare}
    </Button>
    <Button onClick={mockClick} variant="brand" shape="round">
      {buttonCopy.round}
    </Button>
    <Button onClick={mockClick} variant="brand" shape="square">
      {buttonCopy.square}
    </Button>
  </div>
);

export const Variants = (): JSX.Element => (
  <div className="story__button-container">
    <Button onClick={mockClick}>Default</Button>
    <Button onClick={mockClick} variant="default-destructive">
      {buttonCopy.defaultDestructive}
    </Button>
    <Button onClick={mockClick} variant="brand">
      {buttonCopy.brand}
    </Button>
    <Button onClick={mockClick} variant="neutral">
      {buttonCopy.neutral}
    </Button>
    <Button onClick={mockClick} variant="outline">
      {buttonCopy.outline}
    </Button>
    <Button onClick={mockClick} variant="destructive">
      {buttonCopy.destructive}
    </Button>
    <Button onClick={mockClick} variant="outline-destructive">
      {buttonCopy.outlineDestructive}
    </Button>
    <Button onClick={mockClick} variant="glass">
      {buttonCopy.glass}
    </Button>
  </div>
);

export const VariantsDisabled = (): JSX.Element => (
  <div className="story__button-container">
    <Button onClick={mockClick} disabled>
      {buttonCopy.default}
    </Button>
    <Button onClick={mockClick} variant="default-destructive" disabled>
      {buttonCopy.defaultDestructive}
    </Button>
    <Button onClick={mockClick} variant="brand" disabled>
      {buttonCopy.brand}
    </Button>
    <Button onClick={mockClick} variant="neutral" disabled>
      {buttonCopy.neutral}
    </Button>
    <Button onClick={mockClick} variant="outline" disabled>
      {buttonCopy.outline}
    </Button>
    <Button onClick={mockClick} variant="destructive" disabled>
      {buttonCopy.destructive}
    </Button>
    <Button onClick={mockClick} variant="outline-destructive" disabled>
      {buttonCopy.outlineDestructive}
    </Button>
    <Button onClick={mockClick} variant="brand" shape="round" disabled>
      {buttonCopy.round}
    </Button>
    <Button onClick={mockClick} variant="brand" shape="square" disabled>
      {buttonCopy.square}
    </Button>
    <Button onClick={mockClick} variant="glass" disabled>
      {buttonCopy.glass}
    </Button>
  </div>
);

export const VariantsLoading = (): JSX.Element => (
  <div className="story__button-container">
    <Button onClick={mockClick} loading>
      {buttonCopy.default}
    </Button>
    <Button onClick={mockClick} variant="default-destructive" loading>
      {buttonCopy.defaultDestructive}
    </Button>
    <Button onClick={mockClick} variant="brand" loading>
      {buttonCopy.brand}
    </Button>
    <Button onClick={mockClick} variant="neutral" loading>
      {buttonCopy.neutral}
    </Button>
    <Button onClick={mockClick} variant="outline" loading>
      {buttonCopy.outline}
    </Button>
    <Button onClick={mockClick} variant="destructive" loading>
      {buttonCopy.destructive}
    </Button>
    <Button onClick={mockClick} variant="outline-destructive" loading>
      {buttonCopy.outlineDestructive}
    </Button>
    <Button onClick={mockClick} variant="brand" shape="round" loading>
      {buttonCopy.round}
    </Button>
    <Button onClick={mockClick} variant="brand" shape="square" loading>
      {buttonCopy.square}
    </Button>
    <Button onClick={mockClick} variant="glass" loading>
      {buttonCopy.glass}
    </Button>
  </div>
);
