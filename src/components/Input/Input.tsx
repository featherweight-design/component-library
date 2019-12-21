import React, { FunctionComponent, ChangeEvent, FormEvent } from 'react';
import classnames from 'classnames';

import './Input.scss';

type InputProps = {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
};

const Input: FunctionComponent<InputProps> = ({
  name,
  value,
  onChange,
  id,
  type,
  label,
  placeholder,
  min,
  max,
  disabled,
}: InputProps) => (
  <div
    className={classnames({
      'fd-input': true,
    })}
  >
    {label && <span className="fd-input__label">{label}</span>}
    <input
      id={id}
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      min={min}
      max={max}
      disabled={disabled}
      className={classnames({
        'fd-input__input': true,
      })}
    />
  </div>
);

Input.defaultProps = {
  id: '',
  type: 'text',
  placeholder: 'Enter a value...',
};

export default Input;
