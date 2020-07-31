import { GetPointerHorizontalArgs } from 'types';
import getDocumentBoundingWidthDifference from './getDocumentBoundingWidthDifference';
import {
  DEFAULT_LOCATION,
  DEFAULT_WIDTH,
  MINIMUM_DISTANCE_FROM_EDGE,
} from './defaults';

const getPointerHorizontalPosition = ({
  location,
  boundingElement,
  targetElement,
  paddingFromTarget,
}: GetPointerHorizontalArgs): string => {
  const isOnLeftSide = location === DEFAULT_LOCATION;
  const { width: boundingWidth } = boundingElement.getBoundingClientRect();
  const {
    right: targetRight,
    left: targetLeft,
  } = targetElement.getBoundingClientRect();

  const documentBoundingWidthDifference = getDocumentBoundingWidthDifference(
    boundingElement
  );

  // Determine if screen size is small enough that the anchor will run off the page
  const willRunOffPage = isOnLeftSide
    ? targetLeft <
      DEFAULT_WIDTH + paddingFromTarget + documentBoundingWidthDifference
    : targetRight + DEFAULT_WIDTH + paddingFromTarget > boundingWidth;

  if (willRunOffPage) {
    return `${MINIMUM_DISTANCE_FROM_EDGE}px`; // Keep the pointer at least 10px from the edge of the page
  }

  const sharedMeasurement = `${DEFAULT_WIDTH}px - ${paddingFromTarget}px`;

  const left = isOnLeftSide
    ? `calc(${targetLeft}px - ${sharedMeasurement} - ${documentBoundingWidthDifference}px)`
    : `calc(${boundingWidth}px - ${targetRight}px - ${sharedMeasurement} + ${documentBoundingWidthDifference}px)`;

  return left;
};

export default getPointerHorizontalPosition;
