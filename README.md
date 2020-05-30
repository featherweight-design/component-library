# Featherweight Design Component Library

A component library built for and maintained by Featherweight Design in an effort to standardize and expedite the design and development process for our clients.

## Installation

Clone the repository:

```terminal
git clone git@github.com:featherweight-design/component-library.git
```

Enter the directory and install all dependencies:

```terminal
cd component library
yarn install
```

## Usage

To run the component library's Storybook:

```terminal
yarn storybook
```

To install the component library as a dependency:

```terminal
yarn add @f-design/component-library

npm install @f-design/component-library
```

To override style variables in your project, add the below `@import` to your `main.scss` or equivalent file:

```scss
// colors.scss
$brand-color: #8155A5;
$brand-hover: #764E96;
$brand-active: #6A4688;

// main.scss
@import './colors';
@import './mixins';

@import '~@f-design/component-library/dist/scss/components/all.scss';
```

## Contributing

See our [`CONTRIBUTING.md`](CONTRIBUTING.md)

## LICENSE

[MIT](https://choosealicense.com/licenses/mit/)