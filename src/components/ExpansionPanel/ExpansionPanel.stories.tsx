import React, { useState } from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import Button from '../Button/Button';
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
  ))
  .add('With type "hidden"', () => {
    const [isExpanded, toggleIsExpanded] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button type="brand" onClick={() => toggleIsExpanded(!isExpanded)}>
          Click Me!
        </Button>
        <ExpansionPanel type="hidden" isExpanded={isExpanded}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '2rem',
              padding: '1rem',
              border: '1px solid #B2B2B2',
              borderRadius: '0.25rem',
              backgroundImage:
                'url(https://images.fineartamerica.com/images-medium-large-5/star-confetti-gold-random-confetti-background-vialeta-novik.jpg)',
            }}
          >
            <h1>🎉 TA DA 🎉</h1>
          </div>
        </ExpansionPanel>
      </div>
    );
  });
