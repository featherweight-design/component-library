import React, { ReactElement, FC, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import {
  HeightDifference,
  NavigationPointerProps,
  PointerStyles,
  PositionIndicatorEnum,
} from 'types';

import {
  DEFAULT_PADDING,
  DEFAULT_LANGUAGE,
  DEFAULT_LOCATION,
  DEFAULT_SCALE,
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_HEIGHT_DIFFERENCE,
  DEFAULT_TOP,
  THREE_SECONDS,
  POSITION_INDICATOR_ABOVE,
  POSITION_INDICATOR_BELOW,
  QUARTER_SECOND,
  SCROLL_TYPE_EVENT,
  addArrowControlListener,
  addReturnControlListener,
  addTabControlListener,
  getPointerHorizontalPosition,
  getScrollTimeout,
  getUpdatedStyles,
  getPositionIndicatorStyles,
  removeAllEventListeners,
  removeKeyDownEventListener,
  removeScrollEventListener,
  HALF_SECOND,
} from './utilities';

import congaLogo from 'scss/assets/conga-logo.svg';
import Icon from 'components/Icon/Icon';
import './NavigationPointer.scss';

const NavigationPointer: FC<NavigationPointerProps> = ({
  anchorId,
  boundingElement,
  targetElement,
  anchorIdCollection,
  onBack,
  onNext,
  areKeyboardControlsEnabled = true,
  areKeyboardHintsShown = true,
  areTabControlsEnabled = true,
  className,
  disabled = false,
  paddingFromTarget = DEFAULT_PADDING,
  language = DEFAULT_LANGUAGE,
  location = DEFAULT_LOCATION,
  scale = DEFAULT_SCALE,
  isShown = true,
  isComplete = false,
}: NavigationPointerProps): ReactElement => {
  const currentAnchorId = useRef(anchorId);
  const currentAnchorElement = useRef<Element>(boundingElement);
  const heightDifferenceRef = useRef<HeightDifference | undefined>(undefined);
  const isTransitioning = useRef<boolean>(false);
  const scrollListenerRef = useRef<() => void>(() => undefined);
  const isShiftDownRef = useRef(false);
  const arrowKeyListenerRef = useRef<
    ((event: KeyboardEvent) => void) | undefined
  >(undefined);
  const shiftDownKeyListenerRef = useRef<
    ((event: KeyboardEvent) => void) | undefined
  >(undefined);
  const shiftUpKeyListenerRef = useRef<
    ((event: KeyboardEvent) => void) | undefined
  >(undefined);
  const tabKeyListenerRef = useRef<
    ((event: KeyboardEvent) => void) | undefined
  >(undefined);
  const returnKeyListenerRef = useRef<
    ((event: KeyboardEvent) => void) | undefined
  >(undefined);

  const [shouldFocus, updateShouldFocus] = useState<boolean>(false);
  const [isKeyboardHelperShown, toggleKeyboardHelper] = useState<boolean>(
    false
  );
  const [positionIndicator, updatePositionIndicator] = useState<
    PositionIndicatorEnum
  >(false);
  const [pointerStyles, updatePointerStyles] = useState<PointerStyles>({
    width: `${DEFAULT_WIDTH}px`,
    height: `${DEFAULT_HEIGHT}px`,
    top: DEFAULT_TOP,
  });

  const isOnLeftSide = location === DEFAULT_LOCATION;

  const firstAnchorId = anchorIdCollection[0];
  const lastAnchorId = anchorIdCollection[anchorIdCollection.length - 1];
  const isAtFirstAnchor = anchorId === firstAnchorId;
  const isAtLastAnchor = anchorId === lastAnchorId;
  const isAtTerminalPosition = isAtFirstAnchor || isAtLastAnchor;

  const currentAnchorNumber = anchorIdCollection.indexOf(anchorId) + 1;
  const previousAnchorId =
    !isAtFirstAnchor &&
    anchorIdCollection[anchorIdCollection.indexOf(anchorId) - 1];
  const nextAnchorId =
    !isAtLastAnchor &&
    anchorIdCollection[anchorIdCollection.indexOf(anchorId) + 1];

  // Adds "pulse" focus when pointer is initially shown
  useEffect(() => {
    if (isShown && !anchorId) {
      updateShouldFocus(true);

      // Adds the initial "return" event listener to begin the navigation
      if (areKeyboardControlsEnabled) {
        const returnKeyListener = addReturnControlListener({
          onReturnDown: () => {
            if (!anchorId) {
              handleOnNext(firstAnchorId);
            }
          },
        });

        returnKeyListenerRef.current = returnKeyListener;
      }
    }
  }, [isShown]);

  useEffect(() => {
    if (anchorId) {
      // Adds event listeners to the boundingElement for arrow controls
      if (areKeyboardControlsEnabled) {
        if (arrowKeyListenerRef.current) {
          removeKeyDownEventListener(
            boundingElement,
            arrowKeyListenerRef.current
          );
        }

        const arrowKeyListener = addArrowControlListener({
          boundingElement,
          onLeftKeyDown: () => {
            if (previousAnchorId) {
              handleOnBack(previousAnchorId);
            }
          },
          onRightKeyDown: () => {
            if (nextAnchorId) {
              handleOnNext(nextAnchorId);
            }
          },
        });

        arrowKeyListenerRef.current = arrowKeyListener;

        if (areKeyboardHintsShown && isAtFirstAnchor) {
          setTimeout(() => toggleKeyboardHelper(true), QUARTER_SECOND);
          setTimeout(() => toggleKeyboardHelper(false), THREE_SECONDS);
        }
      }

      // Adds event listener to boundingElement for tab controls
      if (areTabControlsEnabled) {
        if (tabKeyListenerRef.current) {
          removeKeyDownEventListener(
            boundingElement,
            tabKeyListenerRef.current
          );
        }

        const {
          tabListener,
          shiftDownListener,
          shiftUpListener,
        } = addTabControlListener({
          boundingElement,
          onShiftTabDown: () => {
            if (previousAnchorId) {
              handleOnBack(previousAnchorId);
            }
          },
          onTabDown: () => {
            if (nextAnchorId) {
              handleOnNext(nextAnchorId);
            }
          },
          isShiftDownRef,
        });

        shiftDownKeyListenerRef.current = shiftDownListener;
        shiftUpKeyListenerRef.current = shiftUpListener;
        tabKeyListenerRef.current = tabListener;
      }

      // Measures and sets initial height difference if a "header/footer" or like elements are present
      if (!heightDifferenceRef.current) {
        const { bottom: bodyBottom } = document.body.getBoundingClientRect();
        const {
          bottom: boundingBottom,
          top: boundingTop,
        } = boundingElement.getBoundingClientRect();

        // Difference in height of body and bounding element (aka header height)
        const heightDifference = {
          top: boundingTop,
          bottom: bodyBottom - boundingBottom,
        };

        heightDifferenceRef.current = heightDifference;
      }

      // Remove event listeners when
      if (scrollListenerRef.current) {
        removeScrollEventListener(boundingElement, scrollListenerRef.current);
      }

      // Adds scroll listeners to the bounding element for rendering of position indicator
      const scrollListener = () => {
        const {
          bottom: pointerBottom,
          top: pointerTop,
        } = document
          .getElementsByClassName('uic-navigation-pointer')[0]
          .getBoundingClientRect();

        const { scrollHeight: bodyScrollHeight } = document.body;

        if (heightDifferenceRef.current) {
          const { top: boundingTop } = boundingElement.getBoundingClientRect();
          const { bottom: differenceBottom } = heightDifferenceRef.current;

          if (
            pointerBottom < boundingTop &&
            positionIndicator !== POSITION_INDICATOR_ABOVE &&
            !isTransitioning.current
          ) {
            // When to show an indicator "above"
            updatePositionIndicator('above');
          } else if (
            pointerTop > bodyScrollHeight - differenceBottom &&
            positionIndicator !== POSITION_INDICATOR_BELOW &&
            !isTransitioning.current
          ) {
            // When to show an indicator "below"
            updatePositionIndicator('below');
          } else {
            // Pointer is visible, so no indicator is necessary
            updatePositionIndicator(false);
          }
        }
      };

      // Removes the begin "return" listener, if it's present
      if (returnKeyListenerRef.current) {
        removeKeyDownEventListener(document.body, returnKeyListenerRef.current);

        returnKeyListenerRef.current = undefined;
      }

      scrollListenerRef.current = scrollListener;
      boundingElement.addEventListener(SCROLL_TYPE_EVENT, scrollListener);
    }

    // Removes any event listeners on unmount
    return () => {
      removeAllEventListeners({
        boundingElement,
        arrowKeyListenerRef,
        returnKeyListenerRef,
        scrollListenerRef,
        shiftDownKeyListenerRef,
        shiftUpKeyListenerRef,
        tabKeyListenerRef,
      });
    };
  }, [anchorId]);

  useEffect(() => {
    // Update horizontal positioning if/when scale/location changes
    const updatedLocation = getPointerHorizontalPosition({
      location,
      boundingElement,
      targetElement,
      paddingFromTarget,
    });

    const horizontalPosition =
      location === DEFAULT_LOCATION
        ? { left: updatedLocation, right: 'unset' }
        : { right: updatedLocation, left: 'unset' };

    updatePointerStyles({
      ...pointerStyles,
      ...horizontalPosition,
    });
  }, [scale, location]);

  useEffect(() => {
    if (anchorId) {
      // Set to true to avoid accidental renders of the position indicator
      // due to scrolling behavior that is not user generated
      isTransitioning.current = true;

      const nextAnchorElement = document.getElementById(anchorId);

      if (nextAnchorElement) {
        nextAnchorElement.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });

        if (nextAnchorElement.focus) {
          // Small delay to allow for scrolling to catch up before focusing
          // A "snap" transition happens without this delay
          setTimeout(() => nextAnchorElement.focus(), HALF_SECOND);
        }

        // Best guess delay based on pixel distance between current and next element
        // Necessary due to the time it take for the "bounding element" to scroll to
        // the next element
        // This could stand to be refined, though it is inherently unpredictable/imprecise
        const scrollTimeout = getScrollTimeout(
          currentAnchorElement.current,
          nextAnchorElement
        );

        setTimeout(() => {
          updatePointerStyles(
            getUpdatedStyles({
              anchorId,
              boundingElement,
              location,
              paddingFromTarget,
              pointerStyles,
              targetElement,
              heightDifference:
                heightDifferenceRef.current || DEFAULT_HEIGHT_DIFFERENCE,
            })
          );

          // Update to false once auto scrolling is finished to listen for user
          // generated scroll actions on the "bounding" element
          isTransitioning.current = false;
        }, scrollTimeout);

        // Update ref values when anchorId changes to maintain sequential reference
        currentAnchorId.current = anchorId;
        currentAnchorElement.current = nextAnchorElement;
      }
    }
  }, [anchorId]);

  const handleOnBack = (previousAnchorId: string) => onBack(previousAnchorId);

  const handleOnNext = (nextAnchorId: string) => {
    if (!anchorId) {
      updateShouldFocus(false);
    }

    onNext(nextAnchorId);
  };

  const handleMoveToCurrentAnchor = () => {
    const currentElement = document.getElementById(anchorId);

    if (currentElement) {
      currentElement.scrollIntoView({ block: 'center', behavior: 'smooth' });

      if (currentElement.focus) {
        // Small delay to allow for scrolling to catch up before focusing
        // A "snap" transition happens without this delay
        setTimeout(() => currentElement.focus(), 500);
      }
    }
  };

  const renderCongaIcon = () => (
    <img
      className="uic-navigation-pointer__logo uic-navigation-pointer__indicator-logo"
      src={congaLogo}
    />
  );

  const renderSuccessIcon = () => (
    <Icon
      icon="success"
      className={classnames({
        'uic-navigation-pointer__logo': true,
        'uic-navigation-pointer__logo-success': true,
      })}
    />
  );

  const renderPositionIndicator = () => {
    const positionIndicatorStyles = getPositionIndicatorStyles({
      boundingElement,
      positionIndicator,
    });

    return (
      <div
        className={classnames({
          'uic-navigation-pointer__position-indicator': true,
          'uic-navigation-pointer__position-indicator-above':
            positionIndicator === POSITION_INDICATOR_ABOVE,
          'uic-navigation-pointer__position-indicator-below':
            positionIndicator === POSITION_INDICATOR_BELOW,
        })}
        style={positionIndicatorStyles}
      >
        <button
          className={classnames({
            'uic-navigation-pointer__indicator-button': true,
            'uic-navigation-pointer__indicator-button-not-shown': !isShown,
            'uic-navigation-pointer__indicator-button-above':
              positionIndicator === POSITION_INDICATOR_ABOVE,
            'uic-navigation-pointer__indicator-button-below':
              positionIndicator === POSITION_INDICATOR_BELOW,
          })}
          onClick={handleMoveToCurrentAnchor}
          disabled={!isShown}
        />

        {isComplete ? renderSuccessIcon() : renderCongaIcon()}
      </div>
    );
  };

  return (
    <>
      {!isTransitioning.current &&
        positionIndicator &&
        isShown &&
        renderPositionIndicator()}

      <div
        className={classnames({
          'uic-navigation-pointer': true,
          'uic-navigation-pointer-hidden': !isShown,
          'uic-navigation-pointer-focus': shouldFocus && !isComplete,
          [className as string]: className,
        })}
        style={pointerStyles}
        onMouseEnter={() => {
          if (anchorId) {
            toggleKeyboardHelper(true);
          }
        }}
        onMouseLeave={() => {
          if (anchorId) {
            toggleKeyboardHelper(false);
          }
        }}
      >
        <div
          className={classnames({
            'uic-navigation-pointer__button-container': true,
            'uic-navigation-pointer__button-container-right':
              isOnLeftSide && isAtLastAnchor,
            'uic-navigation-pointer__button-container-left':
              !isOnLeftSide && (!anchorId || isAtFirstAnchor),
          })}
        >
          <button
            className={classnames({
              'uic-navigation-pointer__back-button': true,
              'uic-navigation-pointer__back-button-not-shown': !isShown,
              'uic-navigation-pointer__back-button-hidden':
                !anchorId || isAtFirstAnchor,
            })}
            disabled={disabled}
            onClick={() => {
              if (previousAnchorId) {
                handleOnBack(previousAnchorId);
              }
            }}
          >
            {language.back}
          </button>

          {isComplete ? renderSuccessIcon() : renderCongaIcon()}

          <button
            className={classnames({
              'uic-navigation-pointer__next-button': true,
              'uic-navigation-pointer__next-button-not-shown': !isShown,
              'uic-navigation-pointer__next-button-hidden': isAtLastAnchor,
            })}
            disabled={disabled}
            onClick={() => {
              if (!nextAnchorId || firstAnchorId) {
                handleOnNext(
                  anchorId && nextAnchorId ? nextAnchorId : firstAnchorId
                );
              }
            }}
          >
            {!anchorId ? language.begin : language.next}
          </button>
        </div>

        {areKeyboardControlsEnabled && areKeyboardHintsShown && (
          <div
            className={classnames({
              'uic-navigation-pointer__keyboard-controls': true,
              'uic-navigation-pointer__keyboard-controls-above': !anchorId,
              'uic-navigation-pointer__keyboard-controls-below': anchorId,
            })}
          >
            <div
              className={classnames({
                'uic-navigation-pointer__begin-controls': true,
                'uic-navigation-pointer__begin-controls-hidden': anchorId,
              })}
            >
              <Icon icon="keyboard_return" designSystem="material" />
              <p className="uic-navigation-pointer__keyboard-controls-message">
                {language.return}
              </p>
            </div>

            <div
              className={classnames({
                'uic-navigation-pointer__arrow-controls': true,
                'uic-navigation-pointer__arrow-controls-hidden': !isKeyboardHelperShown,
                'uic-navigation-pointer__arrow-controls-shown': isKeyboardHelperShown,
              })}
            >
              {!isAtFirstAnchor && (
                <Icon icon="keyboard_arrow_up" designSystem="material" />
              )}

              <p className="uic-navigation-pointer__keyboard-controls-message">
                {`${!isAtFirstAnchor ? language.up : ''} ${
                  isAtTerminalPosition ? '' : '•'
                } ${!isAtLastAnchor ? language.down : ''}`}
              </p>

              {!isAtLastAnchor && (
                <Icon icon="keyboard_arrow_down" designSystem="material" />
              )}
            </div>
          </div>
        )}

        <p
          className={classnames({
            'uic-navigation-pointer__anchor-count-label': true,
            'uic-navigation-pointer__anchor-count-label-shown': anchorId,
            'uic-navigation-pointer__anchor-count-label-right':
              isOnLeftSide && isAtTerminalPosition,
            'uic-navigation-pointer__anchor-count-label-left':
              !isOnLeftSide && isAtTerminalPosition,
          })}
        >{`${currentAnchorNumber} ${language.of} ${anchorIdCollection.length}`}</p>
      </div>
    </>
  );
};

NavigationPointer.defaultProps = {
  areKeyboardControlsEnabled: false,
  areKeyboardHintsShown: false,
  areTabControlsEnabled: true,
  disabled: false,
  language: DEFAULT_LANGUAGE,
  location: 'left',
  paddingFromTarget: 10,
  scale: 1,
};

export default NavigationPointer;
