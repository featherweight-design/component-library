import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import ActionButton from './ActionButton';
import fwdLogo from 'styles/assets/images/Logo-Mock-1-Square-Inverted.jpg';

export default {
  title: 'Components/Buttons/ActionButton',
  decorators: [withA11y],
};

const mockClick = (): void => console.log("I've been clicked!");

export const Default = (): JSX.Element => (
  <ActionButton icon="check" onClick={mockClick} />
);

export const Variants = (): JSX.Element => (
  <div
    className="story__button-container"
    style={{
      gridTemplateColumns: '1fr 1fr 1fr',
      padding: '0.5rem',
      backgroundColor: '#ccc',
    }}
  >
    <ActionButton icon="check" onClick={mockClick} />

    <ActionButton icon="check" onClick={mockClick} variant="secondary" />

    <ActionButton icon="check" onClick={mockClick} variant="glass" />
  </div>
);

export const VariantsDisabled = (): JSX.Element => (
  <div
    className="story__button-container"
    style={{
      gridTemplateColumns: '1fr 1fr 1fr',
      padding: '0.5rem',
      backgroundColor: '#c9c7c5',
    }}
  >
    <ActionButton icon="check" onClick={mockClick} disabled />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="secondary"
      disabled
    />

    <ActionButton icon="check" onClick={mockClick} variant="glass" disabled />
  </div>
);

export const VariantsLoading = (): JSX.Element => (
  <div
    className="story__button-container"
    style={{
      gridTemplateColumns: '1fr 1fr 1fr',
      padding: '0.5rem',
      backgroundColor: '#c9c7c5',
    }}
  >
    <ActionButton icon="check" onClick={mockClick} loading />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="secondary"
      loading
    />

    <ActionButton icon="check" onClick={mockClick} variant="glass" loading />
  </div>
);

export const VariantsWithLabel = (): JSX.Element => (
  <div
    className="story__button-container"
    style={{
      gridTemplateColumns: '1fr 1fr 1fr',
      padding: '0.5rem',
      backgroundColor: '#c9c7c5',
    }}
  >
    <ActionButton icon="check" onClick={mockClick} label="Primary" />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="secondary"
      label="Secondary"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="glass"
      label="Glass"
    />
  </div>
);

export const VariantsWithSizes = (): JSX.Element => (
  <div
    className="story__button-container"
    style={{
      gridTemplateColumns: '1fr 1fr 1fr',
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
      variant="secondary"
      label="X-Small"
      size="x-small"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="glass"
      label="X-Small"
      size="x-small"
    />

    <ActionButton icon="check" onClick={mockClick} label="Small" size="small" />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="secondary"
      label="Small"
      size="small"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="glass"
      label="Small"
      size="small"
    />

    <ActionButton icon="check" onClick={mockClick} label="Medium (default)" />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="secondary"
      label="Medium (default)"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="glass"
      label="Medium (default)"
    />

    <ActionButton icon="check" onClick={mockClick} label="Large" size="large" />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="secondary"
      label="Large"
      size="large"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="glass"
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
      variant="secondary"
      label="X-Large"
      size="x-large"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="glass"
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
    variant="secondary"
  />
);
