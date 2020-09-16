import React, { useState } from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import { Button } from 'components/Buttons';
import ExpansionPanel from './ExpansionPanel';

storiesOf('Expansion Panel', module)
  .addDecorator(checkA11y)
  .add('Default', () => (
    <div>
      <ExpansionPanel title="Hide small things!">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span>🐛</span>
          <span>🐛</span>
          <span>🐛</span>
          <span>🐛</span>
          <span>🐛</span>
        </div>
      </ExpansionPanel>

      <ExpansionPanel title="Hide medium things!">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '2rem',
          }}
        >
          <span>🐰</span>
          <span>🐰</span>
          <span>🐰</span>
        </div>
      </ExpansionPanel>

      <ExpansionPanel title="Hide big things!">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '5rem',
          }}
        >
          <span>🐻</span>
        </div>
      </ExpansionPanel>
    </div>
  ))
  .add('With no title', () => {
    const [isExpanded, toggleIsExpanded] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          type="brand"
          onClick={(): void => toggleIsExpanded(!isExpanded)}
        >
          Click Me!
        </Button>
        <ExpansionPanel expanded={isExpanded}>
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
