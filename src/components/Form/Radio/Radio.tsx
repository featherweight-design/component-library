import React, { FunctionComponent, ChangeEvent } from 'react';
import classnames from 'classnames';

import OtherOption from '../OtherOption/OtherOption';
import { OtherOptionType } from 'types';

type RadioProps = {
  options: string[];
  selected: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  other?: OtherOptionType;
  disabled?: boolean;
  className?: string;
  errorMessage?: string;
};

const Radio: FunctionComponent<RadioProps> = ({
  options,
  selected,
  onChange,
  label,
  other,
  disabled,
  className,
  errorMessage,
}: RadioProps) => (
  <div
    className={classnames({
      'fd-radio': true,
      [className as string]: className,
    })}
  >
    {label && <span className="fd-label">{label}</span>}

    <div
      className={classnames({
        'fd-radio__inputs-container': true,
        'fd-radio__inputs-container-error': errorMessage,
      })}
    >
      {options.map(option => (
        <label key={option} className="fd-radio__container">
          <input
            type="radio"
            className={classnames({
              'fd-radio__input': true,
            })}
            name={option}
            onChange={onChange}
            checked={option === selected}
            disabled={disabled}
          />
          <div
            className={classnames({
              'fd-radio__styled': true,
              'fd-radio__styled-disabled': disabled,
            })}
          >
            {option}
          </div>
          {option.toLowerCase() === 'other' && other && (
            <OtherOption
              name={option}
              value={other.value}
              selected={option === selected}
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

Radio.defaultProps = {
  label: undefined,
};

export default Radio;
