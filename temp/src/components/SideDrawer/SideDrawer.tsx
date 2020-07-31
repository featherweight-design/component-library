import React, { FC } from 'react';
import classnames from 'classnames';

import { SideDrawerProps } from 'types';

import './SideDrawer.scss';

const SideDrawer: FC<SideDrawerProps> = ({
  children,
  shown,
}: SideDrawerProps) => {
  return (
    <div
      className={classnames({
        'uic-side-drawer': true,
        'uic-side-drawer-shown': shown,
      })}
    >
      {children}
    </div>
  );
};

SideDrawer.defaultProps = {
  shown: true,
};

export default SideDrawer;
