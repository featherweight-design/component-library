import { FC, ReactElement } from 'react';
import classnames from 'classnames';

import { ProgressBarProps } from 'types';
import Icon from 'components/Icon/Icon';
import {
  DEFAULT_COMPLETION_COLOR,
  DEFAULT_LANGUAGE,
  DEFAULT_SIZE,
  SIZES_ENUM,
} from './utilities/defaults';

const ProgressBar: FC<ProgressBarProps> = ({
  itemsToComplete,
  className,
  color = DEFAULT_COMPLETION_COLOR,
  isRounded = false,
  language = DEFAULT_LANGUAGE,
  shouldShowCompleteIcon = true,
  shouldShowCountComplete = true,
  shouldShowPercentageComplete = true,
  size = DEFAULT_SIZE,
}: ProgressBarProps): ReactElement => {
  const completeItems = itemsToComplete.filter(({ isComplete }) => isComplete);
  const percentageComplete = Math.round(
    (completeItems.length / itemsToComplete.length) * 100
  );
  const percentageCompleteMessage = `${percentageComplete}% ${language.complete}`;
  const countCompleteMessage = `${completeItems.length} ${language.of} ${itemsToComplete.length}`;
  const areAllItemsComplete = completeItems.length === itemsToComplete.length;

  return (
    <div
      className={classnames({
        'fd-progress-bar': true,
        [className as string]: className,
      })}
    >
      <div className="fd-progress-bar__progress-container">
        <div
          className={classnames({
            'fd-progress-bar__fill-container': true,
            'fd-progress-bar__fill-container-rounded': isRounded,
          })}
          style={{
            height: SIZES_ENUM[size],
          }}
        >
          <div
            className={classnames({
              'fd-progress-bar__fill': true,
              'fd-progress-bar__fill-rounded': isRounded,
            })}
            style={{
              height: SIZES_ENUM[size],
              width: `${percentageComplete}%`,
              backgroundColor: color,
            }}
          />
        </div>

        {shouldShowCompleteIcon && (
          <Icon
            className={classnames({
              'fd-progress-bar__completion-icon': true,
              'fd-progress-bar__completion-icon-hidden': !areAllItemsComplete,
            })}
            icon="check_circle"
            color={color}
            size="1rem"
          />
        )}
      </div>

      {(shouldShowCountComplete || shouldShowPercentageComplete) && (
        <div className="fd-progress-bar__description-container">
          {shouldShowPercentageComplete && (
            <p className="fd-progress-bar__description-left">
              {percentageCompleteMessage}
            </p>
          )}
          {shouldShowCountComplete && (
            <p className="fd-progress-bar__description-right">
              {countCompleteMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

ProgressBar.defaultProps = {
  color: DEFAULT_COMPLETION_COLOR,
  isRounded: false,
  language: DEFAULT_LANGUAGE,
  shouldShowCompleteIcon: true,
  shouldShowCountComplete: true,
  shouldShowPercentageComplete: true,
  size: DEFAULT_SIZE,
};

export default ProgressBar;
