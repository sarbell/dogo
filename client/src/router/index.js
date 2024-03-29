import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp'
import SignIn from '../views/SignIn'
import Favorites from '../views/Favorites'
import Vote from '../components/Vote'
import Polling from '../views/Polling'
import RandomPage from '../views/RandomPage'
import Account from '../views/Account'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites
  },
  {
    path: '/vote',
    name: 'polling',
    component: Polling
  },
  {
    path: '/add-poll',
    name: 'vote',
    component: Vote
  },
  {
    path: '/random',
    name: 'random',
    component: RandomPage
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  },
  {
    path: '/:catchAll(.*)*',
    name: "home",
    component: Home,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
