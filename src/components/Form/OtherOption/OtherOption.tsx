import { FC } from 'react';
import classnames from 'classnames';

import { OtherOptionType } from 'types';

type OtherOptionProps = OtherOptionType & {
  name: string;
  selected: boolean;
  disabled?: boolean;
};

const OTHER_INPUT_LABEL = 'Other Input';

const OtherOption: FC<OtherOptionProps> = ({
  onChange,
  value,
  name,
  selected,
  disabled,
}: OtherOptionProps) => (
  <div className="fd-other-option">
    <label
      className="fd-other-option__label"
      htmlFor={`fd-other-option__${name}`}
    >
      {OTHER_INPUT_LABEL}
    </label>

    <input
      id={`fd-other-option__${name}`}
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
);

OtherOption.defaultProps = {
  disabled: false,
};

export default OtherOption;
