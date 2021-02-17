import { sideNavigationCopy } from 'shared/data/copyContent';

const { collapse } = sideNavigationCopy;

describe('SideNavigation with Collapse Initial State', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory(
      'components-navigation-sidenavigation',
      'with-collapse-initial-state'
    );
  });

  it('Should be collapsed by default', () => {
    cy.findByText(collapse).should('not.be.visible');
  });

  it('Should open when clicked', () => {
    cy.findByText(collapse).click();

    cy.findByText(collapse).should('be.visible');
  });
});
