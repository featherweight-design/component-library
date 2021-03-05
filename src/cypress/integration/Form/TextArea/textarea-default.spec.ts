import { textareaCopy } from 'shared/data/textareaCopy';

describe('Checkbox Default tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-form-checkbox', 'default');
  });

  it('Should be displayed', () => {
    cy.findByText(textareaCopy.bestDogs);
  });

  it('Should start with the first option selected', () => {
    cy.findByLabelText(textareaCopy.torin).should('be.checked');
  });
});
