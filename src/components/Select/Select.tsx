import React, {
  ReactChild,
  FunctionComponent,
  ChangeEvent,
  useState,
} from 'react';
import classnames from 'classnames';

import './Select.scss';

type SelectProps = {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  children?: ReactChild | ReactChild[];
  id?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
};

const Select: FunctionComponent<SelectProps> = ({
  name,
  value,
  onChange,
  children,
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
        className="fd-select__container"
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

        <i className="material-icons fd-select__dropdown-icon">
          keyboard_arrow_down
        </i>

        <select
          tabIndex={-1}
          aria-hidden
          value={value}
          onChange={onChange}
          style={{
            position: 'absolute',
            width: '0',
            border: 'none',
            opacity: 0,
            zIndex: -1,
          }}
        >
          <option value={value} />
        </select>
      </div>

      <div
        className={classnames({
          'fd-select__options': true,
          'fd-select__options-open': areOptionsShown,
        })}
        // onChange={onChange}
      >
        {children}
      </div>
    </div>
  );
};

Select.defaultProps = {
  placeholder: 'Select a value...',
};

export default Select;
