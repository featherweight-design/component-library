import { FC, useState, KeyboardEvent } from 'react';
import classnames from 'classnames';

import { SelectProps } from 'types';
import { keyboardKeyEnum } from 'shared/data/enums';

const Select: FC<SelectProps> = ({
  selected,
  onSelect,
  options,
  id,
  label,
  placeholder,
  disabled,
  className,
  errorMessage,
}: SelectProps) => {
  const [areOptionsShown, toggleShowOptions] = useState(false);

  return (
    <div
      id={id}
      className={classnames({
        'fd-select': true,
        [className as string]: className,
      })}
    >
      {label && <span className="fd-label">{label}</span>}

      <div
        role="listbox"
        tabIndex={0}
        className={classnames({
          'fd-select__container': true,
          'fd-select__container-open': areOptionsShown,
          'fd-select__container-disabled': disabled,
          'fd-select__container-error': errorMessage,
        })}
        onClick={(): void => {
          if (!disabled) {
            toggleShowOptions(!areOptionsShown);
          }
        }}
        onKeyDown={({ key }: KeyboardEvent<HTMLDivElement>): void => {
          if (key === keyboardKeyEnum.Enter) {
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

      <p className="fd-input-error">{errorMessage}</p>

      <div
        className={classnames({
          'fd-select__options-container': true,
          'fd-select__options-container-open': areOptionsShown,
          'fd-select__options-container-with-label': label,
          'fd-select__options-container-error': errorMessage,
        })}
      >
        {options &&
          options.map(option => (
            <option
              key={`${option.value}__${option.label}`}
              aria-selected={selected?.value === option.value}
              className={classnames({
                'fd-select__option': true,
                'fd-select__option-selected': selected?.value === option.value,
              })}
              onClick={(): void => {
                toggleShowOptions(false);
                onSelect(option);
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
