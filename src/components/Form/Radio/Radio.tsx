import { FC } from 'react';
import classnames from 'classnames';

import { RadioProps } from 'types';
import OtherOption from '../OtherOption/OtherOption';

const Radio: FC<RadioProps> = ({
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
        <label key={option} htmlFor={option} className="fd-radio__container">
          <input
            id={option}
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
