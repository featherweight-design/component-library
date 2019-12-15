import React from 'react';

type ButtonProps = {
  value: string | number;
}

const Button = ({ value }: ButtonProps) => (
  <button>{value}</button>
)

export default Button;
