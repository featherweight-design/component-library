import React, { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import TextArea from './TextArea';

storiesOf('TextArea', module)
  .addDecorator(withA11y)
  .add('Default', () => {
    const [value, updateValue] = useState('');

    const handleChange = ({
      target: { value },
    }: ChangeEvent<HTMLTextAreaElement>): void => updateValue(value);

    return <TextArea name="default" value={value} onChange={handleChange} />;
  });
