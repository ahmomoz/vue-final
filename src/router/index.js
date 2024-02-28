import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/user/UserLayoutView.vue'),
    children: [
      {
        path: 'home',
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
    path: '/dashboard',
    name: 'Admin',
    component: () => import('@/views/admin/AdminView.vue'),
    children: [
      {
        path: 'home',
        name: '後台主頁',
        component: () => import('@/views/admin/AdminHomeView.vue')
      },
      {
        path: 'products',
        name: '後台產品列表',
        component: () => import('@/views/admin/product/AdminProductsView.vue')
      },
      {
        path: 'product/edit/:id',
        name: '後台產品單一編輯頁面',
        component: () => import('@/views/admin/product/AdminProductEditView.vue')
      },
      {
        path: 'product/add',
        name: '後台產品新增頁面',
        component: () => import('@/views/admin/product/AdminProductAddView.vue')
      },
      {
        path: 'orders',
        name: '後台訂單列表',
        component: () => import('@/views/admin/order/AdminOrdersView.vue')
      },
      {
        path: 'order/:id',
        name: '訂單詳細頁面',
        component: () => import('@/views/admin/order/AdminOrderView.vue'),
        props: true
      },
      {
        path: 'coupons',
        name: '優惠券頁面',
        component: () => import('@/views/admin/coupon/AdminCouponsView.vue')
      },
      {
        path: 'coupon/edit/:id',
        name: '優惠券單一編輯頁面',
        component: () => import('@/views/admin/coupon/AdminCouponEditView.vue'),
        props: true
      },
      {
        path: 'coupon/add',
        name: '優惠券新增頁面',
        component: () => import('@/views/admin/coupon/AdminCouponAddView.vue')
      },
      {
        path: 'articles',
        name: '文章頁面',
        component: () => import('@/views/admin/article/AdminArticlesView.vue')
      },
      {
        path: 'article/edit/:id',
        name: '文章單一編輯頁面',
        component: () => import('@/views/admin/article/AdminArticleEditView.vue')
      },
      {
        path: 'article/add',
        name: '文章新增頁面',
        component: () => import('@/views/admin/article/AdminArticleAddView.vue')
      }
    ]
  },
  // 404頁面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
