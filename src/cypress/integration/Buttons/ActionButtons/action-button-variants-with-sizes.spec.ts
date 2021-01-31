import { actionButtonCopy } from 'shared/data/copyContent';

describe('ActionButton Sizes tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-buttons-actionbutton', 'variants-with-sizes');
  });

  it('Should have an "X-Small" button for each variant', () => {
    cy.findAllByText(actionButtonCopy.xSmall).should('have.length', 3);
  });

  it('Should have a "Small" button for each variant', () => {
    cy.findAllByText(actionButtonCopy.small).should('have.length', 3);
  });

  it('Should have a "Medium" button for each variant', () => {
    cy.findAllByText(actionButtonCopy.medium).should('have.length', 3);
  });

  it('Should have a "Large" button for each variant', () => {
    cy.findAllByText(actionButtonCopy.large).should('have.length', 3);
  });

  it('Should have an "X-Large" button for each variant', () => {
    cy.findAllByText(actionButtonCopy.xLarge).should('have.length', 3);
  });
});
