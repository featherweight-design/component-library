import { FC } from 'react';
import classnames from 'classnames';

import { CircleLoader } from 'components/Loaders';
import { ButtonProps } from 'types';

const DEFAULT_SHAPE = 'rounded-square';
const DEFAULT_TYPE = 'button';

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  id,
  variant,
  name,
  className,
  disabled,
  loading,
  style,
  type = DEFAULT_TYPE,
  shape = DEFAULT_SHAPE,
}: ButtonProps) => (
  <button
    id={id}
    name={name}
    // Disabled here to allow for dynamic passing of "type"
    // eslint-disable-next-line react/button-has-type
    type={type}
    onClick={onClick}
    disabled={disabled}
    style={style}
    className={classnames({
      'fd-button': true,
      [`fd-button-${variant}`]: variant,
      'fd-button-loading': loading,
      [`fd-button-${shape}`]: shape,
      [className as string]: className,
    })}
  >
    {loading && (
      <div className="fd-button__loader-container">
        <CircleLoader size="2rem" />
      </div>
    )}
    <span className="fd-button__value">{children}</span>
  </button>
);

Button.defaultProps = {
  shape: DEFAULT_SHAPE,
  type: DEFAULT_TYPE,
};

export default Button;
