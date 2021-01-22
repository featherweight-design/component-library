import { FC } from 'react';
import classnames from 'classnames';

import { InputProps } from 'types';

const Input: FC<InputProps> = ({
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
  errorMessage,
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
        'fd-input__input-error': errorMessage,
      })}
    />

    <p className="fd-input-error">{errorMessage}</p>
  </div>
);

Input.defaultProps = {
  id: '',
  type: 'text',
  placeholder: 'Enter a value...',
};

export default Input;
