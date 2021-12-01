import { buttonCopy } from 'shared/data/copyContent';

describe('Button Variants Disabled tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-buttons-button', 'variants-disabled');
  });

  it('Should have a disabled "Default" button', () => {
    cy.findAllByText(buttonCopy.default)
      .closest('button')
      .should('be.disabled');
  });

  it('Should have a disabled "Default Destructive" button', () => {
    cy.findByText(buttonCopy.defaultDestructive)
      .closest('button')
      .should('be.disabled');
  });

  it('Should have a disabled "Brand" button', () => {
    cy.findByText(buttonCopy.brand)
      .closest('button')
      .should('be.disabled');
  });

  it('Should have a disabled "Neutral" button', () => {
    cy.findByText(buttonCopy.neutral)
      .closest('button')
      .should('be.disabled');
  });

  it('Should have a disabled "Outline" button', () => {
    cy.findByText(buttonCopy.outline)
      .closest('button')
      .should('be.disabled');
  });

  it('Should have a disabled "Destructive" button', () => {
    cy.findByText(buttonCopy.destructive)
      .closest('button')
      .should('be.disabled');
  });

  it('Should have a disabled "Outline Destructive" button', () => {
    cy.findByText(buttonCopy.outlineDestructive)
      .closest('button')
      .should('be.disabled');
  });

  it('Should have a disabled "Glass" button', () => {
    cy.findByText(buttonCopy.glass)
      .closest('button')
      .should('be.disabled');
  });
});
