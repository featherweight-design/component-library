import { DOCUMENT_WIDTH_PADDING_DIVISOR } from './defaults';

const getDocumentBoundingWidthDifference = (
  boundingElement: HTMLElement
): number => {
  const { width: documentWidth } = document.body.getBoundingClientRect();
  const { width: boundingWidth } = boundingElement.getBoundingClientRect();

  // Added measurement to account for when the bounding box does not fill 100% width
  // Assumes padding is equal on each side of the bounding element
  // Something more sophisticated may be needed if an edge case arises
  const documentBoundingWidthDifference =
    (documentWidth - boundingWidth) / DOCUMENT_WIDTH_PADDING_DIVISOR;

  return documentBoundingWidthDifference;
};

export default getDocumentBoundingWidthDifference;
