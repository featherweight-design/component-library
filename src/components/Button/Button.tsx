import React, { FunctionComponent, ReactChild } from 'react';
import classnames from 'classnames';

import { CircleLoader } from '../Loaders';

type ButtonProps = {
  children: string | number | ReactChild | ReactChild[];
  onClick: () => void;
  id?: string;
  type?: ButtonType;
  name?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

type ButtonType =
  | 'default-destructive'
  | 'brand'
  | 'neutral'
  | 'outline'
  | 'destructive'
  | 'outline-destructive';

const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  id,
  type,
  name,
  className,
  disabled,
  loading,
}: ButtonProps) => (
  <button
    id={id}
    name={name}
    onClick={onClick}
    disabled={disabled}
    className={classnames({
      'fd-button': true,
      [`fd-button-${type}`]: type,
      'fd-button-loading': loading,
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
