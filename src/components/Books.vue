<template>
<div class="books">
  <div class="searchBox">
    <form @submit.prevent="doSearch">
      <input v-model="search" type="search" placeholder="Enter the book search term (e.g. India,Sports etc).">
    </form>
   
  </div>
  <div class="allResults">
    <div v-if="Object.keys(books).length" class="result" >
      <h2>Results</h2>
      <p><i>Click the cover to find similar books...</i></p>
      <div v-for="(book,index) in books" class="bookResult" v-bind:key="index">
        <img :src="book.image_url" class="bookResult" @click="findSimilar(book)">
        {{book.title}}
      </div>
    </div> 
    <div v-else class="result placeholder" >
      <div v-if="searching"><h2>Find books</h2><BookSkeleton v-bind:skCount="2"></BookSkeleton></div>
      <div v-else ><h2>Find books</h2></div>
      <div v-if="searchError"><i>Unable to search right now , please try again later ...</i></div>
    </div>

    <div v-if="relatedBooks.length" class="result" >
      <h2>Books Related to {{ selectedBook.title }}</h2>
      <div v-for="(book,index) in relatedBooks" class="bookResult" v-bind:key="index">
        <img :src="book.image_url" class="bookResult" @click="findSimilar(book)">
        {{book.title}}
      </div>
    </div>
    <div v-else class="result placeholder" >
      <div v-if="searchingRelated"><h2>Find book selection based recommendations</h2><BookSkeleton v-bind:skCount="2"></BookSkeleton></div>
      <div v-else ><h2>Find book selection based recommendations</h2></div>
      <div v-if="searchError"><i>Unable to search right now , please try again later ...</i></div>
    </div>

  </div>
  
</div>


</template>

<script>
import { mapState, mapActions } from 'vuex';
import BookSkeleton from '@/components/BookSkeleton.vue';

const defaultBook = {
  name: 'India',
  id: 45195
};
export default {
  name: 'Books',
  data() {
    return {
      search: defaultBook.name,
      selectedBook: defaultBook
    };
  },
  created() {
    this.clearAllBooks();
    this.searchBooks(this.search);
    this.searchRelatedBooks(this.selectedBook);
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
    ...mapState([
      'books',
      'relatedBooks',
      'searching',
      'searchingRelated',
      'searchError'
    ])
  },
  components: {
    BookSkeleton
  }
};
</script>

<style scoped>
.books {
  display: block;
}

div.bookResult {
  clear: left;
}

img.bookResult {
  float: left;
  margin-right: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 10px;
}

.searchBox {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 10px;
  margin: 5px;
}

.allResults {
  display: flex;
  padding: 10px;
  padding-top: 0;
  margin-top: 0px;
}

.allResults .result {
  padding: 10px;
  background: white;
  flex: 1;
  width: 0;
}

.placeholder {
  height: 100em;
}
</style>
