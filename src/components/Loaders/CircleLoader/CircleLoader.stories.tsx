import * as React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import CircleLoader from './CircleLoader';

storiesOf('Loaders/Circle Loader', module)
  .addDecorator(checkA11y)
  .add('Default', () => <CircleLoader />)
  .add('Custom color', () => <CircleLoader color="magenta" />)
  .add('Custom size', () => <CircleLoader size="250" />);
