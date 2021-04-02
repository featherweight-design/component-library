import { checkboxCopy } from 'shared/data/copyContent';

describe('Checkbox Disabled tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-form-checkbox', 'disabled');
  });

  it('Should be displayed', () => {
    cy.findByText(checkboxCopy.disabledLabel);
  });

  it('Should have both options disabled', () => {
    cy.findByLabelText(checkboxCopy.disabled).should('be.disabled');
  });

  it('Should not have the first option checked', () => {
    cy.findByLabelText(checkboxCopy.disabled).should('not.be.checked');
  });

  it('Should have the second option checked', () => {
    cy.findByLabelText(checkboxCopy.disabledChecked).should('be.checked');
  });
});
