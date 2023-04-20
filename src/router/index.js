import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    meta:{layout: 'empty'},
    component: () => import('../views/LoginView.vue')
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   meta:{layout: 'main'},
  //   component: HomeView
  // },
  {
    path: '/',
    name: 'about',
    meta:{layout: 'main'},
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/services',
    name: 'services',
    meta:{layout: 'main'},
    component: () => import('../views/ServicesView.vue')
  },
  {
    path: '/blogs',
    name: 'blogs',
    meta:{layout: 'main'},
    component: () => import('../views/BlogView.vue')
  },
  {
    path: '/equipment',
    name: 'equipment',
    meta:{layout: 'main'},
    component: () => import('../views/EquipmentView.vue')
  },
  {
    path: '/users',
    name: 'users',
    meta:{layout: 'main'},
    component: () => import('../views/UserView.vue')
  },
  {
    path: '/comes',
    name: 'comes',
    meta:{layout: 'main'},
    component: () => import('../views/ComeView.vue')
  },
  {
    path: '/category',
    name: 'category',
    meta:{layout: 'main'},
    component: () => import('../views/CategoryView.vue')
  },
  {
    path: '/subcategory',
    name: 'subcategory',
    meta:{layout: 'main'},
    component: () => import('../views/SubcategoryView.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
