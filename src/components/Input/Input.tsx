import React, { FunctionComponent, ChangeEvent } from 'react';
import classnames from 'classnames';

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
  className?: string;
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
  className,
}: InputProps) => (
  <div
    className={classnames({
      'fd-input': true,
      [className as string]: className,
    })}
  >
    {label && <span className="fd-label">{label}</span>}
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
