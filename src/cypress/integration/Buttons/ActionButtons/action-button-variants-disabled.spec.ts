import { actionButtonCopy } from 'shared/data/copyContent';

describe('ActionButton Variants Disabled tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-buttons-actionbutton', 'variants-disabled');
  });

  it('Should have a disabled "Primary" button', () => {
    cy.findByText(actionButtonCopy.primary)
      .siblings('button')
      .should('be.disabled');
  });

  it('Should have a disabled "Secondary" button', () => {
    cy.findByText(actionButtonCopy.secondary)
      .siblings('button')
      .should('be.disabled');
  });

  it('Should have a disabled "Glass" button', () => {
    cy.findByText(actionButtonCopy.glass)
      .siblings('button')
      .should('be.disabled');
  });
});
