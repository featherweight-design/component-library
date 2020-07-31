import getDistanceToTravel from './getDistanceToTravel';
import {
  ONE_SECOND,
  HALF_SECOND,
  QUARTER_SECOND,
  SCROLL_TIMEOUT_MAX,
  SCROLL_TIMEOUT_MIN,
} from './defaults';

// Rounding approximation to determine a reasonable allotted timeout to allow for
// scrolling the next anchor into view. Could be refined to be more snappy/precise.
const getScrollTimeout = (
  currentAnchorElement: Element,
  nextAnchorElement: Element
): number => {
  const currentTop = currentAnchorElement.getBoundingClientRect().top;
  const nextTop = nextAnchorElement.getBoundingClientRect().top;

  const distanceToTravel = getDistanceToTravel(currentTop, nextTop);
  const millisecondRoundingInteger =
    distanceToTravel > ONE_SECOND ? HALF_SECOND : QUARTER_SECOND;
  const roundedTimeout =
    Math.round(distanceToTravel / millisecondRoundingInteger) *
    millisecondRoundingInteger;

  if (roundedTimeout > SCROLL_TIMEOUT_MAX) {
    return SCROLL_TIMEOUT_MAX;
  }

  if (roundedTimeout < SCROLL_TIMEOUT_MIN) {
    return SCROLL_TIMEOUT_MIN;
  }

  return roundedTimeout;
};

export default getScrollTimeout;
