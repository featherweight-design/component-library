import React, { FC } from 'react';
import classnames from 'classnames';

import { CircleLoader } from 'components/Loaders';
import { ButtonProps } from 'types';

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  id,
  variant,
  name,
  className,
  disabled,
  loading,
  type,
  shape,
}: ButtonProps) => (
  <button
    id={id}
    name={name}
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={classnames({
      'fd-button': true,
      [`fd-button-${variant}`]: variant,
      'fd-button-loading': loading,
      [`fd-button-${shape}`]: shape,
      [className as string]: className,
    })}
  >
    {loading && (
      <div className="fd-button__loader-container">
        <CircleLoader size="2rem" />
      </div>
    )}
    <span className="fd-button__value">{children}</span>
  </button>
);

export default Button;
