import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/jsfiddle',
      name: 'jsfiddle',
      // route level code-splitting
      // this generates a separate chunk (jsfiddle.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "jsfiddle" */ '@/views/Jsfiddle.vue'),
    },
    {
      path: '/html2image',
      name: 'html2image',
      component: () => import('@/views/html2image.vue'),
    },
    {
      path: '/hottable',
      name: 'hottable',
      component: () => import('@/views/hot-table.vue'),
    },
  ],
});
