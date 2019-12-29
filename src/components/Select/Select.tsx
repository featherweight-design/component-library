import React, { FunctionComponent, useState } from 'react';
import classnames from 'classnames';

import { SelectOptionType } from '../../types';
import './Select.scss';

type SelectProps = {
  onClick: (option: SelectOptionType) => void;
  selected?: SelectOptionType;
  options?: SelectOptionType[];
  id?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
};

const Select: FunctionComponent<SelectProps> = ({
  selected,
  onClick,
  options,
  id,
  label,
  placeholder,
  disabled,
}: SelectProps) => {
  const [areOptionsShown, toggleShowOptions] = useState(false);

  return (
    <div id={id} className="fd-select">
      {label && <span className="fd-label">{label}</span>}

      <div
        className={classnames({
          'fd-select__container': true,
          'fd-select__container-open': areOptionsShown,
          'fd-select__container-disabled': disabled,
        })}
        onClick={(): void => {
          if (!disabled) {
            toggleShowOptions(!areOptionsShown);
          }
        }}
      >
        <div
          className={classnames({
            'fd-select__input': true,
            'fd-select__input-placeholder': !selected,
            'fd-select__input-disabled': disabled,
          })}
        >
          {(selected && selected.label) || placeholder}
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
          'fd-select__options-container': true,
          'fd-select__options-container-open': areOptionsShown,
        })}
      >
        {options &&
          options.map(option => (
            <option
              key={`${option.value}__${option.label}`}
              className={classnames({
                'fd-select__option': true,
                'fd-select__option-selected': selected?.value === option.value,
              })}
              onClick={(): void => {
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
