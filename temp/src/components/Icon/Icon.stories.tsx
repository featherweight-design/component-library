import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import Icon from './Icon';

export default {
  title: 'Components/Icon',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <p
        style={{
          marginBottom: '1rem',
          fontSize: '18px',
          textDecoration: 'underline',
        }}
      >
        Lightning Design System
      </p>
      <Icon icon="search" />
    </div>

    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <p
        style={{
          marginBottom: '1rem',
          fontSize: '18px',
          textDecoration: 'underline',
        }}
      >
        Google Material
      </p>

      <Icon icon="search" designSystem="material" />
    </div>
  </div>
);

export const WithCustomColor = (): JSX.Element => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <p
        style={{
          marginBottom: '1rem',
          fontSize: '18px',
          textDecoration: 'underline',
        }}
      >
        Lightning Design System
      </p>
      <Icon icon="search" color="red" />
    </div>

    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <p
        style={{
          marginBottom: '1rem',
          fontSize: '18px',
          textDecoration: 'underline',
        }}
      >
        Google Material
      </p>

      <Icon icon="search" color="red" designSystem="material" />
    </div>
  </div>
);

export const WithCustomSize = (): JSX.Element => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <p
        style={{
          marginBottom: '1rem',
          fontSize: '18px',
          textDecoration: 'underline',
        }}
      >
        Lightning Design System
      </p>
      <Icon icon="search" size="4rem" color="teal" />
    </div>

    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <p
        style={{
          marginBottom: '1rem',
          fontSize: '18px',
          textDecoration: 'underline',
        }}
      >
        Google Material
      </p>

      <Icon icon="search" size="4rem" color="teal" designSystem="material" />
    </div>
  </div>
);
