import Vue from 'vue';
import Vuex from 'vuex';
import fetch from 'unfetch'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
  },
  getters: {
    countLinks: state => {
      return state.links.length;
    }
  },
  mutations: {
    ADD_BOOKS: (state, books) => {
      state.books = books;
    },
    ADD_RELATED_BOOKS: (state, books) => {
      state.relatedBooks = books;
    },
    SEARCH_STATUS: (state, bool) => {
      state.searching = bool;
    },
    SEARCH_RELATED_STATUS: (state, bool) => {
      state.searchingRelated = bool;
    },
    SEARCH_ERROR: (state, bool) => {
      state.searchError = bool;
    },
    CLEAR_BOOKS: state => {
      state.books = [];
    },
    CLEAR_RELATED_BOOKS: state => {
      state.relatedBooks = [];
    },
    ADD_LINK: (state, link) => {
      state.links.push(link);
    },
    REMOVE_LINK: (state, link) => {
      state.links.splice(link, 1);
    },
    REMOVE_ALL: state => {
      state.links = [];
    }
  },
  actions: {
    clearAllBooks: context => {
      context.commit('SEARCH_STATUS', false);
      context.commit('SEARCH_RELATED_STATUS', false);
      context.commit('SEARCH_ERROR', false);
      context.commit('CLEAR_BOOKS');
      context.commit('CLEAR_RELATED_BOOKS');
    },
    searchBooks: (context, term) => {
      context.commit('SEARCH_STATUS', true);
      context.commit('SEARCH_ERROR', false);
      context.commit('CLEAR_BOOKS');
      context.commit('CLEAR_RELATED_BOOKS');
      fetch(
        `https://openwhisk.ng.bluemix.net/api/v1/web/rcamden%40us.ibm.com_My%20Space/goodreads/search.json?search=${encodeURIComponent(
          term
        )}`
      )
        .then(res => res.json())
        .then(
          res => {
            context.commit('ADD_BOOKS', res.result);
            context.commit('SEARCH_STATUS', false);
          },
          () => {
            context.commit('SEARCH_ERROR', true);
          }
        )
        .catch(() => {
          context.commit('SEARCH_STATUS', false);
          context.commit('SEARCH_ERROR', true);
        });
    },
    searchRelatedBooks: (context, book) => {
      context.commit('CLEAR_RELATED_BOOKS');
      context.commit('SEARCH_RELATED_STATUS', true);
      context.commit('SEARCH_ERROR', false);
      //console.log('find books similar to '+book.id);
      fetch(
        `https://openwhisk.ng.bluemix.net/api/v1/web/rcamden%40us.ibm.com_My%20Space/goodreads/findSimilar.json?id=${encodeURIComponent(
          book.id
        )}`
      )
        .then(res => res.json())
        .then(
          res => {
            context.commit('ADD_RELATED_BOOKS', res.result);
            context.commit('SEARCH_RELATED_STATUS', false);
          },
          () => {
            context.commit('SEARCH_ERROR', true);
          }
        )
        .catch(() => {
          context.commit('SEARCH_RELATED_STATUS', false);
          context.commit('SEARCH_ERROR', true);
        });
    },
    removeLink: (context, link) => {
      context.commit('REMOVE_LINK', link);
    },
    removeAll({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('REMOVE_ALL');
          resolve();
        }, 1500);
      });
    }
  }
});
