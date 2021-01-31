import { actionButtonCopy } from 'shared/data/copyContent';

describe('ActionButton Variants Loading tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-buttons-actionbutton', 'variants-loading');
  });

  it('Should have a loading "Primary" button', () => {
    cy.findByText(actionButtonCopy.primary)
      .siblings('button')
      .find('.fd-circle-loader');
  });

  it('Should have a loading "Secondary" button', () => {
    cy.findByText(actionButtonCopy.secondary)
      .siblings('button')
      .find('.fd-circle-loader');
  });

  it('Should have a loading "Glass" button', () => {
    cy.findByText(actionButtonCopy.glass)
      .siblings('button')
      .find('.fd-circle-loader');
  });
});
