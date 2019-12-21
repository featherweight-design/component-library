import React, { ReactChild } from 'react';
import classnames from 'classnames';

import { CircleLoader } from '../Loaders';
import './Button.scss';

type ButtonProps = {
  children: string | number | ReactChild | ReactChild[];
  type?: ButtonType;
  name?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

type ButtonType = 'default-destructive' | 'brand' | 'neutral' | 'outline' | 'destructive' | 'outline-destructive';

const Button = ({ children, type, name, className, disabled, loading }: ButtonProps) => (
  <button disabled={disabled} name={name} className={classnames({
    'fd-button': true,
    [`fd-button-${type}`]: type,
    'fd-button-loading': loading,
    [className as string]: className
  })}>
    {loading && <div className="fd-button__loader-container">
    <CircleLoader size="2rem"/>
      </div>}
    <span className="fd-button__value">{children}</span>
  </button>
)

export default Button;
