import React, { FC, ReactElement } from 'react';
import classnames from 'classnames';

import { Button } from 'components/Buttons';
import { DeleteConfirmationDrawerProps } from 'types';
import generateColorContrast from 'utilities/generateColorContrast';
import Text from 'text';

import './DeleteConfirmationDrawer.scss';

const DeleteConfirmationDrawer: FC<DeleteConfirmationDrawerProps> = ({
  className,
  isShown,
  onConfirm,
  onCancel,
  backgroundColor = '#454d54',
  origin = 'right',
  loading = false,
  dataId,
}: DeleteConfirmationDrawerProps): ReactElement<
  DeleteConfirmationDrawerProps
> => {
  const {
    deleteCancel,
    deleteConfirm,
    deleteConfirmPrompt,
  } = Text.deleteConfirmationDrawer;

  const color = generateColorContrast({ backgroundColor });

  return (
    <div
      className={classnames({
        'uic-delete-drawer': true,
        [`uic-delete-drawer__${origin}`]: true,
        [`uic-delete-drawer__${origin}-shown`]: isShown,
        [className as string]: className,
      })}
      style={{ backgroundColor, color }}
    >
      <p>{deleteConfirmPrompt}</p>

      <div className="uic-delete-drawer__confirmation-controls">
        <Button
          className="uic-delete-drawer__button"
          type="brand"
          onClick={event => {
            event.preventDefault();
            onConfirm();
          }}
          loading={loading}
          disabled={loading}
          dataId={`${dataId}-confirm`}
        >
          {deleteConfirm}
        </Button>

        <Button
          className="uic-delete-drawer__button"
          type="outline-brand"
          onClick={event => {
            event.preventDefault();
            onCancel();
          }}
          disabled={loading}
          dataId={`${dataId}-cancel`}
        >
          {deleteCancel}
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirmationDrawer;
