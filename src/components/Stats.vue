<template>
<div class="stats">
    <h1>Remove All Links</h1>
    <p>There are currently {{ countLinks }} links</p>

    <button v-on:click="removeAllLinks" class="stats-btn" data-cy="removeall-btn" :disabled="countLinks == 0">Remove all links</button>
    <p v-if="countLinks == 0">{{ msg }}</p>
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
        this.msg = 'All links have been removed';
      });
    }
  }
};
</script>

<style>
.stats {
  display: block;
  align-items: center;
  text-align: center;
}
.stats-btn {
  padding: 10px;
  border-radius: 25px;
  margin-top: 30px;
  width: 90%;
  background: none;
  border: 1px solid lightgray;
  outline: 0;
  cursor: pointer;
}

.stats-btn:hover {
  color: white;
  background: black;
}
</style>
