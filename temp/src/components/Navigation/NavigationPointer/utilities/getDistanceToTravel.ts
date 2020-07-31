const getDistanceToTravel = (currentTop: number, nextTop: number): number => {
  // Moving to another anchor further down the page
  if (nextTop > currentTop) {
    return nextTop - currentTop;
  }

  // Moving to a higher anchor, within view
  if (nextTop < currentTop && nextTop > 0) {
    return currentTop - nextTop;
  }

  // Moving to a higher anchor, outside of page view
  return Math.abs(nextTop) + currentTop;
};

export default getDistanceToTravel;
