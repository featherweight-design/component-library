import React, { FC, ReactElement } from 'react';
import classnames from 'classnames';

import { ActionButtonProps } from 'types';
import Icon from 'components/Icon/Icon';
import CircleLoader from 'components/Loaders/CircleLoader/CircleLoader';

import './ActionButton.scss';

const DEFAULT_DESIGN_SYSTEM = 'lightning';
const DEFAULT_SIZE = 'medium';
const DEFAULT_TYPE = 'primary';

const SIZES_ENUM = {
  'x-small': '1.125rem',
  small: '1.25rem',
  medium: '1.375rem', // 16px
  large: '1.5rem',
  'x-large': '1.625rem',
};

const ActionButton: FC<ActionButtonProps> = ({
  icon,
  onClick,
  className,
  dataId,
  designSystem = DEFAULT_DESIGN_SYSTEM,
  disabled = false,
  label,
  id,
  image,
  loading = false,
  size = DEFAULT_SIZE,
  type = DEFAULT_TYPE,
}: ActionButtonProps): ReactElement => (
  <div
    id={id}
    className={classnames({
      'uic-action-button': true,
      [`uic-action-button-${type}`]: true,
      [className as string]: className,
    })}
  >
    <button
      data-id={dataId}
      className={classnames({
        'uic-action-button__button': true,
        [`uic-action-button__button-${type}`]: true,
        [`uic-action-button__button-${size}`]: true,
        'uic-action-button__button-loading': loading,
        'uic-action-button__button-has-image': image,
      })}
      onClick={onClick}
      disabled={disabled}
      style={
        image
          ? {
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
            }
          : {}
      }
    >
      {loading && (
        <div className="uic-action-button__loader-container">
          <CircleLoader size="1.5rem" />
        </div>
      )}

      {!loading && icon && (
        <Icon
          className="uic-action-button__icon"
          icon={icon}
          designSystem={designSystem}
          size={SIZES_ENUM[size]}
        />
      )}
    </button>

    {label && <p className="uic-action-button__label">{label}</p>}
  </div>
);

ActionButton.defaultProps = {
  designSystem: DEFAULT_DESIGN_SYSTEM,
  disabled: false,
  type: DEFAULT_TYPE,
  loading: false,
  size: DEFAULT_SIZE,
};

export default ActionButton;
