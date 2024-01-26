import { createWebHistory, createRouter } from 'vue-router';
import HomeView from '../views/homeView/HomeView.vue';
import CreateView from '../views/createView/CreateView.vue';
import ProductDetailsView from '../views/productDetailsView/ProductDetailsView.vue';
import NotFoundPageVue from '../views/notFoundPage/NotFoundPage.vue';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
    },
    {
      path: '/product/:id',
      name: 'details',
      component: ProductDetailsView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found-page',
      component: NotFoundPageVue,
    },
  ],
});
