# Contributing to Featherweight Design's Component Library

First and foremost...

🔥🎉 Thank you for contributing!!! 🎉🔥

This document contains a number of guidelines for contributing to this library. It is an ever changing and constantly growing document, so if you have any questions reach out to one of our team members. If you think something needs to be tweaked or want to propose a change, feel free to submit a pull request updating this document.

## Table of Contents

- [Contributing to Featherweight Design's Component Library](#contributing-to-featherweight-designs-component-library)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [I have a question](#i-have-a-question)
  - [Styleguides](#styleguides)
    - [Git Commit Messages](#git-commit-messages)
    - [JavaScript Styleguide](#javascript-styleguide)
    - [TypeScript Styleguide](#typescript-styleguide)
    - [CSS Styleguide](#css-styleguide)
    - [React Styleguide](#react-styleguide)
    - [Testing Styleguide](#testing-styleguide)
  - [Your First Contribution](#your-first-contribution)
    - [Picking Up an Issue](#picking-up-an-issue)
    - [I'm done, now what?](#im-done-now-what)
    - [Receiving Feedback](#receiving-feedback)
    - [After Approval](#after-approval)
  - [Attribution](#attribution)

## Code of Conduct

Please thoroughly review our [Code of Conduct](CODE_OF_CONDUCT.md).

## I have a question

> **Note:** Please don't file an issue to ask a question. You'll receive a faster response by using one of the resources below.

The first place to start is referencing our [`README.md`](README.md).

Most issue specific questions can be answered by the issue's **"Acceptance Criteria"** and/or **"References"** section.

If talking to a real person is your jam, reach out to the `#questions` channel in our Slack and someone can point you in the right direction. If you've been assigned to a particular client for which you are developing in the component library, you should have a client specific channel as well (e.g. `#dfx`, `#rose-glass-design`, etc.).

## Styleguides

### Git Commit Messages

- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Commit types have have adopted are:
  - `fix` (PATCH)
  - `feat` (MINOR)
  - `BREAKING CHANGE` (MAJOR)
  - `build`
  - `chore`
  - `ci`
  - `docs`
  - `style`
  - `refactor`
  - `perf`
  - `test`
  - `optimization`
- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less

### JavaScript Styleguide

- All JavaScript must adhere to our Prettier and Eslint formatting
- Destructuring should be used whenever possible
- Prefer the object spread operator (`{ ...anotherObj }` to `Object.assign()`)
- End of file over inline `export`s

  ```javascript
  // Use this:
  const Component = () => {};

  export default Component;

  // Instead of:
  export const Component = () => {};
  ```

- Place imports in the following order:
  - Third party Node Modules (such as `react`)
  - Local Modules (using relative paths)
  - Stylesheets
- Modules with five or more imports should have visual space above and below them

### TypeScript Styleguide

- TBD

### CSS Styleguide

- Component specific stylesheets should live in `/src/styles/components`
  - *Note: We do this to enable consumers of `@f-design/component-library` to override default SCSS variables*
- Components should be namespaced with `fd-` (e.g. `fd-button`)
- HEX values should be referenced as variables through `colors.scss`
- A loose BEM formatting should be used for classes:
  - Block: `fd-button`, `fd-checkbox`
  - Element: `fd-button__value`, `fd-checkbox__label`
  - Modifier: `fd-button__value-hidden`, `fd-checkbox-disabled`

### React Styleguide

- React hooks should be used for all state handling
- Actionable props should be prefaced with the word `on` (e.g. `onChange`, `onClose`, etc.)
- Methods passed to components as props should prefaced with the world `handle` (e.g. `handleChange`, `handleClose`, etc.)
- Any boolean props should be prefaced with the words `is/has/was` (e.g. `isLoading`, `hasData`, `wasSuccessful`, etc.)
- All possible states should be considered (e.g. empty, full, disabled, loading, etc.)

### Testing Styleguide

- Jest: TBD
- Cypress: TBD

## Your First Contribution

### Picking Up an Issue

- Find an issue that you are interested in the "To Do" column of the [Component Library project board](https://github.com/featherweight-design/component-library/projects/1)
- Ask to pick it up by either commenting on the issue itself or posting in #component-library
- Once approved, move your issue to the "In Progress" column of the project board
- Pull down the latest changes from `master` and checkout a new branch prefaced with your name (e.g. `hugh/icon-component`)

### I'm done, now what?

- Celebrate! 🎉
- Rebase with `master`
- Run `yarn release` to update the package version and `CHANGELOG.md`
- Push your changes to GitHub and open a new PR
- Fill out any relevant sections in the PR Template and remove those that are unused
- Run through the "Sanity Checks"
- GitHub will randomly assign someone to review your PR, but you are welcome to select additional reviewers

### Receiving Feedback

- Feedback is non-objective and in the best interest of the application
- Comments are meant to foster dialog, you are free to communicate your thought process and explain any reasoning to reach a joint decision
- When changes are requested, implement them to the best of your ability
- If you have questions, reach out to whomever requested changes or in Slack
- Admins reserve the right to dismiss PR approvals and change requests

### After Approval

- Checkout `master`
- Pull down any changes
- Run `npm publish` to release the new version of our component library
- 🔥 You did it! 🔥

## Attribution

These Contributing docs were adapted from the [Atom Contribution](https://github.com/atom/atom/blob/master/CONTRIBUTING.md) docs.
