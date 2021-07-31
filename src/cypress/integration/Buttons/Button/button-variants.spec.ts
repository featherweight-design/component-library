import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react';

import * as stories from 'components/Buttons/Button/Button.stories';
import { buttonCopy } from 'shared/data/copyContent';

describe('Button Variants tests', () => {
  const { Variants } = composeStories(stories);

  mount(Variants);

  it('Should have a "Default" button', () => {
    cy.findByText(buttonCopy.default).closest('button');
  });

  it('Should have a "Default Destructive" button', () => {
    cy.findByText(buttonCopy.defaultDestructive).closest('button');
  });

  it('Should have a "Brand" button', () => {
    cy.findByText(buttonCopy.brand).closest('button');
  });

  it('Should have a "Neutral" button', () => {
    cy.findByText(buttonCopy.neutral).closest('button');
  });

  it('Should have a "Outline" button', () => {
    cy.findByText(buttonCopy.outline).closest('button');
  });

  it('Should have a "Destructive" button', () => {
    cy.findByText(buttonCopy.destructive).closest('button');
  });

  it('Should have a "Outline Destructive" button', () => {
    cy.findByText(buttonCopy.outlineDestructive).closest('button');
  });

  it('Should have a "Glass" button', () => {
    cy.findByText(buttonCopy.glass).closest('button');
  });
});
