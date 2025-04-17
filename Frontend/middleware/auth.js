import { useUserStore } from '~/store/userStore';

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  
  if (process.client) {
    userStore.initialize();
    console.log('auth.middleware: isAuthenticated:', userStore.isAuthenticated);
    console.log('auth.middleware: user:', userStore.user);
    console.log('auth.middleware: to.path:', to.path);

    if (userStore.isAuthenticated) {
      const role = userStore.getUserRole;
      if (to.path === '/' || to.path === '/login') {
        return navigateTo(`/${role.toLowerCase()}/dashboard`);
      }
    } else if (to.path !== '/login' && to.path !== '/register') {
      return navigateTo('/login');
    }
  }
});