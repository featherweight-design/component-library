import React, { ReactElement } from 'react';
import { DemoButtonProps } from 'types';

import { CircleLoader } from 'components/Loaders';
import generateColorContrast from 'utilities/generateColorContrast';

import './DemoButton.scss';

const DemoButton = ({
  onClick,
  value,
  disabled,
  loading,
  backgroundColor = '#005583',
}: DemoButtonProps): ReactElement => {
  const color = generateColorContrast({ backgroundColor });
  console.log({ color });

  return (
    <button
      className="uic-demo-button"
      onClick={onClick}
      disabled={disabled || loading}
      style={{ backgroundColor, color }}
    >
      {loading ? (
        <div className="uic-demo-button__loading-container">
          <CircleLoader size="1rem" />
        </div>
      ) : (
        value
      )}
    </button>
  );
};

DemoButton.defaultProps = {
  disabled: false,
  loading: false,
  backgroundColor: '#005583',
};

export default DemoButton;
