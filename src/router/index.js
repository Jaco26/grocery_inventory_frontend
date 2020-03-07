import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/404.vue'
import Container from '../views/Container.vue'
import Home from '../views/Home.vue'
import Stock from '../views/Stock.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Container,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/@*',
        name: 'Stock',
        component: Stock,
      }
    ],
  },
  {
    path: '*',
    name: '404-not-found',
    component: NotFound,
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
