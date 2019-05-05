import Vue from 'vue'
import Router from 'vue-router'
import navConfig from './nav.config'

Vue.use(Router)

let route: any = []
const registerRoute = (navConfig: any) => {
  navConfig.forEach((item: any) => {
    if (item.path) {
      route.push({
        path: item.path,
        component: () => import(`views/examples${item.path === '/' ? '/index' : item.path}.md`)
      })
    }
    if (item.children && item.children.forEach) {
      registerRoute(item.children)
    }
  })
}

registerRoute(navConfig)


export default new Router({
  mode: 'history',
  routes: route
})
