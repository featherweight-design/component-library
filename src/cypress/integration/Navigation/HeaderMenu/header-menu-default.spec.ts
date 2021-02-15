import { headerMenuCopy } from 'shared/data/copyContent';

describe('HeaderMenu default tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-navigation-headermenu', 'default');
  });

  it('Should have a title', () => {
    cy.findByText(headerMenuCopy.defaultTitle);
  });

  it('Should have a sub-title', () => {
    cy.findByText(headerMenuCopy.defaultSubTitle);
  });

  it('Should have a settings option', () => {
    cy.findByText(headerMenuCopy.icons.settings);
  });

  it('Should have a notifications option', () => {
    cy.findByText(headerMenuCopy.icons.notifications);
  });

  it('Should have a search option', () => {
    cy.findByText(headerMenuCopy.icons.search);
  });
});
