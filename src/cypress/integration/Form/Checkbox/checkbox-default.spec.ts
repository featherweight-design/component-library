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
    cy.findByLabelText(checkboxCopy.torin);
  });

  // it('Should be able to select different values', () => {
  //   cy.findByLabelText(checkboxCopy.juniper).click();
  //   expect(cy.findByLabelText(checkboxCopy.juniper)).checked();
  // });
});
