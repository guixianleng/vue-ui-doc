import VueRouter from 'vue-router';
import { Route } from 'vue-router';

// 声明全局方法
declare module 'vue/types/vue' {
  interface Vue {
    $Message: any,
    $Modal: any,
    $router: VueRouter;
    $route: Route;
  }
}
