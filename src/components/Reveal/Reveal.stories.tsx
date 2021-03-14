import { useState } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import { Button } from 'components/Buttons';
import { revealCopy } from 'shared/data/copyContent';
import Reveal from './Reveal';

export default {
  title: 'Components/Reveal',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => {
  const [isShown, toggleReveal] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px',
      }}
    >
      <Button variant="brand" onClick={(): void => toggleReveal(!isShown)}>
        {revealCopy.toggleButtonText}
      </Button>

      <Reveal isShown={isShown} padding="5px">
        <Button
          variant="destructive"
          /* eslint-disable-next-line no-console */
          onClick={(): void => console.log('destroy!')}
        >
          {revealCopy.hiddenButtonText}
        </Button>
      </Reveal>
    </div>
  );
};

export const LargeReveal = (): JSX.Element => {
  const [isLargeShown, toggleLargeShown] = useState(false);

  return (
    <div>
      <div className="story__button-container">
        <Button
          variant="brand"
          onClick={(): void => toggleLargeShown(!isLargeShown)}
        >
          {revealCopy.toggleLargeButtonText}
        </Button>
      </div>

      <Reveal isShown={isLargeShown}>
        <img
          src="https://i.imgflip.com/ohrrn.jpg"
          alt={revealCopy.imageAltText}
        />
      </Reveal>
    </div>
  );
};
