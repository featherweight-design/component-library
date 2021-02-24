import { FC } from 'react';
import classnames from 'classnames';

import { CheckboxProps } from 'types';
import OtherOption from '../OtherOption/OtherOption';

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
      {options.map(({ label: optionLabel, checked, disabled }) => (
        <label
          key={`fd-checkbox__${optionLabel}`}
          htmlFor={optionLabel}
          className={classnames({
            'fd-checkbox__container': true,
            'fd-checkbox__container-disabled': disabled,
          })}
        >
          <input
            id={optionLabel}
            className="fd-checkbox__input"
            type="checkbox"
            name={optionLabel}
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
          <span>{optionLabel}</span>

          {optionLabel.toLowerCase() === 'other' && other && (
            <OtherOption
              name={optionLabel}
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
