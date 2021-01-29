import { buttonCopy } from 'shared/data/copyContent';

describe('Button Variants Loading tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-buttons-button', 'variants-loading');
  });

  it('Should have a "Default" button', () => {
    cy.findByText(buttonCopy.default)
      .closest('button')
      .find('.fd-circle-loader');
  });

  it('Should have a "Default Destructive" button', () => {
    cy.findByText(buttonCopy.defaultDestructive)
      .closest('button')
      .find('.fd-circle-loader');
  });

  it('Should have a "Brand" button', () => {
    cy.findByText(buttonCopy.brand)
      .closest('button')
      .find('.fd-circle-loader');
  });

  it('Should have a "Neutral" button', () => {
    cy.findByText(buttonCopy.neutral)
      .closest('button')
      .find('.fd-circle-loader');
  });

  it('Should have a "Outline" button', () => {
    cy.findByText(buttonCopy.outline)
      .closest('button')
      .find('.fd-circle-loader');
  });

  it('Should have a "Destructive" button', () => {
    cy.findByText(buttonCopy.destructive)
      .closest('button')
      .find('.fd-circle-loader');
  });

  it('Should have a "Outline Destructive" button', () => {
    cy.findByText(buttonCopy.outlineDestructive)
      .closest('button')
      .find('.fd-circle-loader');
  });

  it('Should have a "Glass" button', () => {
    cy.findByText(buttonCopy.glass)
      .closest('button')
      .find('.fd-circle-loader');
  });
});
