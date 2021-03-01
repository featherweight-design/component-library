import { checkboxCopy } from 'shared/data/copyContent';

describe('Checkbox Disabled tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-form-checkbox', 'disabled');
  });

  it('Should be displayed', () => {
    cy.findByText(checkboxCopy.disabled);
  });

  it('Should be disabled', () => {
    cy.findByText(checkboxCopy.disabled)
      .siblings('input')
      .should('be.disabled');
  });

  it('Should be not be checked', () => {
    cy.findByText(checkboxCopy.disabled)
      .siblings('input')
      .should('not.be.checked');
  });

  it('Should be checked', () => {
    cy.findByText(checkboxCopy.disabledChecked)
      .siblings('input')
      .should('be.checked');
  });
});
