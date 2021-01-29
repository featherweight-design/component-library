import { buttonCopy } from 'shared/data/copyContent';

describe('Button Shapes tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-buttons-button', 'shapes');
  });

  it('Should have a "Rounded Square" button', () => {
    cy.findByText(buttonCopy.roundedSquare);
  });

  it('Should have a "Round" button', () => {
    cy.findByText(buttonCopy.round);
  });

  it('Should have a "Square" button', () => {
    cy.findByText(buttonCopy.square);
  });
});
