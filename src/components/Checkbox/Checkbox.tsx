import React, { ChangeEvent } from 'react';
import classnames from 'classnames';

import './Checkbox.scss';

type CheckboxProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  options: CheckboxOption[];
};

type CheckboxOption = {
  checked: boolean;
  label: string;
};

const Checkbox = ({ onChange, options }: CheckboxProps) => (
  <div className="fd-checkbox">
    {options.map(({ label, checked }) => (
      <label key={`fd-checkbox__${label}`} className="fd-checkbox__container">
        <input
          className="fd-checkbox__input"
          type="checkbox"
          name={label}
          checked={checked}
          onChange={onChange}
        />
        <div
          className={classnames({
            'fd-checkbox__styled': true,
            'fd-checkbox__styled-checked': checked,
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
