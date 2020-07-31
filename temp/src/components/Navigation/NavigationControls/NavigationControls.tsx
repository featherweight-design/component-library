import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import {
  NavigationControlsProps,
  NavigationControlsDeviceSize,
  ActionButtonSize,
} from 'types';
import { ActionButton } from 'components/Buttons';
import ProgressBar from 'components/Progress/ProgressBar/ProgressBar';
import congaLogo from 'scss/assets/conga-logo.svg';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_SCROLL_TIMEOUT,
  DEFAULT_TABLET_BREAKPOINT,
  DEVICE_BUTTON_SIZES_ENUM,
  addOnResizeListener,
} from './utilities';

import './NavigationControls.scss';

const getInitialDeviceSize = () => {
  const { clientWidth } = window.document.body;
  const initialDeviceSize =
    clientWidth >= DEFAULT_TABLET_BREAKPOINT ? 'tablet' : 'mobile';

  return initialDeviceSize;
};

const NavigationControls: FC<NavigationControlsProps> = ({
  anchorId,
  anchorIdCollection,
  onBack,
  onNext,
  className,
  disabled = false,
  isShown = true,
  isComplete = false,
  language = DEFAULT_LANGUAGE,
  onCancel,
  onComplete,
  onLogoClick,
  progress,
}: NavigationControlsProps): ReactElement => {
  const resizeListenerRef = useRef<(() => void) | undefined>(undefined);
  const [deviceSize, updateDeviceSize] = useState<NavigationControlsDeviceSize>(
    getInitialDeviceSize()
  );

  const firstAnchorId = anchorIdCollection[0];
  const lastAnchorId = anchorIdCollection[anchorIdCollection.length - 1];
  const isAtFirstAnchor = anchorId === firstAnchorId;
  const isAtLastAnchor = anchorId === lastAnchorId;

  const currentAnchorNumber = anchorIdCollection.indexOf(anchorId) + 1;
  const previousAnchorId =
    !isAtFirstAnchor &&
    anchorIdCollection[anchorIdCollection.indexOf(anchorId) - 1];
  const nextAnchorId =
    !isAtLastAnchor &&
    anchorIdCollection[anchorIdCollection.indexOf(anchorId) + 1];

  useEffect(() => {
    if (resizeListenerRef.current) {
      window.removeEventListener('resize', resizeListenerRef.current);

      const onResizeListener = addOnResizeListener({
        deviceSize,
        updateDeviceSize,
      });

      resizeListenerRef.current = onResizeListener;
    }
  }, [deviceSize]);

  useEffect(() => {
    const onResizeListener = addOnResizeListener({
      deviceSize,
      updateDeviceSize,
    });

    resizeListenerRef.current = onResizeListener;

    return () => {
      if (resizeListenerRef.current) {
        window.removeEventListener('resize', resizeListenerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (anchorId) {
      const nextAnchorElement = document.getElementById(anchorId);

      if (nextAnchorElement) {
        nextAnchorElement.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });

        if (nextAnchorElement.focus) {
          // Small delay to allow for scrolling to catch up before focusing
          // A "snap" transition happens without this delay
          setTimeout(() => nextAnchorElement.focus(), DEFAULT_SCROLL_TIMEOUT);
        }
      }
    }
  }, [anchorId]);

  const handleOnBack = () => {
    if (previousAnchorId) {
      onBack(previousAnchorId);
    }
  };

  const handleOnNext = () => {
    if (nextAnchorId) {
      onNext(nextAnchorId);
    }
  };

  const handleOnLogoClick = () => {
    if (!anchorId) {
      onNext(firstAnchorId);
    }

    if (onLogoClick && anchorId) {
      onLogoClick();
    }
  };

  const currentAnchorLabel = `${currentAnchorNumber} ${language.of} ${
    anchorIdCollection.length
  }${deviceSize === 'tablet' ? ` ${language.total}` : ''}`;

  return (
    <div
      className={classnames({
        'uic-navigation-controls': true,
        [`uic-navigation-controls-${deviceSize}`]: true,
        'uic-navigation-controls-hidden': !isShown,
        [className as string]: className,
      })}
    >
      {progress && (
        <ProgressBar
          className={classnames({
            'uic-navigation-controls__progress': true,
            'uic-navigation-controls__progress-hidden': !isShown,
          })}
          color={progress.color}
          itemsToComplete={progress.itemsToComplete}
          language={progress.language}
          shouldShowCountComplete={progress.shouldShowCountComplete || false}
          shouldShowPercentageComplete={progress.shouldShowPercentageComplete}
          shouldShowCompleteIcon={false}
        />
      )}

      <div
        className={classnames({
          'uic-navigation-controls__button-container': true,
          [`uic-navigation-controls__button-container-${deviceSize}`]: true,
          'uic-navigation-controls__button-container-grid-four':
            !onCancel || !onComplete,
          'uic-navigation-controls__button-container-grid-three':
            !onCancel && !onComplete,
          'uic-navigation-controls__button-container-hidden': !isShown,
        })}
      >
        {onCancel && (
          <ActionButton
            className={classnames({
              'uic-navigation-controls__button': true,
              'uic-navigation-controls__button-hidden': !anchorId,
            })}
            type="secondary"
            icon="close"
            onClick={onCancel}
            label={language.cancel}
            disabled={disabled}
            size={DEVICE_BUTTON_SIZES_ENUM[deviceSize] as ActionButtonSize}
          />
        )}

        <ActionButton
          className={classnames({
            'uic-navigation-controls__button': true,
            'uic-navigation-controls__button-hidden': !anchorId,
          })}
          type="secondary"
          icon="chevronLeft"
          onClick={handleOnBack}
          label={language.back}
          disabled={disabled || isAtFirstAnchor}
          size={DEVICE_BUTTON_SIZES_ENUM[deviceSize] as ActionButtonSize}
        />

        <ActionButton
          className={classnames({
            'uic-navigation-controls__button': true,
            'uic-navigation-controls__button-logo-disabled':
              anchorId && !onLogoClick,
          })}
          type="secondary"
          image={congaLogo}
          onClick={handleOnLogoClick}
          label={anchorId ? currentAnchorLabel : language.begin}
          disabled={disabled}
          size={DEVICE_BUTTON_SIZES_ENUM[deviceSize] as ActionButtonSize}
        />

        <ActionButton
          className={classnames({
            'uic-navigation-controls__button': true,
            'uic-navigation-controls__button-hidden': !anchorId,
          })}
          type="secondary"
          icon="chevronRight"
          onClick={handleOnNext}
          label={language.next}
          disabled={disabled || isAtLastAnchor}
          size={DEVICE_BUTTON_SIZES_ENUM[deviceSize] as ActionButtonSize}
        />

        {onComplete && (
          <ActionButton
            className={classnames({
              'uic-navigation-controls__button': true,
              'uic-navigation-controls__button-hidden': !anchorId,
            })}
            type="secondary"
            icon="check"
            onClick={onComplete}
            label={language.complete}
            disabled={disabled || !isComplete}
            size={DEVICE_BUTTON_SIZES_ENUM[deviceSize] as ActionButtonSize}
          />
        )}
      </div>
    </div>
  );
};

NavigationControls.defaultProps = {
  disabled: false,
  isComplete: false,
  isShown: true,
  language: DEFAULT_LANGUAGE,
};

export default NavigationControls;
