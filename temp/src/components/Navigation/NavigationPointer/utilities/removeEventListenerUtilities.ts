import { MutableRefObject } from 'react';

import {
  KEYDOWN_TYPE_EVENT,
  KEYUP_TYPE_EVENT,
  SCROLL_TYPE_EVENT,
} from './defaults';

const removeScrollEventListener = (
  container: HTMLElement,
  scrollListenerFunction: () => void
): void =>
  container.removeEventListener(SCROLL_TYPE_EVENT, scrollListenerFunction);

const removeKeyDownEventListener = (
  container: HTMLElement,
  keyDownListenerFunction: (event: KeyboardEvent) => void
): void =>
  container.removeEventListener(KEYDOWN_TYPE_EVENT, keyDownListenerFunction);

const removeKeyUpListener = (
  container: HTMLElement,
  keyUpListenerFunction: (event: KeyboardEvent) => void
): void =>
  container.removeEventListener(KEYUP_TYPE_EVENT, keyUpListenerFunction);

const removeAllEventListeners = ({
  arrowKeyListenerRef,
  boundingElement,
  returnKeyListenerRef,
  scrollListenerRef,
  shiftDownKeyListenerRef,
  shiftUpKeyListenerRef,
  tabKeyListenerRef,
}: {
  arrowKeyListenerRef: MutableRefObject<
    ((event: KeyboardEvent) => void) | undefined
  >;
  boundingElement: HTMLElement;
  returnKeyListenerRef: MutableRefObject<
    ((event: KeyboardEvent) => void) | undefined
  >;
  scrollListenerRef: MutableRefObject<() => void>;
  shiftDownKeyListenerRef: MutableRefObject<
    ((event: KeyboardEvent) => void) | undefined
  >;
  shiftUpKeyListenerRef: MutableRefObject<
    ((event: KeyboardEvent) => void) | undefined
  >;
  tabKeyListenerRef: MutableRefObject<
    ((event: KeyboardEvent) => void) | undefined
  >;
}): void => {
  removeScrollEventListener(boundingElement, scrollListenerRef.current);

  if (arrowKeyListenerRef.current) {
    removeKeyDownEventListener(boundingElement, arrowKeyListenerRef.current);

    arrowKeyListenerRef.current = undefined;
  }

  if (tabKeyListenerRef.current) {
    removeKeyDownEventListener(boundingElement, tabKeyListenerRef.current);

    tabKeyListenerRef.current = undefined;
  }

  if (returnKeyListenerRef.current) {
    removeKeyDownEventListener(document.body, returnKeyListenerRef.current);

    returnKeyListenerRef.current = undefined;
  }

  if (shiftDownKeyListenerRef.current) {
    removeKeyDownEventListener(
      boundingElement,
      shiftDownKeyListenerRef.current
    );

    shiftDownKeyListenerRef.current = undefined;
  }

  if (shiftUpKeyListenerRef.current) {
    removeKeyUpListener(boundingElement, shiftUpKeyListenerRef.current);

    shiftUpKeyListenerRef.current = undefined;
  }
};

export {
  removeAllEventListeners,
  removeKeyDownEventListener,
  removeKeyUpListener,
  removeScrollEventListener,
};
