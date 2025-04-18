// plugins/auth.plugin.js
// KEEP this plugin only if you're initializing auth state from localStorage
// REMOVE any redirect logic or timeouts

import { useUserStore } from '~/store/userStore';

export default defineNuxtPlugin(() => {
  const userStore = useUserStore();

  if (process.client) {
    const currentUser = localStorage.getItem('currentUser');
    const userPhone = localStorage.getItem('currentUserPhone');

    if (currentUser && userPhone) {
      userStore.setUser(JSON.parse(currentUser));
      userStore.setUserPhone(userPhone);
    }
  }
});
