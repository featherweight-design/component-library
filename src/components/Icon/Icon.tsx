import React, { FC, ReactChild } from 'react';
import classnames from 'classnames';

import { IconProps } from 'types';

type UtilityIcon = {
  [key: string]: ReactChild;
};

const Icon: FC<IconProps> = ({
  className,
  onClick,
  size,
  color,
  icon,
  id,
  dataId,
}: IconProps) => (
  <i
    id={id}
    className={classnames({
      'material-icons': true,
      'uic-icon': true,
      [className as string]: className,
    })}
    onClick={onClick}
    data-id={dataId}
    style={{
      fontSize: size,
      color: color,
    }}
  >
    {icon}
  </i>
);

Icon.defaultProps = {
  className: '',
  size: '24px',
  color: 'currentColor',
};

export default Icon;
