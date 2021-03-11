import { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import { textareaCopy } from 'shared/data/copyContent';
import TextArea from './TextArea';

export default {
  title: 'Components/Form/TextArea',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => {
  const [value, updateValue] = useState('');

  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>): void =>
    updateValue(target.value);

  return (
    <TextArea
      name="default"
      label={textareaCopy.default}
      value={value}
      onChange={handleChange}
    />
  );
};

export const Disabled = (): JSX.Element => {
  const [value, updateValue] = useState(textareaCopy.disabledMessage);

  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>): void =>
    updateValue(target.value);

  return (
    <TextArea
      disabled
      name="disabled"
      label={textareaCopy.disabled}
      value={value}
      onChange={handleChange}
    />
  );
};

export const Error = (): JSX.Element => {
  const [value, updateValue] = useState('');

  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>): void =>
    updateValue(target.value);

  return (
    <TextArea
      name="default"
      label={textareaCopy.pirateLore}
      placeholder={textareaCopy.placeholder}
      value={value}
      onChange={handleChange}
      errorMessage={value ? '' : textareaCopy.errorMessage}
    />
  );
};
