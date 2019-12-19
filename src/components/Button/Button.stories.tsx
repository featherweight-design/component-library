import * as React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import Button from './Button';

storiesOf('Button', module)
  .addDecorator(checkA11y)
  .add('Default', () => (
    <Button>Click Me!</Button>
  ));