import { FC } from 'react';
import classnames from 'classnames';

import { IconProps } from 'types';

const Icon: FC<IconProps> = ({
  className,
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
      'fd-icon': true,
      [className as string]: className,
    })}
    data-id={dataId}
    style={{
      fontSize: size,
      color,
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
