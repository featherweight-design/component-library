describe('Action Button Variants Without Labels tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-buttons-actionbutton', 'variants-without-label');
  });

  it('Should have an ActionButton without a label for each variant', () => {
    cy.findAllByRole('button').should('have.length', 3);
  });
});

// Empty export to remove TS --isolatedModules error (https://stackoverflow.com/a/56577324)
export {};
