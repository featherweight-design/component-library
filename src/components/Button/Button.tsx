import React, { ReactChild } from 'react';

import './Button.scss';

type ButtonProps = {
  children: string | number | ReactChild | ReactChild[];
}

const Button = ({ children }: ButtonProps) => (
  <button className="fd-button">
    {children}
  </button>
)

export default Button;
