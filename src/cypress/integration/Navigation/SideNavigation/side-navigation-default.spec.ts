import { sideNavigationCopy } from 'shared/data/copyContent';

const { collapse, icons, optionLabels, subOptionLabels } = sideNavigationCopy;

const SELECTED_OPTION_CLASS = '.fd-side-navigation__option-menu-selected';
const SELECTED_SUB_OPTION_CLASS = '.fd-side-navigation__sub-option-selected';

describe('SideNavigation default tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-navigation-sidenavigation', 'default');
  });

  it('Should have four menu options', () => {
    cy.findByText(optionLabels.user);
    cy.findByText(optionLabels.games);
    cy.findByText(optionLabels.help);
    cy.findByText(optionLabels.settings);
  });

  it('Should have an icon for each menu option', () => {
    cy.findByText(icons.user);
    cy.findByText(icons.games);
    cy.findByText(icons.help);
    cy.findByText(icons.settings);
  });

  it('Should have the "User" option selected by default and show a list of sub-options', () => {
    cy.get(SELECTED_OPTION_CLASS).should('contain.text', optionLabels.user);
    cy.get(SELECTED_SUB_OPTION_CLASS).should(
      'contain.text',
      subOptionLabels.myInfo
    );

    cy.findByText(subOptionLabels.myInfo).should('be.visible');
    cy.findByText(subOptionLabels.notifications).should('be.visible');
    cy.findByText(subOptionLabels.logout).should('be.visible');
  });

  it('Should be able to open the "Games" option and show a list of sub-options', () => {
    cy.findByText(subOptionLabels.allGames).should('not.be.visible');
    cy.findByText(subOptionLabels.rpg).should('not.be.visible');
    cy.findByText(subOptionLabels.racing).should('not.be.visible');
    cy.findByText(subOptionLabels.puzzle).should('not.be.visible');

    cy.findByText(optionLabels.games).click();

    cy.findByText(subOptionLabels.allGames).should('be.visible');
    cy.findByText(subOptionLabels.rpg).should('be.visible');
    cy.findByText(subOptionLabels.racing).should('be.visible');
    cy.findByText(subOptionLabels.puzzle).should('be.visible');
  });

  it('Should be able to select a sub-option in "Games"', () => {
    cy.findByText(subOptionLabels.puzzle).click();

    cy.get(SELECTED_OPTION_CLASS).should('contain.text', optionLabels.games);
    cy.get(SELECTED_SUB_OPTION_CLASS).should(
      'contain.text',
      subOptionLabels.puzzle
    );
  });

  it('Should be able to open the "Help" option and show a list of sub-options', () => {
    cy.findByText(subOptionLabels.contact).should('not.be.visible');
    cy.findByText(subOptionLabels.feedback).should('not.be.visible');

    cy.findByText(optionLabels.help).click();

    cy.findByText(subOptionLabels.contact).should('be.visible');
    cy.findByText(subOptionLabels.feedback).should('be.visible');
  });

  it('Should be able to select a sub-option in "Help"', () => {
    cy.findByText(subOptionLabels.contact).click();

    cy.get(SELECTED_OPTION_CLASS).should('contain.text', optionLabels.help);
    cy.get(SELECTED_SUB_OPTION_CLASS).should(
      'contain.text',
      subOptionLabels.contact
    );
  });

  it('Should be able to select the "Settings" option', () => {
    cy.findByText(optionLabels.settings).click();

    cy.get(SELECTED_OPTION_CLASS).should('contain.text', optionLabels.settings);
  });

  it('Should be able to collapse and un-collapse the menu', () => {
    cy.findByText(collapse).click();

    cy.findByText(collapse).should('not.be.visible');

    cy.findByText(collapse).click();

    cy.findByText(collapse).should('be.visible');
  });
});
