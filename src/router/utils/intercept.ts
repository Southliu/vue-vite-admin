import type { Router } from "vue-router";
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useToken } from '@/hooks/useToken';
import { message } from "ant-design-vue";
import { useTabStore } from '@/stores/tabs';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { routeToKeepalive } from "./helper";
import { useMenuStore } from "@/stores/menu";
import { getFirstMenu } from '@/utils/menu';
import NProgress from 'nprogress';
import pinia from '../../stores';

NProgress.configure({ showSpinner: false });

/**
 * 路由拦截处理
 * @param router - 路由对象
 */
export function routerIntercept(router: Router) {
    // 路由拦截
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const { getToken } = useToken();
    const token = getToken();
    NProgress.start();

    const userStore = useUserStore(pinia);
    const tabStore = useTabStore(pinia);
    const menuStore = useMenuStore();
    const { menuList } = storeToRefs(menuStore);
    const { addCacheRoutes } = tabStore;
    const { permissions } = storeToRefs(userStore);

    // 转为keepalive形式
    const cacheRoute = routeToKeepalive(to.path);
    addCacheRoutes(cacheRoute);

    // 无token返回登录页
    if (!token && to.path !== '/login') {
      message.error({ content: '用户授权过期，请重新登录', key: 'not_token' });
      next({ path: `/login?redirect=${to.path}` });
    } else if (token && to.path === '/login') {
      // 有token且在登录页跳转第一个有效菜单
      const firstMenu = getFirstMenu(menuList.value, permissions.value);
      next(firstMenu);
    } else next();
  });

  // 路由结束处理
  router.afterEach(() => {
    NProgress.done();
  });
}