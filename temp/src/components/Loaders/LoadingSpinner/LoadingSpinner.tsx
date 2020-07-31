import React, { FC, useEffect, useState, ReactElement } from 'react';
import classnames from 'classnames';

import { LoadingSpinnerProps } from 'types';
import './LoadingSpinner.scss';

const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  className,
  size,
  type,
  delayMilliseconds,
}: LoadingSpinnerProps): ReactElement<LoadingSpinnerProps> | null => {
  const [isVisible, setVisible] = useState(delayMilliseconds === 0);

  useEffect(() => {
    if (delayMilliseconds && delayMilliseconds > 0) {
      const timeoutHandle = setTimeout(
        () => setVisible(true),
        delayMilliseconds
      );
      return () => clearTimeout(timeoutHandle);
    }
  });

  return isVisible ? (
    <div
      className={classnames({
        'uic-loader': true,
        [className as string]: className,
      })}
    >
      <div
        className={classnames({
          'uic-loader__image': true,
          [`uic-loader__image-${type}`]: true,
        })}
        style={{ width: `${size}`, height: `${size}` }}
      />
    </div>
  ) : null;
};

LoadingSpinner.defaultProps = {
  size: '100px',
  type: 'large',
  delayMilliseconds: 1000, // https://uxmovement.com/navigation/progress-bars-vs-spinners-when-to-use-which/
};

export default LoadingSpinner;
