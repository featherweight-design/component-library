import React, { useState } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import { Button } from 'components/Buttons';
import Icon from 'components/Icon/Icon';
import Accordion from './Accordion';

export default {
  title: 'Components/Accordion',
  decorators: [withA11y],
};

const listItemStyles = {
  padding: '1rem',
  borderBottom: '1px solid gray',
};

export const Default = (): JSX.Element => (
  <Accordion title="Contacts">
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={listItemStyles}>
        <Icon icon="person" /> Andre
      </span>
      <span style={listItemStyles}>
        <Icon icon="person" /> José
      </span>
      <span style={listItemStyles}>
        <Icon icon="person" /> Jane
      </span>
      <span style={listItemStyles}>
        <Icon icon="person" /> Ariana
      </span>
      <span style={{ ...listItemStyles, borderBottomColor: 'transparent' }}>
        <Icon icon="person" /> Darth Vader
      </span>
    </div>
  </Accordion>
);

export const Hidden = (): JSX.Element => {
  const [isExpanded, toggleIsExpanded] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button
        variant="brand"
        onClick={(): void => toggleIsExpanded(!isExpanded)}
      >
        Click Me!
      </Button>

      <Accordion expanded={isExpanded}>
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
      </Accordion>
    </div>
  );
};

export const Multiple = (): JSX.Element => (
  <div>
    <Accordion title="Hide small things!">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span>🐛</span>
        <span>🐛</span>
        <span>🐛</span>
        <span>🐛</span>
        <span>🐛</span>
      </div>
    </Accordion>

    <Accordion title="Hide medium things!">
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
    </Accordion>

    <Accordion title="Hide big things!">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '5rem',
        }}
      >
        <span>🐻</span>
      </div>
    </Accordion>
  </div>
);
