import { buttonCopy } from 'shared/data/copyContent';

describe('Button Variants tests', () => {
  before(() => {
    cy.visitStorybook({
      headers: {
        'Accept-Encoding': 'gzip, deflate',
      },
    });
    cy.loadStory('components-buttons-button', 'variants');
  });

  it('Should have a "Default" button', () => {
    cy.findByText(buttonCopy.default).closest('button');
  });

  it('Should have a "Default Destructive" button', () => {
    cy.findByText(buttonCopy.defaultDestructive).closest('button');
  });

  it('Should have a "Brand" button', () => {
    cy.findByText(buttonCopy.brand).closest('button');
  });

  it('Should have a "Neutral" button', () => {
    cy.findByText(buttonCopy.neutral).closest('button');
  });

  it('Should have a "Outline" button', () => {
    cy.findByText(buttonCopy.outline).closest('button');
  });

  it('Should have a "Destructive" button', () => {
    cy.findByText(buttonCopy.destructive).closest('button');
  });

  it('Should have a "Outline Destructive" button', () => {
    cy.findByText(buttonCopy.outlineDestructive).closest('button');
  });

  it('Should have a "Glass" button', () => {
    cy.findByText(buttonCopy.glass).closest('button');
  });
});
