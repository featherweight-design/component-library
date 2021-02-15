import { headerMenuCopy } from 'shared/data/copyContent';

describe('HeaderMenu with Indicator tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-navigation-headermenu', 'with-indicator');
  });

  it('Should have a notifications icon', () => {
    cy.findByText(headerMenuCopy.icons.notifications);
  });

  it('Should have a notifications indicator', () => {
    cy.findByRole('alert');
  });
});
