import React, { FC, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { TextAreaProps } from 'types';
import './TextArea.scss';

const TextArea: FC<TextAreaProps> = ({
  name,
  value,
  onChange,
  id,
  className,
  required,
  label,
  placeholder,
  disabled,
  errorMessage,
  dataId,
  min,
  max,
  initialFocus,
  minLengthMessage,
  maxLengthMessage,
}: TextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialFocus && textAreaRef && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  return (
    <div className="uic-textarea">
      {label && (
        <label
          className={classnames({
            'uic-textarea__label': true,
            'uic-textarea__label-required': required,
          })}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <textarea
        id={id}
        ref={textAreaRef}
        className={classnames({
          'uic-textarea__field': true,
          'uic-textarea__field-error': errorMessage,
          [className as string]: className,
        })}
        required={required}
        data-id={dataId}
        aria-required={required}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={event => {
          event.preventDefault();
          onChange(event);
        }}
        minLength={min}
        maxLength={max}
      />

      <div className="uic-textarea__message-container">
        <p className="uic-textarea__error-message">{errorMessage}</p>
        {min && value.length <= min && minLengthMessage && (
          <p className="uic-textarea__length-message">{minLengthMessage}</p>
        )}
        {max && value.length === max && maxLengthMessage && (
          <p className="uic-textarea__length-message">{maxLengthMessage}</p>
        )}
      </div>
    </div>
  );
};

TextArea.defaultProps = {
  required: false,
  label: '',
  placeholder: '',
  errorMessage: '',
};

export default TextArea;
