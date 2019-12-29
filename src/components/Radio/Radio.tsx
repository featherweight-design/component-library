import React, { FunctionComponent, ChangeEvent } from 'react';
import classnames from 'classnames';

import './Radio.scss';

type RadioProps = {
  options: string[];
  selected: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Radio: FunctionComponent<RadioProps> = ({
  options,
  selected,
  onChange,
}: RadioProps) => (
  <div className="fd-radio">
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

export default Radio;
