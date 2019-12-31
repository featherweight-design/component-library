import React, { ChangeEvent, FunctionComponent } from 'react';
import classnames from 'classnames';

import './Checkbox.scss';

type CheckboxProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  options: CheckboxOption[];
};

type CheckboxOption = {
  checked: boolean;
  label: string;
  disabled?: boolean;
};

const Checkbox: FunctionComponent<CheckboxProps> = ({
  onChange,
  options,
}: CheckboxProps) => (
  <div className="fd-checkbox">
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
      </label>
    ))}
  </div>
);

export default Checkbox;
