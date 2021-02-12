import { inputCopy } from 'shared/data/copyContent';

describe('Input', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-form-input', 'types');
  });
  it('Should have a text input', () => {
    cy.findAllByText(inputCopy.label).first();
  });

  it('Should have an input with an error', () => {
    cy.findAllByText(inputCopy.label).last();
  });

  it('Should have a number input', () => {
    cy.findAllByText(inputCopy.number);
  });

  it('The text input should accept a value', () => {
    const expectedValue = 'stuff';
    cy.findAllByText(inputCopy.label)
      .first()
      .siblings('input')
      .type(expectedValue);

    cy.findAllByText(inputCopy.label)
      .first()
      .siblings('input')
      .should('have.value', expectedValue);
  });

  it('The number input should accept numbers', () => {
    const expectedValue = '1234';
    cy.findAllByText(inputCopy.number)
      .first()
      .siblings('input')
      .type(expectedValue);

    cy.findAllByText(inputCopy.number)
      .first()
      .siblings('input')
      .should('have.value', expectedValue);

    cy.findAllByText(inputCopy.number)
      .first()
      .siblings('input')
      .clear();
  });

  it('The number input should not accept non-integers', () => {
    const expectedValue = 'abc';
    cy.findAllByText(inputCopy.number)
      .first()
      .siblings('input')
      .type(expectedValue);

    cy.findAllByText(inputCopy.number)
      .first()
      .siblings('input')
      .should('have.value', '');
  });

  it('The error input should start with an error message', () => {
    cy.findAllByText(inputCopy.errorMessage);
  });

  it('The error input should remove error if value is present', () => {
    cy.findAllByText(inputCopy.label)
      .last()
      .siblings('input')
      .type('123');

    cy.findAllByText(inputCopy.errorMessage).should('not.exist');
  });

  it('Should have a disabled input', () => {
    cy.findAllByText(inputCopy.disabled);
  });

  it('The disabled input should start as disabled', () => {
    cy.findByText(inputCopy.disabled)
      .siblings('input')
      .should('be.disabled');
  });
});
