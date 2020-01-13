import React, { FunctionComponent, ChangeEvent } from 'react';
import classnames from 'classnames';

import './Radio.scss';

type RadioProps = {
  options: string[];
  selected: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

const Radio: FunctionComponent<RadioProps> = ({
  options,
  selected,
  onChange,
  label,
}: RadioProps) => (
  <div className="fd-radio">
    {label && <span className="fd-label">{label}</span>}

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
        />
        <div className="fd-radio__styled">{option}</div>
      </label>
    ))}
  </div>
);

Radio.defaultProps = {
  label: undefined,
};

export default Radio;
