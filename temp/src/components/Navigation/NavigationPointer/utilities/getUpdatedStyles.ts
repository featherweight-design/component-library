import { GetUpdateStylesArgs, PointerStyles } from 'types';
import getPointerHorizontalPosition from './getPointerHorizontalPosition';
import getPointerTopPosition from './getPointerTopPosition';
import { DEFAULT_LOCATION } from './defaults';

const getUpdatedStyles = ({
  anchorId,
  boundingElement,
  location,
  paddingFromTarget,
  pointerStyles,
  targetElement,
  heightDifference,
}: GetUpdateStylesArgs): PointerStyles => {
  const top = getPointerTopPosition({
    anchorId,
    boundingElement,
    heightDifference,
  });
  const horizontalLocation = getPointerHorizontalPosition({
    location,
    boundingElement,
    targetElement,
    paddingFromTarget,
  });
  const baseStyles = {
    ...pointerStyles,
    top,
  };

  return location === DEFAULT_LOCATION
    ? {
        ...baseStyles,
        left: horizontalLocation,
      }
    : {
        ...baseStyles,
        right: horizontalLocation,
      };
};

export default getUpdatedStyles;
