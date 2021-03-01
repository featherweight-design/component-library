import { checkboxCopy } from 'shared/data/copyContent';

describe('Checkbox Disabled tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-form-checkbox', 'disabled');
  });

  it('Should be displayed', () => {
    cy.findByText(checkboxCopy.disabled);
  });

  it('Should have both options disabled', () => {
    cy.findByText(checkboxCopy.disabled)
      .siblings('input')
      .should('be.disabled');
  });

  it('Should not have the first option checked', () => {
    cy.findByText(checkboxCopy.disabled)
      .siblings('input')
      .should('not.be.checked');
  });

  it('Should have the second option checked', () => {
    cy.findByText(checkboxCopy.disabledChecked)
      .siblings('input')
      .should('be.checked');
  });
});
