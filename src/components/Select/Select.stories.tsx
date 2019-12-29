import React, { useState } from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import Select from './Select';
import { SelectOptionType } from '../../types';

storiesOf('Select', module)
  .addDecorator(withA11y)
  .add('Default', () => {
    const [selected, handleSelectOption] = useState<
      SelectOptionType | undefined
    >(undefined);

    const mockOnClick = (option: SelectOptionType): void => {
      console.log({ option });
      handleSelectOption(option);
    };

    return (
      <div style={{ display: 'flex' }}>
        <Select
          label="Label"
          selected={selected}
          onClick={mockOnClick}
          options={[
            { value: 'huey', label: 'Huhu' },
            { value: 'juliana', label: 'Juju' },
            { value: 'torin', label: 'Tor-bear' },
            { value: 'juniper', label: 'Jean-june' },
          ]}
        />

        <Select
          disabled
          label="Disabled"
          selected={{
            value: 'disabled',
            label: 'Locked',
          }}
          onClick={mockOnClick}
          options={[
            { value: 'huey', label: 'Huhu' },
            { value: 'juliana', label: 'Juju' },
            { value: 'torin', label: 'Tor-bear' },
            { value: 'juniper', label: 'Jean-june' },
          ]}
        />
      </div>
    );
  });
