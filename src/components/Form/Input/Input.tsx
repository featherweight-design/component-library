import { useState, FC } from 'react';
import classnames from 'classnames';

import { InputProps } from 'types';
import Icon from 'components/Icon/Icon';
import { inputCopy } from 'shared/data/copyContent';

const DEFAULT_INPUT_TYPE = 'text';
const DEFAULT_INPUT_VARIANT = 'default';
const MINIMAL_VARIANT = 'minimal';

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
  variant = DEFAULT_INPUT_VARIANT,
}: InputProps) => {
  const [isPasswordShown, handleToggleShowPassword] = useState(false);
  const [isFocused, handleToggleFocus] = useState(false);

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
        [`fd-input__${variant}`]: true,
        [className as string]: className,
      })}
    >
      <label
        htmlFor={id || `fd-input__${name}`}
        className={classnames({
          'fd-label': true,
          'fd-input__minimal-label': variant === MINIMAL_VARIANT,
          'fd-input__minimal-label-top-aligned':
            variant === MINIMAL_VARIANT && (isFocused || value),
        })}
      >
        {label}
      </label>

      <input
        id={id || `fd-input__${name}`}
        name={name}
        value={value}
        type={getInputType()}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={(): void => handleToggleFocus(false)}
        onFocus={(): void => handleToggleFocus(true)}
        min={min}
        max={max}
        disabled={disabled}
        className={classnames({
          'fd-input__input': true,
          [`fd-input__${variant}-input`]: true,
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
  type: DEFAULT_INPUT_TYPE,
  placeholder: inputCopy.placeholder,
  variant: DEFAULT_INPUT_VARIANT,
};

export default Input;
