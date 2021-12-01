import { buttonCopy } from 'shared/data/copyContent';

describe('Button Variants Loading tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-buttons-button', 'variants-loading');
  });

  it('Should have a loading "Default" button', () => {
    cy.findAllByText(buttonCopy.default)
      .closest('button')
      .find('.fd-circle-loader');
  });

  it('Should have a loading "Default Destructive" button', () => {
    cy.findByText(buttonCopy.defaultDestructive)
      .closest('button')
      .find('.fd-circle-loader');
  });

  it('Should have a loading "Brand" button', () => {
    cy.findByText(buttonCopy.brand)
      .closest('button')
      .find('.fd-circle-loader');
  });

  it('Should have a loading "Neutral" button', () => {
    cy.findByText(buttonCopy.neutral)
      .closest('button')
      .find('.fd-circle-loader');
  });

  it('Should have a loading "Outline" button', () => {
    cy.findByText(buttonCopy.outline)
      .closest('button')
      .find('.fd-circle-loader');
  });

  it('Should have a loading "Destructive" button', () => {
    cy.findByText(buttonCopy.destructive)
      .closest('button')
      .find('.fd-circle-loader');
  });

  it('Should have a loading "Outline Destructive" button', () => {
    cy.findByText(buttonCopy.outlineDestructive)
      .closest('button')
      .find('.fd-circle-loader');
  });

  it('Should have a loading "Glass" button', () => {
    cy.findByText(buttonCopy.glass)
      .closest('button')
      .find('.fd-circle-loader');
  });
});
