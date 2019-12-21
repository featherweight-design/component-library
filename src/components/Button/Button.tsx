import React, { ReactChild } from 'react';
import classnames from 'classnames';

import './Button.scss';

type ButtonProps = {
  children: string | number | ReactChild | ReactChild[];
  type?: ButtonType;
  className?: string;
}

type ButtonType = 'default-destructive' | 'brand' | 'neutral' | 'outline' | 'destructive' | 'outline-destructive';

const Button = ({ children, type, className }: ButtonProps) => (
  <button className={classnames({
    'fd-button': true,
    [`fd-button-${type}`]: type,
    [className as string]: className
  })}>
    {children}
  </button>
)

export default Button;
