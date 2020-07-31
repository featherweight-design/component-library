import { GetPointerTopArgs } from 'types';
import {
  COUNTER_HEIGHT,
  DEFAULT_HEIGHT,
  DEFAULT_TOP,
  TOP_HEIGHT_DIVISOR,
} from './defaults';

const getPointerTopPosition = ({
  anchorId,
  boundingElement,
  heightDifference,
}: GetPointerTopArgs): string => {
  const anchorElement = document.getElementById(anchorId);

  if (anchorElement) {
    const {
      top: tagTop,
      height: tagHeight,
    } = anchorElement.getBoundingClientRect();

    const { scrollTop: boundingScrollTop } = boundingElement;

    // To place the pointer at the middle of a tag:
    // ((Tag top - height difference top + boundingScrollTop)
    //   + (tag height / 2)) - ((pointer height - counter height) / 2)
    const top = `calc(${
      tagTop -
      heightDifference.top +
      boundingScrollTop +
      tagHeight / TOP_HEIGHT_DIVISOR
    }px - ${(DEFAULT_HEIGHT - COUNTER_HEIGHT) / TOP_HEIGHT_DIVISOR}px)`;

    return top;
  }

  return DEFAULT_TOP;
};

export default getPointerTopPosition;
