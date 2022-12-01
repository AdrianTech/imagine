import { createRouter, createWebHistory, onBeforeRouteUpdate, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import NotFound from '../views/NotFound.vue';
import Admin from '../views/Admin/Main.vue'
import Login from '../views/Login.vue'
import Cart from '../views/Cart.vue';
import { loggedGuard } from './guards/logged.guard';
import Transaction from '../components/products/Transaction.vue';
import { admin } from './admin'
import { useAuthStore } from '@/stores/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: ProductView,
  },
  {
    path: '/product/:id',
    name: 'productDetails',
    component: () => import(/* webpackChunkName: "about" */ '../components/products/Details.vue'),
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    // beforeEnter: (to, from, next) => {
    //   const store = useAuthStore()
    //   // if (store.isLogged) next();
    // }
  },
  {
    path: '/zakup',
    name: 'transaction',
    component: Transaction,
  },
  {
    path: '/kontakt',
    name: 'contact',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Contact.vue')
  },
  {
    path: '/koszyk',
    name: 'cart',
    component: Cart
  },
  // {
  //   path: '/admin',
  //   name: "admin",
  //   component: Admin,
  //   beforeEnter: [routeGuard]
  // },
  {
    path: '/profile',
    name: "profile",
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
    beforeEnter: [loggedGuard]
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...routes, ...admin]
})

export default router
