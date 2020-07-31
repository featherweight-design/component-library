import React, { FC, useEffect, useRef, ReactElement } from 'react';
import classnames from 'classnames';

import CircleLoader from 'components/Loaders/CircleLoader/CircleLoader';
import { ButtonProps } from 'types';
import './Button.scss';

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  id,
  className,
  type,
  dataId,
  disabled,
  loading,
  initialFocus,
}: ButtonProps): ReactElement<ButtonProps> => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (initialFocus && buttonRef && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);

  const buttonClassNames = classnames({
    'uic-button': true,
    'uic-button-loading': loading,
    [`uic-button-${type}`]: type,
    [className as string]: className,
  });

  return (
    <button
      id={id}
      ref={buttonRef}
      data-id={dataId}
      className={buttonClassNames}
      onClick={(event): void => {
        if (onClick && !loading) {
          onClick(event);
        }
      }}
      disabled={disabled}
      type="button"
    >
      {loading && (
        <div className="uic-button__loader-container">
          <CircleLoader size="1.5rem" />
        </div>
      )}

      <span className="uic-button__value">{children}</span>
    </button>
  );
};

Button.defaultProps = {
  type: 'default',
};

export default Button;
