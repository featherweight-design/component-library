import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Button from './Button';

export default {
  title: 'Components/Buttons/Button',
  decorators: [withA11y],
};

const mockClick = (): void => console.log("I've been clicked!");

export const Default = (): JSX.Element => (
  <Button onClick={mockClick} type="brand">
    Click Me!
  </Button>
);

export const Types = (): JSX.Element => (
  <div className="story__button-container">
    <Button onClick={mockClick}>Default</Button>
    <Button onClick={mockClick} type="default-destructive">
      Default Destructive
    </Button>
    <Button onClick={mockClick} type="brand">
      Brand
    </Button>
    <Button onClick={mockClick} type="neutral">
      Neutral
    </Button>
    <Button onClick={mockClick} type="outline">
      Outline
    </Button>
    <Button onClick={mockClick} type="destructive">
      Destructive
    </Button>
    <Button onClick={mockClick} type="outline-destructive">
      Outline Destructive
    </Button>
  </div>
);

export const TypesDisabled = (): JSX.Element => (
  <div className="story__button-container">
    <Button onClick={mockClick} disabled>
      Default
    </Button>
    <Button onClick={mockClick} type="default-destructive" disabled>
      Default Destructive
    </Button>
    <Button onClick={mockClick} type="brand" disabled>
      Brand
    </Button>
    <Button onClick={mockClick} type="neutral" disabled>
      Neutral
    </Button>
    <Button onClick={mockClick} type="outline" disabled>
      Outline
    </Button>
    <Button onClick={mockClick} type="destructive" disabled>
      Destructive
    </Button>
    <Button onClick={mockClick} type="outline-destructive" disabled>
      Outline Destructive
    </Button>
  </div>
);

export const TypesLoading = (): JSX.Element => (
  <div className="story__button-container">
    <Button onClick={mockClick} loading>
      Default
    </Button>
    <Button onClick={mockClick} type="default-destructive" loading>
      Default Destructive
    </Button>
    <Button onClick={mockClick} type="brand" loading>
      Brand
    </Button>
    <Button onClick={mockClick} type="neutral" loading>
      Neutral
    </Button>
    <Button onClick={mockClick} type="outline" loading>
      Outline
    </Button>
    <Button onClick={mockClick} type="destructive" loading>
      Destructive
    </Button>
    <Button onClick={mockClick} type="outline-destructive" loading>
      Outline Destructive
    </Button>
  </div>
);
