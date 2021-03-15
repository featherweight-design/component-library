import { revealCopy } from 'shared/data/copyContent';

describe('Reveal default tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-reveal', 'default');
  });

  it('Should have a toggle button', () => {
    cy.findByText(revealCopy.toggleButtonText);
  });

  it('Should not have the hidden button visible', () => {
    cy.findByText(revealCopy.hiddenButtonText).should('not.be.visible');
  });

  it('Should reveal the hidden button when clicking the toggle button', () => {
    cy.findByText(revealCopy.toggleButtonText).click();
    cy.findByText(revealCopy.hiddenButtonText).should('be.visible');
  });
});
