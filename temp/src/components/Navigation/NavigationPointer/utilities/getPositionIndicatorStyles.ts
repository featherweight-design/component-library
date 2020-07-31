import { GetPositionIndicatorStylesArgs, PositionStyles } from 'types';
import {
  POSITION_INDICATOR_ABOVE,
  POSITION_INDICATOR_HEIGHT,
} from './defaults';

const getPositionIndicatorStyles = ({
  boundingElement,
  positionIndicator,
}: GetPositionIndicatorStylesArgs): PositionStyles => {
  const {
    top: boundingTop,
    height: boundingHeight,
  } = boundingElement.getBoundingClientRect();

  const verticalPosition = {
    top: `${
      positionIndicator === POSITION_INDICATOR_ABOVE
        ? boundingTop
        : boundingTop + boundingHeight - POSITION_INDICATOR_HEIGHT
    }px`,
  };

  const { left } = document
    .getElementsByClassName('uic-navigation-pointer__logo')[0]
    .getBoundingClientRect();

  const horizontalPosition = {
    left: `${left}px`,
  };

  return {
    ...verticalPosition,
    ...horizontalPosition,
  };
};

export default getPositionIndicatorStyles;
