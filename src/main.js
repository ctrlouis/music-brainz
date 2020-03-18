import Vue from 'vue';
import VueRouter from 'vue-router';

import './scss/main.scss';

import App from './App.vue';
import HomePage from './components/HomePage.vue';
import Search from './components/Search.vue';
import ArtistDetails from './components/ArtistDetails.vue';
import TrackMore from './components/TrackMore.vue';
import NotFound from './components/NotFound.vue';


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',

  routes: [
    {
      path: "/",
      component: HomePage
    },
    {
      path: "/search/:research",
      component: Search
    },
    {
      path: "/tracks/:research",
      component: TrackMore
    },
    {
      path: "/artists/:id",
      component: ArtistDetails
    },
    {
      path: "*",
      component: NotFound
    }
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
