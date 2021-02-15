import { headerMenuCopy } from 'shared/data/copyContent';

describe('HeaderMenu with Sub Options tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-navigation-headermenu', 'with-sub-options');
  });

  it('Should have a settings icon', () => {
    cy.findByText(headerMenuCopy.icons.settings);
  });

  it('Should open a menu when the settings icon is clicked', () => {
    cy.findByText(headerMenuCopy.icons.settings).click();
    cy.findByRole('menu');
  });

  it('Should have a title in the menu', () => {
    cy.findByText(headerMenuCopy.menuTitle);
  });

  it('Should have a user name in the menu', () => {
    cy.findByText(headerMenuCopy.userName);
  });

  it('Should have four menu items in the menu', () => {
    cy.findByText(headerMenuCopy.subOptionLabels.userManagement);
    cy.findByText(headerMenuCopy.subOptionLabels.permissions);
    cy.findByText(headerMenuCopy.subOptionLabels.support);
    cy.findAllByText(headerMenuCopy.subOptionLabels.info).last();
  });

  it('Should close the menu when clicking the settings icon', () => {
    cy.findByText(headerMenuCopy.icons.settings).click();
    cy.findByRole('menu').should('not.be.visible');
  });

  it('Should close the menu when clicking off the menu', () => {
    cy.findByText(headerMenuCopy.icons.settings).click();
    cy.findByRole('menubar').click();
    cy.findByRole('menu').should('not.be.visible');
  });

  it('Should close the menu when selecting an option', () => {
    cy.findByText(headerMenuCopy.icons.settings).click();
    // Test fails when clicking the text, so target the actual menu item
    cy.findByText(headerMenuCopy.subOptionLabels.userManagement)
      .closest('div[role="link"]')
      .click();
    cy.findByRole('menu').should('not.be.visible');
  });
});
