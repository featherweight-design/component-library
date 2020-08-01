import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ActionButton from './ActionButton';
import fwdLogo from 'styles/assets/Logo-Mock-1-Square.jpg';

export default {
  title: 'Components/Buttons/ActionButton',
  decorators: [withA11y],
};

const mockClick = (): void => console.log("I've been clicked!");

export const Default = (): JSX.Element => (
  <ActionButton icon="check" onClick={mockClick} />
);

export const Types = (): JSX.Element => (
  <div
    className="story__button-container"
    style={{
      gridTemplateColumns: '1fr 1fr',
      padding: '0.5rem',
      backgroundColor: '#ccc',
    }}
  >
    <ActionButton icon="check" onClick={mockClick} />

    <ActionButton icon="check" onClick={mockClick} type="secondary" />
  </div>
);

export const TypesDisabled = (): JSX.Element => (
  <div
    className="story__button-container"
    style={{
      gridTemplateColumns: '1fr 1fr',
      padding: '0.5rem',
      backgroundColor: '#c9c7c5',
    }}
  >
    <ActionButton icon="check" onClick={mockClick} disabled />

    <ActionButton icon="check" onClick={mockClick} type="secondary" disabled />
  </div>
);

export const TypesLoading = (): JSX.Element => (
  <div
    className="story__button-container"
    style={{
      gridTemplateColumns: '1fr 1fr',
      padding: '0.5rem',
      backgroundColor: '#c9c7c5',
    }}
  >
    <ActionButton icon="check" onClick={mockClick} loading />

    <ActionButton icon="check" onClick={mockClick} type="secondary" loading />
  </div>
);

export const TypesWithLabel = (): JSX.Element => (
  <div
    className="story__button-container"
    style={{
      gridTemplateColumns: '1fr 1fr',
      padding: '0.5rem',
      backgroundColor: '#c9c7c5',
    }}
  >
    <ActionButton icon="check" onClick={mockClick} label="Primary" />

    <ActionButton
      icon="check"
      onClick={mockClick}
      type="secondary"
      label="Secondary"
    />
  </div>
);

export const TypesWithSizes = (): JSX.Element => (
  <div
    className="story__button-container"
    style={{
      gridTemplateColumns: '1fr 1fr',
      padding: '0.5rem',
      backgroundColor: '#c9c7c5',
    }}
  >
    <ActionButton
      icon="check"
      onClick={mockClick}
      label="X-Small"
      size="x-small"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      type="secondary"
      label="X-Small"
      size="x-small"
    />

    <ActionButton icon="check" onClick={mockClick} label="Small" size="small" />

    <ActionButton
      icon="check"
      onClick={mockClick}
      type="secondary"
      label="Small"
      size="small"
    />

    <ActionButton icon="check" onClick={mockClick} label="Medium (default)" />

    <ActionButton
      icon="check"
      onClick={mockClick}
      type="secondary"
      label="Medium (default)"
    />

    <ActionButton icon="check" onClick={mockClick} label="Large" size="large" />

    <ActionButton
      icon="check"
      onClick={mockClick}
      type="secondary"
      label="Large"
      size="large"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      label="X-Large"
      size="x-large"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      type="secondary"
      label="X-Large"
      size="x-large"
    />
  </div>
);

export const WithImage = (): JSX.Element => (
  <ActionButton
    image={fwdLogo}
    onClick={mockClick}
    label="Conga"
    type="secondary"
  />
);
