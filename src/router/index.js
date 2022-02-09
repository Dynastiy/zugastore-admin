import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/signin',
    name: 'signin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/signin.vue')
  },
  {
    path: '/',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/index.vue'),
    children:[
      {
        path: '/',
        name: 'dashboard-home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/models/index.vue')
      },

      // Users
      {
        path: '/dashboard/users',
        name: 'users',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/models/users/index.vue'),
        children:[
          {
            path: '/dashboard/users',
            name: 'All',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route i  s visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/models/users/all.vue'),
          },
        ]
      },
      
      {
        path: '/dashboard/user/:id',
        name: 'user',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/models/users/_id.vue')
      },
      // Apps 
      {
        path: '/dashboard/apps',
        name: 'apps',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/models/apps/index.vue'),
        children:[
          {
            path: '/dashboard/apps',
            name: 'All',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/models/apps/all.vue'),
          },
        ]
      },
      {
        path: '/dashboard/app/:id',
        name: 'app',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/models/apps/_id.vue')
      },
      // Reviews
      {
        path: '/dashboard/add_app',
        name: 'Add App',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/models/reviews/index.vue')
      },
      {
        path: '/product/:id',
        name: 'product',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/models/_id.vue')
      },
      // Submissions
      {
        path: '/dashboard/submissions',
        name: 'submissions',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/models/submissions/index.vue')
      },
      {
        path: '/dashboard/submission/:id',
        name: 'submission',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/models/submissions/_id.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: 'smooth' });
},
  routes
})

export default router
