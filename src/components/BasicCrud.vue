<template>
  <div class="container">
    <div class="left">
      <h1>{{ title }}</h1>
      <!-- Add the form here -->

      <form @submit.prevent="addLink">
        <input class="link-input" type="text" autoFocus placeholder="Add a Link" v-model="newLink" />
      </form>
      <ul class="url-list">
        <li v-for="(link, index) in links" v-bind:key="index">
          {{link}}
          <button v-on:click="removeLinks(index)" class="rm" >Remove</button>
          </li>
      </ul>
    </div>
    <div class="right">
      <stats /> 
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Stats from '@/components/Stats.vue';
export default {
  name: 'BasicCrud',
  data() {
    return {
      newLink: ''
    };
  },
  methods: {
    ...mapMutations(['ADD_LINK']),
    ...mapActions(['removeLink']),
    addLink: function() {
      this.ADD_LINK(this.newLink);
      this.newLink = '';
    },
    removeLinks: function(link) {
      this.removeLink(link);
    }
  },
  computed: {
    ...mapState(['title', 'links'])
  },
  components: {
    Stats
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
html,
#app,
.home {
  height: 100%;
}
body {
  background-color: #f4f4f4;
  margin: 0;
  height: 100%;
}

.container {
  display: flex;
  padding: 10px;
}

.container .left,
.right {
  flex: 1;
  width: 0;
  margin-right: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}
ul li {
  padding: 20px;
  background: white;
  margin-bottom: 8px;
}

.right {
  background-color: #e9e9e9;
  margin-right: 0;
}

input {
  border: none;
  border-radius: 15px;
  padding: 20px;
  width: calc(100% - 40px);
  box-shadow: 0 5px 5px lightgrey;
  margin-bottom: 50px;
  outline: none;
}

.rm {
  border-radius: 15px;
  float: right;
  text-transform: uppercase;
  font-size: 0.8em;
  background: #f9d0e3;
  border: none;
  padding: 5px;
  color: #ff0076;
  cursor: pointer;
}

.rm:hover {
  background: #ff0076;
  color: white;
}
</style>
