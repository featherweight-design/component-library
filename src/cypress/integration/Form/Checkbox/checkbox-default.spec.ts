import { checkboxCopy } from 'shared/data/copyContent';

describe('Checkbox Default tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-form-checkbox', 'default');
  });

  it('Should be displayed', () => {
    cy.findByText(checkboxCopy.bestDogs);
  });

  it('Should start with the first option selected', () => {
    cy.findByLabelText(checkboxCopy.torin).should('be.checked');
  });
});
