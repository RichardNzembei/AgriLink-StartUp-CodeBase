// middleware/auth.global.js
import { useUserStore } from '~/store/userStore';
export default defineNuxtRouteMiddleware((to, from) => {
  // Avoid redirecting on server-side
  if (process.server) return;

  const userStore = useUserStore();

  // If user is authenticated and trying to access the home page '/'
  if (userStore.isAuthenticated && to.path === '/') {
    const role = userStore.getUserRole;

    // If no role exists, redirect to login page
    if (!role) {
      console.warn('[auth.middleware] No user role. Redirecting to /login');
      return navigateTo('/login');
    }

    // Navigate to role-based dashboard
    const destination = `/${role.toLowerCase()}/dashboard`;

    // If not already on the correct dashboard, navigate there
    if (to.path !== destination) {
      return navigateTo(destination);
    }
  }
});
