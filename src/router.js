import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import BasicCrud from './components/BasicCrud.vue';
import Books from './components/Books.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sample1',
      name: 'sample1',
      component: BasicCrud
    },
    {
      path: '/books',
      name: 'books',
      component: Books
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});
