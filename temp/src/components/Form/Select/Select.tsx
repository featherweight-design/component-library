import React, { FC, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { SelectProps } from 'types';
import CircleLoader from 'components/Loaders/CircleLoader/CircleLoader';
import './Select.scss';

const Select: FC<SelectProps> = ({
  name,
  value,
  children,
  onChange,
  id,
  className,
  required,
  label,
  placeholder,
  loading,
  multiple,
  errorMessage,
  disabled,
  dataId,
  initialFocus,
}: SelectProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (initialFocus && selectRef && selectRef.current) {
      selectRef.current.focus();
    }
  }, []);

  return (
    <div className="uic-select">
      {label && (
        <label
          className={classnames({
            'uic-input__label': true,
            'uic-input__label-required': required,
            [className as string]: className,
          })}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <select
        id={id}
        ref={selectRef}
        className={classnames({
          'uic-select__field': true,
          'uic-select__field-multiple': multiple,
          'uic-select__field-error': errorMessage,
          'uic-select__field-loading': loading,
        })}
        required={required}
        aria-required={required}
        multiple={multiple}
        name={name}
        value={value}
        disabled={disabled}
        data-id={dataId}
        onChange={event => {
          event.preventDefault();
          onChange(event);
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>

      {loading && (
        <CircleLoader
          className="uic-input__loader"
          size="1.25rem"
          color="#0070d2"
        />
      )}

      <p className="uic-select__error-message">{errorMessage}</p>
    </div>
  );
};

Select.defaultProps = {
  className: undefined,
  required: false,
  label: '',
  placeholder: '',
  multiple: false,
  errorMessage: '',
  disabled: false,
};

export default Select;
