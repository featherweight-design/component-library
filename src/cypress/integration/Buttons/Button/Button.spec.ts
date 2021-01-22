import { buttonCopy } from 'shared/data/copyContent';

describe('Button tests', () => {
  before(() => {
    cy.visitStorybook();
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
