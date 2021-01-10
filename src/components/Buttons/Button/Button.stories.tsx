import React, { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Button from './Button';
import Input from '../../Input/Input';

export default {
  title: 'Components/Buttons/Button',
  decorators: [withA11y],
};

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
          Brand
        </Button>

        <Button onClick={mockClick} variant="outline" style={{ borderColor }}>
          Outline
        </Button>
      </div>
    </div>
  );
};

export const Shapes = (): JSX.Element => (
  <div className="story__button-container">
    <Button onClick={mockClick} variant="brand">
      Rounded Square (Default)
    </Button>
    <Button onClick={mockClick} variant="brand" shape="round">
      Round
    </Button>
    <Button onClick={mockClick} variant="brand" shape="square">
      Square
    </Button>
  </div>
);

export const Variants = (): JSX.Element => (
  <div className="story__button-container">
    <Button onClick={mockClick}>Default</Button>
    <Button onClick={mockClick} variant="default-destructive">
      Default Destructive
    </Button>
    <Button onClick={mockClick} variant="brand">
      Brand
    </Button>
    <Button onClick={mockClick} variant="neutral">
      Neutral
    </Button>
    <Button onClick={mockClick} variant="outline">
      Outline
    </Button>
    <Button onClick={mockClick} variant="destructive">
      Destructive
    </Button>
    <Button onClick={mockClick} variant="outline-destructive">
      Outline Destructive
    </Button>
    <Button onClick={mockClick} variant="glass">
      Glass
    </Button>
  </div>
);

export const VariantsDisabled = (): JSX.Element => (
  <div className="story__button-container">
    <Button onClick={mockClick} disabled>
      Default
    </Button>
    <Button onClick={mockClick} variant="default-destructive" disabled>
      Default Destructive
    </Button>
    <Button onClick={mockClick} variant="brand" disabled>
      Brand
    </Button>
    <Button onClick={mockClick} variant="neutral" disabled>
      Neutral
    </Button>
    <Button onClick={mockClick} variant="outline" disabled>
      Outline
    </Button>
    <Button onClick={mockClick} variant="destructive" disabled>
      Destructive
    </Button>
    <Button onClick={mockClick} variant="outline-destructive" disabled>
      Outline Destructive
    </Button>
    <Button onClick={mockClick} variant="brand" shape="round" disabled>
      Round
    </Button>
    <Button onClick={mockClick} variant="brand" shape="square" disabled>
      Square
    </Button>
    <Button onClick={mockClick} variant="glass" disabled>
      Glass
    </Button>
  </div>
);

export const VariantsLoading = (): JSX.Element => (
  <div className="story__button-container">
    <Button onClick={mockClick} loading>
      Default
    </Button>
    <Button onClick={mockClick} variant="default-destructive" loading>
      Default Destructive
    </Button>
    <Button onClick={mockClick} variant="brand" loading>
      Brand
    </Button>
    <Button onClick={mockClick} variant="neutral" loading>
      Neutral
    </Button>
    <Button onClick={mockClick} variant="outline" loading>
      Outline
    </Button>
    <Button onClick={mockClick} variant="destructive" loading>
      Destructive
    </Button>
    <Button onClick={mockClick} variant="outline-destructive" loading>
      Outline Destructive
    </Button>
    <Button onClick={mockClick} variant="brand" shape="round" loading>
      Round
    </Button>
    <Button onClick={mockClick} variant="brand" shape="square" loading>
      Square
    </Button>
    <Button onClick={mockClick} variant="glass" loading>
      Glass
    </Button>
  </div>
);
