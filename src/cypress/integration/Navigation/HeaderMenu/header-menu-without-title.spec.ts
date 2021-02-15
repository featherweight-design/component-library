import { headerMenuCopy } from 'shared/data/copyContent';

describe('HeaderMenu without Title tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-navigation-headermenu', 'without-title');
  });

  it('Should not have a title', () => {
    cy.findByText(headerMenuCopy.defaultTitle).should('not.exist');
  });
});
