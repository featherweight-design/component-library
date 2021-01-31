import { actionButtonCopy } from 'shared/data/copyContent';

describe('ActionButton Variants tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-buttons-actionbutton', 'variants');
  });

  it('Should have a "Primary" button', () => {
    cy.findByText(actionButtonCopy.primary)
      .closest('button')
      .should('be.disabled');
  });

  it('Should have a "Secondary" button', () => {
    cy.findByText(actionButtonCopy.secondary)
      .closest('button')
      .should('be.disabled');
  });

  it('Should have a "Glass" button', () => {
    cy.findByText(actionButtonCopy.glass)
      .closest('button')
      .should('be.disabled');
  });
});
