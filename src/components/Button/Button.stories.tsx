import React, { MouseEvent } from 'react';
import { withA11Y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import Button from './Button';

const mockClick = () => console.log("I've been clicked!");

storiesOf('Button', module)
  .addDecorator(withA11Y)
  .add('Types', () => (
    <div>
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
  ))
  .add('Disabled', () => (
    <div>
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
  ))
  .add('Loading', () => (
    <div>
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
  ));
