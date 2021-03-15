import { revealCopy } from 'shared/data/copyContent';

describe('Reveal large tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-reveal', 'large-reveal');
  });

  it('Should have a toggle button', () => {
    cy.findByText(revealCopy.toggleLargeButtonText);
  });

  it('Should not have the image visible', () => {
    cy.findByAltText(revealCopy.imageAltText).should('not.be.visible');
  });

  it('Should reveal the image when clicking the toggle button', () => {
    cy.findByText(revealCopy.toggleLargeButtonText).click();
    cy.findByAltText(revealCopy.imageAltText).should('be.visible');
  });
});
