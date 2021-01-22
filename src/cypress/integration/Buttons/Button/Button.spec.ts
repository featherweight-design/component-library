import { buttonCopy } from 'shared/data/copyContent';

describe('Button tests', () => {
  before(() => {
    cy.visitStorybook();
  });

  beforeEach(() => {
    // The first parameter is the category. This is the `title` in CSF or the value in `storiesOf`
    // The second parameter is the name of the story. This is the name of the function in CSF or the value in the `add`
    // This does not refresh the page, but will unmount any previous story and use the Storybook Router API to render a fresh new story
    cy.loadStory('Button', 'Text');
  });

  // describe('Playground', () => {});

  // describe('Shapes', () => {});

  describe('Variants', () => {
    it('Should have a "Default" button', () => {
      cy.get('button').findByText(buttonCopy.default);
    });
  });

  describe('Variants Disabled', () => {
    it('Should have a disabled "Default" button', () => {
      cy.get('button')
        .findByText(buttonCopy.default)
        .should('be.disabled');
    });
  });

  describe('Variants Loading', () => {
    it('Should have a loading "Default" button', () => {
      cy.get('button')
        .findByText(buttonCopy.default)
        .should('have.property', 'loading', true);
    });
  });
});
