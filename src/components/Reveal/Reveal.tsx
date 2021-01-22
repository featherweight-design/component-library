import { FC } from 'react';
import classnames from 'classnames';

import { RevealProps } from 'types';

const Reveal: FC<RevealProps> = ({
  children,
  className,
  isShown,
  padding,
}: RevealProps) => (
  <div
    className={classnames({
      'fd-reveal': true,
      'fd-reveal-shown': isShown,
      [className as string]: className,
    })}
  >
    <div
      className={classnames({
        'fd-reveal__drawer': true,
        'fd-reveal__drawer-shown': isShown,
      })}
      style={{ padding: padding && !isShown ? padding : 'unset' }}
    />
    <div
      className={classnames({
        'fd-reveal__cover': true,
        'fd-reveal__cover-shown': isShown,
      })}
    />
    {children}
  </div>
);

export default Reveal;
