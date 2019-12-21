import React, { ReactChild } from 'react';
import classnames from 'classnames';

import './Button.scss';

type ButtonProps = {
  children: string | number | ReactChild | ReactChild[];
  type?: ButtonType;
  name?: string;
  className?: string;
  disabled?: boolean;
}

type ButtonType = 'default-destructive' | 'brand' | 'neutral' | 'outline' | 'destructive' | 'outline-destructive';

const Button = ({ children, type, name, className, disabled }: ButtonProps) => (
  <button disabled={disabled} name={name} className={classnames({
    'fd-button': true,
    [`fd-button-${type}`]: type,
    [className as string]: className
  })}>
    {children}
  </button>
)

export default Button;
