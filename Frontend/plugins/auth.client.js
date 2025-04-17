import { useUserStore } from '~/store/userStore';
import { onNuxtReady } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
  const userStore = useUserStore();
  const router = nuxtApp.$router;

  onNuxtReady(() => {
    setTimeout(() => {
      if (process.client) {
        // Manually initialize store
        userStore.initialize();
        console.log('auth.plugin: isAuthenticated:', userStore.isAuthenticated);
        console.log('auth.plugin: user:', userStore.user);
        console.log('auth.plugin: userPhone:', userStore.userPhone);
        console.log('auth.plugin: role:', userStore.getUserRole);
        console.log('auth.plugin: localStorage:', {
          currentUser: localStorage.getItem('currentUser'),
          userPhone: localStorage.getItem('currentUserPhone'),
        });

        if (userStore.isAuthenticated) {
          const role = userStore.getUserRole;
          console.log('auth.plugin: Redirecting to:', `/${role.toLowerCase()}/dashboard`);
          router.push(`/${role.toLowerCase()}/dashboard`);
        } else {
          console.log('auth.plugin: User not authenticated');
        }
      }
    }, 500); // Increased delay
  });
});