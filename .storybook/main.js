const path = require('path');

module.exports = {
  stories: [
    '../src/components/**/*.stories.(tsx|mdx)',
    '../docs/**/*.stories.mdx',
  ],
  addons: [
    '@storybook/addon-actions',
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
    // do mutation to the config
    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('awesome-typescript-loader'),
          },
          {
            loader: require.resolve('react-docgen-typescript-loader'),
            options: {
              tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
            },
          },
        ],
      },
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
    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.alias = {
      ...config.resolve.alias,
      styles: path.resolve(__dirname, '../src/styles'),
      utilities: path.resolve(__dirname, '../src/utilities'),
      components: path.resolve(__dirname, '../src/components'),
    };

    return config;
  },
};