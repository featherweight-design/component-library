import { AddOnResizeListenerArgs } from 'types';
import {
  DEFAULT_MOBILE_BREAKPOINT,
  DEFAULT_TABLET_BREAKPOINT,
} from './defaults';

const addOnResizeListener = ({
  deviceSize,
  updateDeviceSize,
}: AddOnResizeListenerArgs): (() => void) => {
  const onResizeListener = () => {
    const { clientWidth } = window.document.body;

    if (
      clientWidth <= DEFAULT_MOBILE_BREAKPOINT &&
      deviceSize !== 'small-mobile'
    ) {
      updateDeviceSize('small-mobile');
    }

    if (
      clientWidth <= DEFAULT_TABLET_BREAKPOINT &&
      clientWidth > DEFAULT_MOBILE_BREAKPOINT &&
      deviceSize !== 'mobile'
    ) {
      updateDeviceSize('mobile');
    }

    if (clientWidth >= DEFAULT_TABLET_BREAKPOINT && deviceSize !== 'tablet') {
      updateDeviceSize('tablet');
    }
  };

  window.addEventListener('resize', onResizeListener);

  return onResizeListener;
};

export default addOnResizeListener;
