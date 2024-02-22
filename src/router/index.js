import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/user/UserLayoutView.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/user/UserHomeView.vue')
      },
      {
        path: 'products',
        name: '產品列表',
        component: () => import('@/views/user/UserProductsView.vue')
      },
      {
        path: 'product/:id',
        name: '產品詳細頁面',
        component: () => import('@/views/user/UserProductView.vue')
      },
      {
        path: 'cart',
        name: '購物車',
        component: () => import('@/views/user/UserCartView.vue')
      }
    ]
  },
  {
    path: '/adminLogin',
    name: '登入',
    component: () => import('@/views/admin/AdminLoginView.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/AdminView.vue'),
    children: [
      {
        path: 'products',
        name: '後台產品列表',
        component: () => import('@/views/admin/AdminProductsView.vue')
      },
      {
        path: 'product/edit/:id',
        name: '後台產品單一編輯頁面',
        component: () => import('@/views/admin/AdminProductEditView.vue')
      },
      {
        path: 'product/add',
        name: '後台產品新增頁面',
        component: () => import('@/views/admin/AdminProductAddView.vue')
      },
      {
        path: 'order',
        name: '後台訂單列表',
        component: () => import('@/views/admin/AdminOrderView.vue')
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
