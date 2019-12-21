import * as React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import Button from './Button';

storiesOf('Button', module)
  .addDecorator(checkA11y)
  .add('Types', () => (
    <div>
      <Button>Default</Button>
      <Button type="default-destructive">Default Destructive</Button>
      <Button type="brand">Brand</Button>
      <Button type="neutral">Neutral</Button>
      <Button type="outline">Outline</Button>
      <Button type="destructive">Destructive</Button>
      <Button type="outline-destructive">Outline Destructive</Button>
    </div>
  )).add('Disabled', () => (
    <div>
      <Button disabled>Default</Button>
      <Button type="default-destructive" disabled>Default Destructive</Button>
      <Button type="brand" disabled>Brand</Button>
      <Button type="neutral" disabled>Neutral</Button>
      <Button type="outline" disabled>Outline</Button>
      <Button type="destructive" disabled>Destructive</Button>
      <Button type="outline-destructive" disabled>Outline Destructive</Button>
    </div>
  )).add('Loading', () => (
    <div>
      <Button loading>Default</Button>
      <Button type="default-destructive" loading>Default Destructive</Button>
      <Button type="brand" loading>Brand</Button>
      <Button type="neutral" loading>Neutral</Button>
      <Button type="outline" loading>Outline</Button>
      <Button type="destructive" loading>Destructive</Button>
      <Button type="outline-destructive" loading>Outline Destructive</Button>
    </div>
  ));