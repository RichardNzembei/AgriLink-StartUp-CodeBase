<template>
  <div class="min-h-screen flex items-center bg-gradient-to-r from-green-200 to-blue-200 p-6">
    <div class="mx-auto w-fit bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-2xl font-bold text-center mb-6 text-green-400">Welcome to AgriLink</h1>

      <form @submit.prevent="loginUser">
        <UInput v-model="formData.phone" label="Phone Number" placeholder="0716******" type="tel"
          icon="i-heroicons-phone" class="mb-4" :style="{ backgroundColor: 'white', color: 'black' }" required />

        <div class="mb-4 relative">
          <UInput v-model="formData.password" label="Password" placeholder="Enter your password"
            :type="isPassVisible ? 'text' : 'password'" required :style="{ backgroundColor: 'white', color: 'black' }" />
          <span class="absolute right-3 top-0 cursor-pointer text-gray-500 border-l-2 p-1" @click="togglePassword">
            {{ isPassVisible ? "🙈" : "👁️" }}
          </span>
        </div>

        <div class="text-center">
          <UButton type="submit"
            class="flex justify-center w-full py-2 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700"
            :disabled="loading">
            <span v-if="loading" class="flex items-center">
              <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"></path>
              </svg>
              Logging in...
            </span>
            <span v-else>Login</span>
          </UButton>
        </div>
      </form>

      <div class="text-center mt-4">
        <p class="text-sm text-black">
          Don't have an account?
          <router-link to="/register" class="text-green-600 hover:underline">Register</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '~/store/userStore';
import { useRouter } from 'vue-router';
import { useTogglePassword } from '~/composables/toggle';

const userStore = useUserStore();
const router = useRouter();
const { isPassVisible, togglePassword } = useTogglePassword();
const loading = ref(false);

const formData = ref({
  phone: '',
  password: '',
});

const loginUser = async () => {
  loading.value = true;
  try {
    const success = await userStore.login(formData.value.phone, formData.value.password);
    if (success) {
      const role = userStore.getUserRole;
      router.push(`/${role.toLowerCase()}/dashboard`);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  } catch (error) {
    alert("An error occurred. Please try again later.");
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>