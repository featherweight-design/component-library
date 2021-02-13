import { inputCopy } from 'shared/data/copyContent';

describe('Input Types tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-form-input', 'types');
  });

  describe('Text input', () => {
    it('Should be displayed', () => {
      cy.findAllByText(inputCopy.label).first();
    });

    it('Should accept a value', () => {
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
  });

  describe('Number input', () => {
    it('Should be displayed', () => {
      cy.findAllByText(inputCopy.number);
    });

    it('Should accept number values', () => {
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

    it('Should not accept non-integers', () => {
      const expectedValue = '';

      cy.findAllByText(inputCopy.number)
        .first()
        .siblings('input')
        .type('abc');

      cy.findAllByText(inputCopy.number)
        .first()
        .siblings('input')
        .should('have.value', expectedValue);
    });
  });

  describe('Disabled input', () => {
    it('Should be displayed', () => {
      cy.findAllByText(inputCopy.disabled);
    });

    it('Should have the input disabled', () => {
      cy.findByText(inputCopy.disabled)
        .siblings('input')
        .should('be.disabled');
    });
  });

  describe('Error input', () => {
    it('Should be displayed', () => {
      cy.findAllByText(inputCopy.label).last();
    });

    it('Should start with an error message', () => {
      cy.findAllByText(inputCopy.errorMessage);
    });

    it('Should remove the error message when a value is entered', () => {
      cy.findAllByText(inputCopy.label)
        .last()
        .siblings('input')
        .type('123');

      cy.findAllByText(inputCopy.errorMessage).should('not.exist');
    });
  });
});
