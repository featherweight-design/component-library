import { sideNavigationCopy } from 'shared/data/copyContent';

const { icons, logoTitle } = sideNavigationCopy;

describe('SideNavigation with Logo and Title tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-navigation-sidenavigation', 'with-logo-and-title');
  });

  it('Should show a logo image', () => {
    cy.findByAltText(logoTitle);
  });

  it('Should show a logo title', () => {
    cy.findByText(logoTitle);
  });

  it('Should show a back button', () => {
    cy.findByText(icons.back).should('be.visible');
  });

  it('Should hide the back button when clicked', () => {
    cy.findByText(icons.back).click();
    cy.findByText(icons.back).should('not.be.visible');
  });
});
