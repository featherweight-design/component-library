import { FC } from 'react';
import classnames from 'classnames';

import { IconProps } from 'types';

const Icon: FC<IconProps> = ({ className, color, icon, id }: IconProps) => (
  <i
    id={id}
    className={classnames({
      'material-icons': true,
      'fd-icon': true,
      [className as string]: className,
    })}
    style={{
      color,
    }}
  >
    {icon}
  </i>
);

Icon.defaultProps = {
  className: '',
  color: 'currentColor',
};

export default Icon;
