import { actionButtonCopy } from 'shared/data/copyContent';

describe('ActionButton Sizes tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-buttons-actionbutton', 'shapes');
  });

  it('Should have an "X-Small" button for each variant', () => {
    cy.findByText(actionButtonCopy.xSmall).should('have.length', 3);
  });

  it('Should have a "Small" button for each variant', () => {
    cy.findByText(actionButtonCopy.small).should('have.length', 3);
  });

  it('Should have a "Medium" button for each variant', () => {
    cy.findByText(actionButtonCopy.medium).should('have.length', 3);
  });

  it('Should have a "Large" button for each variant', () => {
    cy.findByText(actionButtonCopy.large).should('have.length', 3);
  });

  it('Should have an "X-Large" button for each variant', () => {
    cy.findByText(actionButtonCopy.xLarge).should('have.length', 3);
  });
});
