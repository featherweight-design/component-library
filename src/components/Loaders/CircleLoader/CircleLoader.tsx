import React from 'react';

import './CircleLoader.scss';

type CircleLoaderProps = {
  size?: string | number;
  color?: string;
}

const CircleLoader = ({ size, color }: CircleLoaderProps) => {
  const wrapperStyles = {
    height: `${size}px`,
    width: `${size}px`,
  };

  return (
    <div className="circle-loader" style={wrapperStyles}>
      <div className="circle-loader__container">
        <svg className="circle-loader__svg" viewBox=" 25 25 50 50">
          <circle
            className="circle-loader__path"
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
  size: '100',
  color: '#004366',
};
