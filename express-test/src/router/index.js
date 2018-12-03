import Vue from 'vue'
import Router from 'vue-router'
import index from '../view/index.vue'
import hellowWorld from '../components/HelloWorld.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hellowWorld',
      component: hellowWorld
    },
    {
      path: '/index',
      name: 'index',
      component: index
    }
  ]
})
