/// <reference types="Cypress" />

describe('Crud tests', () => {
  before(() => {
    cy.visit('/');
  });

  it('loads', () => {
    cy.contains('Basic CRUD Sample');
  });

  it('focuses input on load', () => {
    cy.focused().should('have.class', 'link-input');
  });

  it('accepts input', () => {
    const typedText = 'Add a Link';

    cy.get('.link-input')
      .type(typedText)
      .should('have.value', typedText);
  });

  context('Form submission', () => {
    before(() => {
      cy.server();
    });

    it('Adds a new url on submit', () => {
      const itemText = 'www.github.com';

      cy.get('.link-input')
        .clear()
        .type(itemText)
        .type('{enter}')
        .should('have.value', '');

      cy.get('.url-list li')
        .should('have.length', 4)
        .and('contain', itemText);
    });

    it('Removes newly added url on submit', () => {
      const itemText = 'www.github.com';

      cy.get('ul>li')
        .contains(itemText)
        .and('contain', itemText)
        .children('.rm')
        .click();
    });

    it('removes all entries', () => {
      cy.get('[data-cy=removeall-btn]').click();
      cy.get('.url-list li').should('have.length', 0);

      cy.contains('There are currently 0 links');
    });
  });
});
