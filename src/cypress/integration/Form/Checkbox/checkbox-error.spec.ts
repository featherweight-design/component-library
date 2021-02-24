import { checkboxCopy } from 'shared/data/copyContent';

describe('checkbox-error-tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-form-checkbox', 'error');
  });

  it('Should start with an error message', () => {
    cy.findByText(checkboxCopy.errorMessage);
  });

  it('Should remove the error message when a choice is made', () => {
    cy.findByLabelText(checkboxCopy.cat).click({ force: true });
    cy.findByText(checkboxCopy.errorMessage).should('not.exist');
  });
});
