const path = require('path');

module.exports = {
  stories: [
    '../src/components/**/*.stories.(tsx|mdx)',
    '../docs/**/*.stories.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y/register',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
      },
    },
  ],
  webpackFinal: async config => {
    config.module.rules.push(
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      }
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      styles: path.resolve(__dirname, '../src/styles'),
      shared: path.resolve(__dirname, '../src/shared'),
      components: path.resolve(__dirname, '../src/components'),
    };

    return config;
  },
};
