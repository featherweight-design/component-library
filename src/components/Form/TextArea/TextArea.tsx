import { FC } from 'react';
import classnames from 'classnames';

import { TextAreaProps } from 'types';

const TextArea: FC<TextAreaProps> = ({
  name,
  value,
  onChange,
  id,
  label,
  placeholder,
  min,
  max,
  disabled,
  className,
  errorMessage,
}: TextAreaProps) => (
  <div
    className={classnames({
      'fd-textarea': true,
      [className as string]: className,
    })}
  >
    <label className="fd-label" htmlFor={id || `fd-textarea__${name}`}>
      {label}
    </label>

    <textarea
      id={id || `fd-textarea__${name}`}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      minLength={min}
      maxLength={max}
      disabled={disabled}
      className={classnames({
        'fd-textarea__input': true,
        'fd-textarea__input-error': errorMessage,
      })}
    />

    <p className="fd-input-error">{errorMessage}</p>
  </div>
);

TextArea.defaultProps = {
  placeholder: 'Enter a value...',
};

export default TextArea;
