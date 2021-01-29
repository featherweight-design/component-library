import { buttonCopy } from 'shared/data/copyContent';

describe('Button Variants tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-buttons-button', 'variants');
  });

  it('Should have a "Default" button', () => {
    cy.get('button').findByText(buttonCopy.default);
  });

  it('Should have a "Default Destructive" button', () => {
    cy.get('button').findByText(buttonCopy.defaultDestructive);
  });

  it('Should have a "Brand" button', () => {
    cy.get('button').findByText(buttonCopy.brand);
  });

  it('Should have a "Neutral" button', () => {
    cy.get('button').findByText(buttonCopy.neutral);
  });

  it('Should have a "Outline" button', () => {
    cy.get('button').findByText(buttonCopy.outline);
  });

  it('Should have a "Destructive" button', () => {
    cy.get('button').findByText(buttonCopy.destructive);
  });

  it('Should have a "Outline Destructive" button', () => {
    cy.get('button').findByText(buttonCopy.outlineDestructive);
  });

  it('Should have a "Glass" button', () => {
    cy.get('button').findByText(buttonCopy.glass);
  });
});
