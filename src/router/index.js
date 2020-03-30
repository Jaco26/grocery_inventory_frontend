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
        component: HomePage,
        meta: {
          breadcrumbs: [
            {
              text: 'Dashboard'
            }
          ]
        }
      },
      {
        path: '/stock/:stock_id',
        component: StockContainer,
        children: [
          {
            path: '',
            name: 'stock',
            component: StockIndexPage,
            meta: {
              breadcrumbs: [
                {
                  to: 'home',
                  text: 'Dashboard',
                },
                {
                  text: getters => getters['stock/SELECTED_STOCK'].name,
                },
              ]
            }
          },
          {
            path: 'item/:item_id',
            name: 'stock-item',
            component: StockItemPage,
            meta: {
              breadcrumbs: [
                {
                  to: 'home',
                  text: 'Dashboard',
                },
                {
                  to: 'stock',
                  text: getters => getters['stock/SELECTED_STOCK'].name,
                },
                {
                  text: getters => getters['stock/stockItem/SELECTED_STOCK_ITEM'].food_kind.name,
                }
              ]
            }
          }
        ]
      },
      {
        path: '/food-category/:food_category_id',
        name: 'food-category',
        component: FoodCategoryPage,
        meta: {
          breadcrumbs: [
            {
              to: 'home',
              text: 'Dashboard',
            },
            {
              text: getters => getters['foodCategory/SELECTED_FOOD_CATEGORY'].name
            }
          ]
        }
      },
      {
        path: '/food-kind/:food_kind_id',
        name: 'food-kind',
        component: FoodKindPage,
        meta: {
          breadcrumbs: [
            {
              to: 'home',
              text: 'Dashboard',
            },
            {
              text: getters => getters['foodKind/SELECTED_FOOD_KIND'].name
            }
          ]
        }
      }
    ],
  },
  {
    path: '*',
    name: '404-not-found',
    component: NotFound,
    meta: {
      breadcrumbs: [
        {
          to: 'home',
          text: 'Dashboard',
        },
        {
          text: '404 Not Found'
        }
      ]
    }
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
