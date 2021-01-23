import '../src/styles/main.scss';

export const parameters = {
  options: {
    showRoots: true,
    // Inspiration for sorting solution credit to Reaviz
    // https://github.com/reaviz/reaviz/blob/master/.storybook/config.js
    storySort: (a: any, b: any) => {
      const idA = a[1].id;
      const idB = b[1].id;
      if (idA.includes('docs') || idB.includes('docs')) {
        if (idA.includes('intro') || idB.includes('intro')) {
          return 1;
        }
        return 0;
      }
      if (idA.includes('readme')) {
        return -1;
      }
      return idA > idB ? 1 : -1;
    },
  },
};
