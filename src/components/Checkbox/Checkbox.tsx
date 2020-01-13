import React, { ChangeEvent, FunctionComponent } from 'react';
import classnames from 'classnames';

import { OtherOptionType } from '../../types';
import './Checkbox.scss';

type CheckboxProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  options: CheckboxOption[];
  label?: string;
  other?: OtherOptionType;
};

type CheckboxOption = {
  checked: boolean;
  label: string;
  disabled?: boolean;
};

const Checkbox: FunctionComponent<CheckboxProps> = ({
  onChange,
  options,
  label,
  other,
}: CheckboxProps) => (
  <div className="fd-checkbox">
    {label && <span className="fd-label">{label}</span>}

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
          <div className="fd-checkbox__other-container">
            <input
              className="fd-checkbox__other-input"
              type="text"
              name={label}
              onChange={other.onChange}
              value={other.value}
            />
            <span
              className={classnames({
                'fd-checkbox__other-underline': true,
                'fd-checkbox__other-underline-selected': checked,
              })}
            />
          </div>
        )}
      </label>
    ))}
  </div>
);

Checkbox.defaultProps = {
  label: undefined,
};

export default Checkbox;
