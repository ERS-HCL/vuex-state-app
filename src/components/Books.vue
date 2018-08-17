<template>
<div>
  <input v-model="search" type="search">
  <input type="button" @click="doSearch" value="Search">
  <br clear="left">
  <div v-if="searching"><i>Searching...</i></div>

  <div class="allResults">
    <div v-if="books.length" >
      <h2>Results</h2>
      <p><i>Click the cover to find similar books...</i></p>
      <div v-for="(book,index) in books" class="bookResult" v-bind:key="index">
        <img :src="book.image_url" class="bookResult" @click="findSimilar(book)">
        {{book.title}}
      </div>
    </div>

    <div v-if="relatedBooks.length">
      <h2>Books Related to {{ selectedBook.title }}</h2>
      <div v-for="(book,index) in relatedBooks" class="bookResult" v-bind:key="index">
        <img :src="book.image_url" class="bookResult" @click="findSimilar(book)">
        {{book.title}}
      </div>
    </div>

  </div>
  
</div>


</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Books',
  data() {
    return {
      search: '',
      selectedBook: null
    };
  },
  created() {
    this.clearAllBooks();
  },
  methods: {
    ...mapActions(['searchBooks', 'searchRelatedBooks', 'clearAllBooks']),
    doSearch: function() {
      if (this.search === '') return;
      this.searchBooks(this.search);
    },
    findSimilar: function(book) {
      this.selectedBook = book;
      this.searchRelatedBooks(book);
    }
  },
  computed: {
    ...mapState(['books', 'relatedBooks', 'searching'])
  }
};
</script>

<style scoped>
div.bookResult {
  clear: left;
}

img.bookResult {
  float: left;
  margin-right: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}

.allResults {
  display: grid;
  grid-template-columns: 50% 50%;
}
</style>
