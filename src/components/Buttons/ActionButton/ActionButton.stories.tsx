import { withA11y } from '@storybook/addon-a11y';

import { actionButtonCopy } from 'shared/data/copyContent';
import fwdLogo from 'styles/assets/images/Logo-Mock-1-Square-Inverted.jpg';
import ActionButton from './ActionButton';

export default {
  title: 'Components/Buttons/ActionButton',
  decorators: [withA11y],
};

/* eslint-disable-next-line no-console */
const mockClick = (): void => console.log("I've been clicked!");

export const Default = (): JSX.Element => (
  <ActionButton icon="check" onClick={mockClick} />
);

export const Shapes = (): JSX.Element => (
  <div
    className="story__button-container"
    style={{
      gridTemplateColumns: '1fr 1fr 1fr',
      padding: '0.5rem',
      backgroundColor: '#ccc',
    }}
  >
    <ActionButton
      icon="check"
      onClick={mockClick}
      label={actionButtonCopy.round}
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      shape="rounded-square"
      label={actionButtonCopy.roundedSquare}
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      shape="square"
      label={actionButtonCopy.square}
    />
  </div>
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
    <ActionButton
      icon="check"
      onClick={mockClick}
      label={actionButtonCopy.primary}
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="secondary"
      label={actionButtonCopy.secondary}
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="glass"
      label={actionButtonCopy.glass}
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
      label={actionButtonCopy.xSmall}
      size="x-small"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="secondary"
      label={actionButtonCopy.xSmall}
      size="x-small"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="glass"
      label={actionButtonCopy.xSmall}
      size="x-small"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      label={actionButtonCopy.small}
      size="small"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="secondary"
      label={actionButtonCopy.small}
      size="small"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="glass"
      label={actionButtonCopy.small}
      size="small"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      label={actionButtonCopy.medium}
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="secondary"
      label={actionButtonCopy.medium}
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="glass"
      label={actionButtonCopy.medium}
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      label={actionButtonCopy.large}
      size="large"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="secondary"
      label={actionButtonCopy.large}
      size="large"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="glass"
      label={actionButtonCopy.large}
      size="large"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      label={actionButtonCopy.xLarge}
      size="x-large"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="secondary"
      label={actionButtonCopy.xLarge}
      size="x-large"
    />

    <ActionButton
      icon="check"
      onClick={mockClick}
      variant="glass"
      label={actionButtonCopy.xLarge}
      size="x-large"
    />
  </div>
);

export const withChildren = (): JSX.Element => (
  <ActionButton onClick={mockClick}>
    <div style={{ display: 'grid', gap: '0.25rem' }}>
      <span
        style={{
          width: '1.5rem',
          height: '0.125rem',
          borderRadius: '1px',
          backgroundColor: 'white',
        }}
      />
      <span
        style={{
          width: '1.125rem',
          height: '0.125rem',
          borderRadius: '1px',
          backgroundColor: 'white',
        }}
      />
      <span
        style={{
          width: '1.5rem',
          height: '0.125rem',
          borderRadius: '1px',
          backgroundColor: 'white',
        }}
      />
    </div>
  </ActionButton>
);

export const WithImage = (): JSX.Element => (
  <ActionButton image={fwdLogo} onClick={mockClick} />
);
