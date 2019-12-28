import React, { FunctionComponent, MouseEvent, useState } from 'react';
import classnames from 'classnames';

import { SelectOptionType } from '../../types';
import './Select.scss';

type SelectProps = {
  name: string;
  value: string;
  onClick: (option: SelectOptionType) => void;
  options?: SelectOptionType[];
  id?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
};

const Select: FunctionComponent<SelectProps> = ({
  name,
  value,
  onClick,
  options,
  id,
  label,
  placeholder,
  disabled,
  multiple,
}: SelectProps) => {
  const [areOptionsShown, toggleShowOptions] = useState(false);

  return (
    <div className="fd-select">
      {label && <span className="fd-label">{label}</span>}

      <div
        className={classnames({
          'fd-select__container': true,
          'fd-select__container-open': areOptionsShown,
        })}
        onClick={() => toggleShowOptions(!areOptionsShown)}
      >
        <div
          className={classnames({
            'fd-select__input': true,
            'fd-select__input-placeholder': !value,
          })}
        >
          {value || placeholder}
        </div>

        <i
          className={classnames({
            'material-icons': true,
            'fd-select__icon': true,
            'fd-select__icon-open': areOptionsShown,
          })}
        >
          keyboard_arrow_down
        </i>
      </div>

      <div
        className={classnames({
          'fd-select__options': true,
          'fd-select__options-open': areOptionsShown,
        })}
      >
        {options &&
          options.map(option => (
            <option
              onClick={() => {
                toggleShowOptions(false);
                onClick(option);
              }}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
      </div>
    </div>
  );
};

Select.defaultProps = {
  placeholder: 'Select a value...',
  options: [],
};

export default Select;
