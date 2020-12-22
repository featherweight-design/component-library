import React, { FC, ReactElement } from 'react';
import classnames from 'classnames';

import { ActionButtonProps } from 'types';
import Icon from 'components/Icon/Icon';
import CircleLoader from 'components/Loaders/CircleLoader/CircleLoader';

const DEFAULT_SIZE = 'medium';
const DEFAULT_VARIANT = 'primary';

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
  disabled = false,
  label,
  id,
  image,
  loading = false,
  size = DEFAULT_SIZE,
  variant = DEFAULT_VARIANT,
  type,
}: ActionButtonProps): ReactElement => (
  <div
    id={id}
    className={classnames({
      'fd-action-button': true,
      [`fd-action-button-${variant}`]: true,
      [className as string]: className,
    })}
  >
    <button
      type={type}
      className={classnames({
        'fd-action-button__button': true,
        [`fd-action-button__button-${variant}`]: true,
        [`fd-action-button__button-${size}`]: true,
        'fd-action-button__button-loading': loading,
        'fd-action-button__button-has-image': image,
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
        <div className="fd-action-button__loader-container">
          <CircleLoader size="1.5rem" />
        </div>
      )}

      {!loading && icon && (
        <Icon
          className="fd-action-button__icon"
          icon={icon}
          size={SIZES_ENUM[size]}
        />
      )}
    </button>

    {label && <p className="fd-action-button__label">{label}</p>}
  </div>
);

ActionButton.defaultProps = {
  disabled: false,
  loading: false,
  size: DEFAULT_SIZE,
  variant: DEFAULT_VARIANT,
};

export default ActionButton;
