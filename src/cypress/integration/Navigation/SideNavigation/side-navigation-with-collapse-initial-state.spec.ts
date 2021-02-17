import { sideNavigationCopy } from 'shared/data/copyContent';

const { collapse } = sideNavigationCopy;

describe('SideNavigation default tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-navigation-sidenavigation', 'default');
  });

  it('Should be collapsed by default', () => {
    cy.findByText(collapse).should('not.be.visible');
  });

  it('Should open when clicked', () => {
    cy.findByText(collapse).click();

    cy.findByText(collapse).should('be.visible');
  });
});
