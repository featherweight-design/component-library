import React, { FunctionComponent, ChangeEvent } from 'react';
import classnames from 'classnames';

import Label from '../Label/Label';
import OtherOption from '../OtherOption/OtherOption';
import { OtherOptionType } from '../../types';

type RadioProps = {
  options: string[];
  selected: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  other?: OtherOptionType;
  disabled?: boolean;
};

const Radio: FunctionComponent<RadioProps> = ({
  options,
  selected,
  onChange,
  label,
  other,
  disabled,
}: RadioProps) => (
  <div className="fd-radio">
    {label && <Label label={label} />}

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
);

Radio.defaultProps = {
  label: undefined,
};

export default Radio;
