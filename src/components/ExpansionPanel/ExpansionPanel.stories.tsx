import * as React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import ExpansionPanel from './ExpansionPanel';

storiesOf('Expansion Panel', module)
  .addDecorator(checkA11y)
  .add('Default', () => (
    <ExpansionPanel title="Click Me!">
      <p>I am some hidden text</p>
    </ExpansionPanel>
  ))
  .add('With type "light"', () => (
    <ExpansionPanel title="Some important title" type="light">
      <p>Words</p>
    </ExpansionPanel>
  ))
  .add('With a nested panel', () => (
    <ExpansionPanel title="Nesting doll">
      <ExpansionPanel title="Nested doll" type="nested">
        <p>You found me!</p>
      </ExpansionPanel>
    </ExpansionPanel>
  ));
