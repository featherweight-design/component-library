import React, { useState, ChangeEvent } from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import Radio from './Radio';

storiesOf('Radio', module)
  .addDecorator(withA11y)
  .add('Default', () => {
    const [selected, handleChangeSelected] = useState('');
    console.log({ selected })

    return (
      <div style={{ display: 'flex' }}>
        <Radio
          selected={selected}
          options={['Torin', 'Juniper', 'Pooch', 'Luna']}
          onChange={event => {
            console.log(event.target);
            console.log(event.target.name);
            handleChangeSelected(event.target.name)
          }}
        />
      </div>
    );
  });
