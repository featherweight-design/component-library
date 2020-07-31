import { AddReturnControlListenerArgs } from 'types';
import { KEYDOWN_TYPE_EVENT, ENTER_CODE, NUMPAD_ENTER_CODE } from './defaults';

const addReturnControlListener = ({
  onReturnDown,
}: AddReturnControlListenerArgs): ((event: KeyboardEvent) => void) => {
  const returnKeyListener = ({ code }: KeyboardEvent) => {
    if (code === ENTER_CODE || code === NUMPAD_ENTER_CODE) {
      onReturnDown();
    }
  };

  document.body.addEventListener(KEYDOWN_TYPE_EVENT, returnKeyListener);

  return returnKeyListener;
};

export default addReturnControlListener;
