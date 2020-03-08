import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/404-not-found.vue'
import Container from '@/views/container/index'
import HomePage from '@/views/container/home'

import StockContainer from '@/views/container/stock'
import StockIndexPage from '@/views/container/stock/index'
import StockItemPage from '@/views/container/stock/stock-item'

import FoodCategoryPage from '@/views/container/food-category'
import FoodKindPage from '@/views/container/food-kind'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Container,
    children: [
      {
        path: '',
        name: 'home',
        component: HomePage
      },
      {
        path: '/stock/:stock_id',
        component: StockContainer,
        children: [
          {
            path: '',
            name: 'stock',
            component: StockIndexPage
          },
          {
            path: 'item/:item_id',
            name: 'stock-item',
            component: StockItemPage,
          }
        ]
      },
      // {
      //   path: '/stock/:stock_id/item/:item_id',
      //   name: 'stock-item',
      //   component: StockItemPage,
      // },
      {
        path: '/food-category/:food_category_id',
        name: 'food-category',
        component: FoodCategoryPage,
      },
      {
        path: '/food-kind/:food_kind_id',
        name: 'food-kind',
        component: FoodKindPage
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
