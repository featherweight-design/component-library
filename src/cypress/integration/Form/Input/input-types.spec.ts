import { inputCopy } from 'shared/data/copyContent';

describe('Input Types tests', () => {
  before(() => {
    cy.visitStorybook();
    cy.loadStory('components-form-input', 'types');
  });

  describe('Text input', () => {
    it('Should be displayed', () => {
      cy.findByLabelText(inputCopy.textLabel);
    });

    it('Should have a placeholder', () => {
      cy.findAllByPlaceholderText(inputCopy.placeholder).first();
    });

    it('Should accept a value', () => {
      const expectedValue = 'stuff';

      cy.findByLabelText(inputCopy.textLabel).type(expectedValue);

      cy.findByLabelText(inputCopy.textLabel).should(
        'have.value',
        expectedValue
      );
    });
  });

  describe('Number input', () => {
    it('Should be displayed', () => {
      cy.findByLabelText(inputCopy.numberLabel);
    });

    it('Should have a "%" placeholder', () => {
      cy.findByPlaceholderText(inputCopy.numberPlaceholder);
    });

    it('Should accept number values', () => {
      const expectedValue = '1234';

      cy.findByLabelText(inputCopy.numberLabel).type(expectedValue);

      cy.findByLabelText(inputCopy.numberLabel).should(
        'have.value',
        expectedValue
      );

      cy.findByLabelText(inputCopy.numberLabel).clear();
    });

    it('Should not accept non-integers', () => {
      const expectedValue = '';

      cy.findByLabelText(inputCopy.numberLabel).type('abc');

      cy.findByLabelText(inputCopy.numberLabel).should(
        'have.value',
        expectedValue
      );
    });
  });

  describe('Disabled input', () => {
    it('Should be displayed', () => {
      cy.findByLabelText(inputCopy.disabledLabel);
    });

    it('Should have the input disabled', () => {
      cy.findByLabelText(inputCopy.disabledLabel).should('be.disabled');
    });
  });

  describe('Error input', () => {
    it('Should be displayed', () => {
      cy.findByLabelText(inputCopy.errorLabel);
    });

    it('Should start with an error message', () => {
      cy.findByText(inputCopy.errorMessage);
    });

    it('Should remove the error message when a value is entered', () => {
      cy.findByLabelText(inputCopy.errorLabel).type('123');

      cy.findByText(inputCopy.errorMessage).should('not.exist');
    });
  });
});
