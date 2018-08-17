<template>
<div class="stats">
    <h1>A different component</h1>
    <p>There are currently {{ countLinks }} links</p>

    <button v-on:click="removeAllLinks">Remove all links</button>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'stats',
  data() {
    return {
      msg: ''
    };
  },
  computed: {
    ...mapGetters(['countLinks'])
  },
  methods: {
    ...mapMutations(['REMOVE_ALL']),
    ...mapActions(['removeAll']),
    removeAllLinks() {
      this.removeAll().then(() => {
        this.msg = 'They have been removed';
      });
    }
  }
};
</script>

<style scoped>
button {
  padding: 10px;
  margin-top: 30px;
  width: 100%;
  background: none;
  border: 1px solid lightgray;
  outline: 0;
  cursor: pointer;
}
</style>
