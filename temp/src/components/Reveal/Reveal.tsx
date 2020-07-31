import React, { FC } from 'react';
import classnames from 'classnames';

import { RevealProps } from 'types';

import './Reveal.scss';

const Reveal: FC<RevealProps> = ({
  children,
  className,
  isShown,
}: RevealProps) => {
  return (
    <div
      className={classnames({
        'uic-reveal': true,
        'uic-reveal-shown': isShown,
        [className as string]: className,
      })}
    >
      <div
        className={classnames({
          'uic-reveal__drawer': true,
          'uic-reveal__drawer-shown': isShown,
        })}
      />
      <div
        className={classnames({
          'uic-reveal__cover': true,
          'uic-reveal__cover-shown': isShown,
        })}
      />
      {children}
    </div>
  );
};

export default Reveal;
