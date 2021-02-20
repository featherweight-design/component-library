import { useState, FC } from 'react';
import classnames from 'classnames';

import Icon from 'components/Icon/Icon';
import { InputProps } from 'types';

const DEFAULT_INPUT_TYPE = 'text';

const Input: FC<InputProps> = ({
  name,
  value,
  onChange,
  id,
  type = DEFAULT_INPUT_TYPE,
  label,
  placeholder,
  min,
  max,
  disabled,
  className,
  errorMessage,
}: InputProps) => {
  const [isPasswordShown, handleToggleShowPassword] = useState(false);

  const getInputType = (): string => {
    if (type === 'password' && isPasswordShown) {
      return DEFAULT_INPUT_TYPE;
    }

    return type;
  };

  return (
    <div
      className={classnames({
        'fd-input': true,
        [className as string]: className,
      })}
    >
      {label && (
        <label
          htmlFor={id || `fd-input__${name}`}
          className={classnames(['fd-label', 'fd-input__label'])}
        >
          {label}
        </label>
      )}
      <input
        id={id || `fd-input__${name}`}
        name={name}
        value={value}
        type={getInputType()}
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

      {type === 'password' && (
        <button
          className="fd-input__password-button"
          type="button"
          onClick={(): void => handleToggleShowPassword(!isPasswordShown)}
        >
          <Icon icon={isPasswordShown ? 'visibility_off' : 'visibility'} />
        </button>
      )}

      <p className="fd-input-error">{errorMessage}</p>
    </div>
  );
};

Input.defaultProps = {
  id: '',
  type: 'text',
  placeholder: 'Enter a value...',
};

export default Input;
