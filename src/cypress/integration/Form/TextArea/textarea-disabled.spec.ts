import { textareaCopy } from 'shared/data/copyContent';

describe('TextArea Disabled tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-form-textarea', 'disabled');
  });

  it('Should be displayed', () => {
    cy.findByText(textareaCopy.disabledLabel);
  });

  it('Should start as disabled', () => {
    cy.findByText(textareaCopy.disabledLabel)
      .siblings('textarea')
      .should('be.disabled');
  });

  it('Should start with a preset message', () => {
    cy.findByText(textareaCopy.disabledLabel)
      .siblings('textarea')
      .should('have.value', textareaCopy.disabledMessage);
  });
});
