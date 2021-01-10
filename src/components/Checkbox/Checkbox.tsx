import React, { FC } from 'react';
import classnames from 'classnames';

import OtherOption from '../OtherOption/OtherOption';
import { CheckboxProps } from '../../types';

const Checkbox: FC<CheckboxProps> = ({
  onChange,
  options,
  label,
  other,
  className,
  errorMessage,
}: CheckboxProps) => (
  <div
    className={classnames({
      'fd-checkbox': true,
      [className as string]: className,
    })}
  >
    {label && <span className="fd-label">{label}</span>}

    <div
      className={classnames({
        'fd-checkbox__inputs-container': true,
        'fd-checkbox__inputs-container-error': errorMessage,
      })}
    >
      {options.map(({ label, checked, disabled }) => (
        <label
          key={`fd-checkbox__${label}`}
          className={classnames({
            'fd-checkbox__container': true,
            'fd-checkbox__container-disabled': disabled,
          })}
        >
          <input
            className="fd-checkbox__input"
            type="checkbox"
            name={label}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
          />
          <div
            className={classnames({
              'fd-checkbox__styled': true,
              'fd-checkbox__styled-checked': checked,
              'fd-checkbox__styled-disabled': disabled,
            })}
          >
            {checked && <div className="fd-checkbox__icon" />}
          </div>
          <span>{label}</span>

          {label.toLowerCase() === 'other' && other && (
            <OtherOption
              name={label}
              value={other.value}
              selected={checked}
              onChange={other.onChange}
              disabled={disabled}
            />
          )}
        </label>
      ))}
    </div>

    <p className="fd-input-error">{errorMessage}</p>
  </div>
);

Checkbox.defaultProps = {
  label: undefined,
};

export default Checkbox;
