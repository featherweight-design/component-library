import React, { FC, useEffect, useRef } from 'react';
import classnames from 'classnames';

import CircleLoader from 'components/Loaders/CircleLoader/CircleLoader';
import Icon from 'components/Icon/Icon';
import { InputProps } from 'types';
import './Input.scss';

const Input: FC<InputProps> = ({
  name,
  value,
  onChange,
  id,
  className,
  required,
  type,
  label,
  placeholder,
  disabled,
  icon,
  errorMessage,
  canHaveErrorMessage,
  min,
  max,
  loading,
  onBlur,
  onKeyDown,
  onKeyUp,
  dataId,
  initialFocus,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialFocus && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [initialFocus]);

  return (
    <div
      className={classnames({
        'uic-input': true,
        [className as string]: className,
      })}
    >
      {label && (
        <label
          className={classnames({
            'uic-input__label': true,
            'uic-input__label-required': required,
          })}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        ref={inputRef}
        className={classnames({
          'uic-input__field': true,
          'uic-input__field-error': errorMessage,
        })}
        required={required}
        data-id={dataId}
        aria-required={required}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        onChange={event => {
          event.preventDefault();
          onChange(event);
        }}
        onBlur={event => {
          if (onBlur) {
            event.preventDefault();
            onBlur(event);
          }
        }}
        onKeyDown={event => {
          if (onKeyDown) {
            event.preventDefault();
            onKeyDown(event);
          }
        }}
        onKeyUp={event => {
          if (onKeyUp) {
            event.preventDefault();
            onKeyUp(event);
          }
        }}
      />

      {icon && !loading && (
        <Icon
          className={classnames({
            'uic-input__icon': true,
            'uic-input__icon-lightning':
              !icon.designSystem || icon.designSystem === 'lightning',
            'uic-input__icon-with-label': label,
            [icon.className as string]: icon.className,
          })}
          icon={icon.icon}
          color={icon.color}
          designSystem={icon.designSystem}
          size={
            !icon.designSystem || icon.designSystem === 'lightning'
              ? '1.125rem'
              : '1.5rem'
          }
        />
      )}

      {loading && (
        <CircleLoader
          className="uic-input__loader"
          size="1.25rem"
          color="#0070d2"
        />
      )}

      {canHaveErrorMessage && (
        <p className="uic-input__error-message">{errorMessage}</p>
      )}
    </div>
  );
};

Input.defaultProps = {
  className: undefined,
  required: false,
  type: 'text',
  label: '',
  placeholder: '',
  errorMessage: '',
  canHaveErrorMessage: true,
  min: undefined,
  max: undefined,
  onBlur: undefined,
};

export default Input;
