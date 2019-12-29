// TODO: Implement alternate check for passed hex/rgb/word
// Color contrast formula credited to Mark Ransom on Stack Overflow
// https://stackoverflow.com/a/3943023

const generateColorContrast = (
  backgroundColor: string,
  threshold: number | 150
): string => {
  const rgbArray = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    backgroundColor
  );
  const rgbFromHex = rgbArray && rgbArray[1];

  if (rgbFromHex) {
    const red = parseInt(rgbFromHex, 16);
    const green = parseInt(rgbFromHex, 16);
    const blue = parseInt(rgbFromHex, 16);

    const result =
      red * 0.299 + green * 0.587 + blue * 0.114 > threshold ? '#000' : '#fff';

    return result;
  }

  return '#000';
};
export default generateColorContrast;
