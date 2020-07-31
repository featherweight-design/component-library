import React, { FC, ChangeEvent, useState } from 'react';
import classnames from 'classnames';

import Input from 'components/Form/Input/Input';
import { AutoSuggestProps } from 'types';
import './AutoSuggest.scss';

const DONE_TYPING_DELAY = 500;

const AutoSuggest: FC<AutoSuggestProps> = ({
  name,
  value,
  onChange,
  className,
  required,
  type,
  label,
  placeholder,
  errorMessage,
  min,
  max,
  onBlur,
  onSearch,
  onSelectResult,
  suggestions,
  searchThreshold,
  loading,
}: AutoSuggestProps) => {
  const [typingTimer, setTypingTimer] = useState<number>(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    clearTimeout(typingTimer);

    setTypingTimer(
      window.setTimeout(() => handleSearch(value), DONE_TYPING_DELAY)
    );
    onChange(event);
  };

  const handleSearch = (searchValue: string) => {
    if (searchThreshold && searchValue.length >= searchThreshold) {
      onSearch(searchValue);
    }
  };

  return (
    <div
      className={classnames({
        'uic-auto-suggest': true,
        [className as string]: className,
      })}
    >
      <Input
        className={classnames({
          'uic-auto-suggest__input': true,
          'uic-auto-suggest__input-with-suggestions': suggestions.length,
        })}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        type={type}
        label={label}
        placeholder={placeholder}
        errorMessage={errorMessage}
        min={min}
        max={max}
        loading={loading}
        onBlur={onBlur}
      />

      <div
        className={classnames({
          'uic-auto-suggest__suggestions-container': true,
          'uic-auto-suggest__suggestions-container-open': suggestions.length,
        })}
      >
        {suggestions.map(suggestion => (
          <span
            key={suggestion.value}
            className="uic-auto-suggest__suggestion"
            onClick={() => onSelectResult(suggestion)}
          >
            {suggestion.label}
          </span>
        ))}
      </div>
    </div>
  );
};

AutoSuggest.defaultProps = {
  className: undefined,
  required: false,
  type: 'text',
  label: '',
  placeholder: '',
  errorMessage: '',
  min: undefined,
  max: undefined,
  onBlur: undefined,
  searchThreshold: 3,
  loading: false,
};

export default AutoSuggest;
