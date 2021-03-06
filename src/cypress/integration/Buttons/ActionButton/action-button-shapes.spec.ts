import { actionButtonCopy } from 'shared/data/copyContent';

describe('ActionButton Shapes tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-buttons-actionbutton', 'shapes');
  });

  it('Should have a "Rounded Square" button', () => {
    cy.findByText(actionButtonCopy.roundedSquare).siblings('button');
  });

  it('Should have a "Round" button', () => {
    cy.findByText(actionButtonCopy.round).siblings('button');
  });

  it('Should have a "Square" button', () => {
    cy.findByText(actionButtonCopy.square).siblings('button');
  });
});
