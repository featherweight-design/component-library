// Workaround for importing SVG files
// Resource: https://webpack.js.org/guides/typescript/#importing-other-assets

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}