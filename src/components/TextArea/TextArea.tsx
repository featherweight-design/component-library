import React, { FunctionComponent, ChangeEvent } from 'react';
import classnames from 'classnames';

type TextAreaProps = {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  id?: string;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
  errorMessage?: string;
};

const TextArea: FunctionComponent<TextAreaProps> = ({
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
    {label && <span className="fd-label">{label}</span>}

    <textarea
      id={id}
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
