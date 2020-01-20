import React, { FunctionComponent } from 'react';
import classnames from 'classnames';

type CircleLoaderProps = {
  size?: string | number;
  color?: string;
  className?: string;
};

const CircleLoader: FunctionComponent<CircleLoaderProps> = ({
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
        'fd-circle-loader': true,
        [className as string]: className,
      })}
      style={wrapperStyles}
    >
      <div className="fd-circle-loader__container">
        <svg className="fd-circle-loader__svg" viewBox=" 25 25 50 50">
          <circle
            className="fd-circle-loader__path"
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
