import React, { useState } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import DeleteConfirmationDrawer from './DeleteConfirmationDrawer';
import { Button } from 'components/Buttons';

export default {
  title: 'Components/DeleteConfirmationDrawer',
  decorators: [withA11y],
};

export const DefaultFromTheRight = (): JSX.Element => {
  const [isDeleteConfirmationShown, toggleDeleteConfirmation] = useState(false);

  return (
    <div className="story__delete-confirmation-container">
      <Button
        type="neutral"
        onClick={() => toggleDeleteConfirmation(!isDeleteConfirmationShown)}
      >
        Show Delete Confirmation
      </Button>

      <DeleteConfirmationDrawer
        isShown={isDeleteConfirmationShown}
        onCancel={() => toggleDeleteConfirmation(false)}
        onConfirm={() => toggleDeleteConfirmation(false)}
      />
    </div>
  );
};

export const FromTheBottom = (): JSX.Element => {
  const [isDeleteConfirmationShown, toggleDeleteConfirmation] = useState(false);

  return (
    <div className="story__delete-confirmation-container">
      <Button
        type="neutral"
        onClick={() => toggleDeleteConfirmation(!isDeleteConfirmationShown)}
      >
        Show Delete Confirmation
      </Button>

      <DeleteConfirmationDrawer
        origin="bottom"
        isShown={isDeleteConfirmationShown}
        onCancel={() => toggleDeleteConfirmation(false)}
        onConfirm={() => toggleDeleteConfirmation(false)}
      />
    </div>
  );
};

export const FromTheLeft = (): JSX.Element => {
  const [isDeleteConfirmationShown, toggleDeleteConfirmation] = useState(false);

  return (
    <div className="story__delete-confirmation-container">
      <Button
        type="neutral"
        onClick={() => toggleDeleteConfirmation(!isDeleteConfirmationShown)}
      >
        Show Delete Confirmation
      </Button>

      <DeleteConfirmationDrawer
        origin="left"
        isShown={isDeleteConfirmationShown}
        onCancel={() => toggleDeleteConfirmation(false)}
        onConfirm={() => toggleDeleteConfirmation(false)}
      />
    </div>
  );
};

export const FromTheTop = (): JSX.Element => {
  const [isDeleteConfirmationShown, toggleDeleteConfirmation] = useState(false);

  return (
    <div className="story__delete-confirmation-container">
      <Button
        type="neutral"
        onClick={() => toggleDeleteConfirmation(!isDeleteConfirmationShown)}
      >
        Show Delete Confirmation
      </Button>

      <DeleteConfirmationDrawer
        origin="top"
        isShown={isDeleteConfirmationShown}
        onCancel={() => toggleDeleteConfirmation(false)}
        onConfirm={() => toggleDeleteConfirmation(false)}
      />
    </div>
  );
};
