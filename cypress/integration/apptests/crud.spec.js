/// <reference types="Cypress" />

describe('Crud tests', () => {
  const getStore = () => cy.window().its('app.$store');

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

  context('Form submission from fixtures', () => {
    before(() => {
      cy.server();
    });

    it('load data from fixtures', () => {
      cy.fixture('crud').then(json => {
        json.map(item => {
          cy.get('.link-input')
            .clear()
            .type(item.url)
            .type('{enter}');
        });
        cy.get('.url-list li').should('have.length', 6);
      });
    });
  });

  it('starts with the store having all the default properties', () => {
    getStore()
      .its('state')
      .should('have.keys', [
        'books',
        'relatedBooks',
        'searching',
        'searchingRelated',
        'searchError',
        'title',
        'links'
      ]);
  });

  it('starts with store initialized with defaults', () => {
    getStore()
      .its('state')
      .should('deep.equal', {
        books: [],
        relatedBooks: [],
        searching: false,
        searchingRelated: false,
        searchError: false,
        title: 'Basic CRUD Sample',
        links: [
          'http://google.com',
          'https://ers-hcl.github.io',
          'https://github.com/ERS-HCL'
        ]
      });
  });

  context('Store operations', () => {
    before(() => {
      cy.server();
    });

    it('ADD_LINK mutation changes the state', () => {
      getStore()
        .its('state.links')
        .as('currentCount');
      cy.get('@currentCount').then(links => {
        const origCount = links.length;
        getStore().then(store => {
          store.commit('ADD_LINK', 'new link');
        });

        getStore()
          .its('state.links')
          .should('contains', 'new link')
          .should('have.length', origCount + 1);
      });
    });
    it('REMOVE_LINK mutation changes the state', () => {
      getStore()
        .its('state.links')
        .as('currentCount');
      cy.get('@currentCount').then(links => {
        const origCount = links.length;
        getStore().then(store => {
          store.commit('REMOVE_LINK', 1);
        });

        getStore()
          .its('state.links')
          .should('contains', 'new link')
          .should('have.length', origCount - 1);
      });
    });
  });
});
