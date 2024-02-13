import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/UserLayoutView.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/UserHomeView.vue')
      },
      {
        path: 'products',
        name: '產品列表',
        component: () => import('@/views/UserProductsView.vue')
      },
      {
        path: 'product/:id',
        name: '產品詳細頁面',
        component: () => import('@/views/UserProductView.vue')
      },
      {
        path: 'cart',
        name: '購物車',
        component: () => import('@/views/UserCartView.vue')
      }
    ]
  },
  {
    path: '/adminLogin',
    name: '登入',
    component: () => import('@/views/AdminLoginView.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/AdminView.vue'),
    children: [
      {
        path: 'products',
        name: '後台產品列表',
        component: () => import('@/views/AdminProductsView.vue')
      },
      {
        path: 'order',
        name: '後台訂單列表',
        component: () => import('@/views/AdminOrderView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
