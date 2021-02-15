import { FC, ReactElement } from 'react';
import classnames from 'classnames';

import { ActionButtonProps } from 'types';
import Icon from 'components/Icon/Icon';
import CircleLoader from 'components/Loaders/CircleLoader/CircleLoader';

const DEFAULT_SHAPE = 'round';
const DEFAULT_SIZE = 'medium';
const DEFAULT_TYPE = 'button';
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
  children,
  className,
  disabled = false,
  label,
  id,
  image,
  loading = false,
  size = DEFAULT_SIZE,
  shape = DEFAULT_SHAPE,
  type = DEFAULT_TYPE,
  variant = DEFAULT_VARIANT,
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
      // Disabled here to allow for dynamic passing of "type"
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={classnames({
        'fd-action-button__button': true,
        [`fd-action-button__button-${shape}`]: true,
        [`fd-action-button__button-${size}`]: true,
        [`fd-action-button__button-${variant}`]: true,
        'fd-action-button__button-loading': loading,
        'fd-action-button__button-has-image': image,
      })}
      onClick={onClick}
      disabled={disabled}
      style={{
        fontSize: SIZES_ENUM[size],
        backgroundImage: image ? `url(${image})` : 'unset',
        backgroundSize: image ? `cover` : 'unset',
      }}
    >
      {loading && (
        <div className="fd-action-button__loader-container">
          <CircleLoader size="1.5rem" />
        </div>
      )}

      {!loading && !image && !children && icon && (
        <Icon className="fd-action-button__icon" icon={icon} />
      )}
      {children}
    </button>

    {label && <p className="fd-action-button__label">{label}</p>}
  </div>
);

ActionButton.defaultProps = {
  disabled: false,
  loading: false,
  shape: DEFAULT_SHAPE,
  size: DEFAULT_SIZE,
  variant: DEFAULT_VARIANT,
};

export default ActionButton;
