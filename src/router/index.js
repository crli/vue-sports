import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

var home = r => require.ensure([], () => r(require('@/components/home/home')), 'home')
var carousel = r => require.ensure([], () => r(require('@/components/carousel/carousel')), 'carousel')
Vue.use(Router)

const routes = [
    {
      path: '/',
      component: App,
      children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        component: home,
        children:[
        {
          path: 'carousel',
          component: carousel,
        }
        ]
      }
      ]
    }
];
const router =  new Router({
  routes: routes,
  mode: 'hash',
  strict: process.env.NODE_ENV !== 'production'
})
export default router;
