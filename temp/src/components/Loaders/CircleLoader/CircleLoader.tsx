import React, { FC } from 'react';
import classnames from 'classnames';

import { CircleLoaderProps } from 'types';

import './CircleLoader.scss';

const CircleLoader: FC<CircleLoaderProps> = ({
  size,
  color,
  className,
}: CircleLoaderProps) => {
  const wrapperStyles = {
    height: `${size}`,
    width: `${size}`,
  };

  return (
    <div
      className={classnames({
        'uic-circle-loader': true,
        [className as string]: className,
      })}
      style={wrapperStyles}
    >
      <div className="uic-circle-loader__container">
        <svg className="uic-circle-loader__svg" viewBox=" 25 25 50 50">
          <circle
            className="uic-circle-loader__path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="3"
            strokeMiterlimit="10"
            stroke={color}
          />
        </svg>
      </div>
    </div>
  );
};

export default CircleLoader;

CircleLoader.defaultProps = {
  size: '100px',
  color: 'currentColor',
};
