import { AddArrowControlListenerArgs } from 'types';
import { UP_CODE, KEYDOWN_TYPE_EVENT, DOWN_CODE } from './defaults';

const addArrowControlListener = ({
  boundingElement,
  onLeftKeyDown,
  onRightKeyDown,
}: AddArrowControlListenerArgs): ((event: KeyboardEvent) => void) => {
  const arrowKeyListener = ({ code }: KeyboardEvent) => {
    if (code === UP_CODE) {
      onLeftKeyDown();
    }

    if (code === DOWN_CODE) {
      onRightKeyDown();
    }
  };

  boundingElement.addEventListener(KEYDOWN_TYPE_EVENT, arrowKeyListener);

  return arrowKeyListener;
};

export default addArrowControlListener;
