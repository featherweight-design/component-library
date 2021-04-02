import { checkboxCopy, otherOptionCopy } from 'shared/data/copyContent';

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

    cy.findByLabelText(checkboxCopy.other).check({ force: true });

    cy.findByLabelText(otherOptionCopy.label).type(expected);
    cy.findByLabelText(otherOptionCopy.label).should('have.value', expected);
  });

  it('Should remove value from "Other" if unchecked', () => {
    cy.findByLabelText(checkboxCopy.other).uncheck({ force: true });
    cy.findByLabelText(otherOptionCopy.label).should('not.have.value');
  });
});
