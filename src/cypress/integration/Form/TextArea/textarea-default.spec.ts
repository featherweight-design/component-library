import { textareaCopy } from 'shared/data/copyContent';

describe('TextArea Default tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-form-textarea', 'default');
  });

  it('Should be displayed', () => {
    cy.findByText(textareaCopy.defaultLabel);
  });
});
