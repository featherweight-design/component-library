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
  ));