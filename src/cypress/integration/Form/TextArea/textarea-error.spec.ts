import { textareaCopy } from 'shared/data/copyContent';

describe('TextArea Error tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-form-textarea', 'error');
  });

  it('Should be displayed', () => {
    cy.findByText(textareaCopy.pirateLore);
  });

  it('Should have an error message', () => {
    cy.findByText(textareaCopy.errorMessage);
  });

  it('Should remove the error message once a value is entered', () => {
    cy.findByText(textareaCopy.pirateLore)
      .siblings('textarea')
      .type('I feel a mean scurvy coming on...');

    cy.findByText(textareaCopy.errorMessage).should('not.exist');
  });
});
