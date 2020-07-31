import { AddTabControlListenerArgs } from 'types';
import {
  KEYDOWN_TYPE_EVENT,
  TAB_CODE,
  SHIFT_CODE_LEFT,
  SHIFT_CODE_RIGHT,
} from './defaults';

interface AddTabControlListenerReturn {
  tabListener: (event: KeyboardEvent) => void;
  shiftDownListener: (event: KeyboardEvent) => void;
  shiftUpListener: (event: KeyboardEvent) => void;
}

const addTabControlListener = ({
  boundingElement,
  onShiftTabDown,
  onTabDown,
  isShiftDownRef,
}: AddTabControlListenerArgs): AddTabControlListenerReturn => {
  const tabListener = (event: KeyboardEvent) => {
    const { code } = event;

    if (code === TAB_CODE) {
      event.preventDefault();

      if (isShiftDownRef.current) {
        onShiftTabDown();
      } else {
        onTabDown();
      }
    }
  };

  const shiftDownListener = ({ code }: KeyboardEvent) => {
    if (code === SHIFT_CODE_LEFT || code === SHIFT_CODE_RIGHT) {
      isShiftDownRef.current = true;
    }
  };

  const shiftUpListener = ({ code }: KeyboardEvent) => {
    if (code === SHIFT_CODE_LEFT || code === SHIFT_CODE_RIGHT) {
      isShiftDownRef.current = false;
    }
  };

  boundingElement.addEventListener(KEYDOWN_TYPE_EVENT, tabListener);
  boundingElement.addEventListener(KEYDOWN_TYPE_EVENT, shiftDownListener);
  boundingElement.addEventListener('keyup', shiftUpListener);

  return {
    tabListener,
    shiftDownListener,
    shiftUpListener,
  };
};

export default addTabControlListener;
