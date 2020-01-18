import React, { FunctionComponent } from 'react';
import classnames from 'classnames';

import { OtherOptionType } from '../../types';
import './OtherOption.scss';

type OtherOptionProps = OtherOptionType & {
  name: string;
  selected: boolean;
  disabled?: boolean;
};

const OtherOption: FunctionComponent<OtherOptionProps> = ({
  onChange,
  value,
  name,
  selected,
  disabled,
}: OtherOptionProps) => (
  <>
    :
    <div className="fd-other-option">
      <input
        className="fd-other-option__input"
        type="text"
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
      <span
        className={classnames({
          'fd-other-option__underline': true,
          'fd-other-option__underline-selected': selected,
          'fd-other-option__underline-disabled': disabled,
        })}
      />
    </div>
  </>
);

export default OtherOption;
