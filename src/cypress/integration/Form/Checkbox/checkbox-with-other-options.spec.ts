import { checkboxCopy } from 'shared/data/copyContent';

describe('Checkbox With Other Options tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-form-checkbox', 'with-other-options');
  });

  it('Should be displayed', () => {
    cy.findByText(checkboxCopy.bestIceCream);
  });

  it('Should accept new values in "Other"', () => {
    const expected = 'Strawberry';
    cy.findByText(checkboxCopy.other)
      .siblings('input')
      .check({ force: true });

    cy.get('.fd-other-option__input').type(expected);

    cy.get('.fd-other-option__input').should('have.value', expected);
  });

  it('Should remove value from "Other" if unchecked', () => {
    cy.get('.fd-other-option')
      .siblings('input')
      .uncheck({ force: true });

    cy.get('.fd-other-option__input').should('not.have.value');
  });
});
