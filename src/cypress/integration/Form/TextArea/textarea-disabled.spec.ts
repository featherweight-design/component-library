import { textareaCopy } from 'shared/data/copyContent';

describe('TextArea Disabled tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-form-textarea', 'disabled');
  });

  it('Should be displayed', () => {
    cy.findByLabelText(textareaCopy.disabledLabel);
  });

  it('Should start as disabled', () => {
    cy.findByLabelText(textareaCopy.disabledLabel).should('be.disabled');
  });

  it('Should start with a preset message', () => {
    cy.findByLabelText(textareaCopy.disabledLabel).should(
      'have.value',
      textareaCopy.disabledMessage
    );
  });
});
