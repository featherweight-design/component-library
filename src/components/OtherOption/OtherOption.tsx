import React, { FunctionComponent } from 'react';
import classnames from 'classnames';

import { OtherOptionType } from '../../types';
import './OtherOption.scss';

type OtherOptionProps = OtherOptionType & {
  name: string;
  selected: boolean;
};

const OtherOption: FunctionComponent<OtherOptionProps> = ({
  onChange,
  value,
  name,
  selected,
}: OtherOptionProps) => (
  <div className="fd-other-option">
    <input
      className="fd-other-option__input"
      type="text"
      name={name}
      onChange={onChange}
      value={value}
    />
    <span
      className={classnames({
        'fd-other-option__underline': true,
        'fd-other-option__underline-selected': selected,
      })}
    />
  </div>
);

export default OtherOption;
