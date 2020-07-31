import React, { FC, ReactChild } from 'react';
import classnames from 'classnames';

import * as UtilityIcons from './Utility/Utility';
import { IconProps } from 'types';

type UtilityIcon = {
  [key: string]: ReactChild;
};

const Icon: FC<IconProps> = ({
  title,
  className,
  onClick,
  size,
  color,
  icon,
  id,
  designSystem,
  dataId,
}: IconProps) => {
  const path = (UtilityIcons as UtilityIcon)[icon];

  if (designSystem === 'lightning') {
    return (
      <svg
        id={id}
        viewBox="0 0 52 52"
        width={size}
        height={size}
        className={`uic-icon ${className}`}
        onClick={onClick}
        style={{
          minWidth: size,
          minHeight: size,
        }}
        data-id={dataId}
      >
        <title>{title}</title>
        <g fill={color}>{path}</g>
      </svg>
    );
  }

  return (
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
};

Icon.defaultProps = {
  className: '',
  size: '24px',
  designSystem: 'lightning',
  color: 'currentColor',
};

export default Icon;
