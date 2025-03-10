<template>
  <div class="min-h-screen flex items-center bg-gradient-to-r from-green-200 to-blue-200 p-6">
    <div class="mx-auto w-fit bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-2xl font-bold text-center mb-6 text-green-400">Welcome to AgriLink</h1>
      <form @submit.prevent="loginUser">
        <UInput 
          v-model="formData.phone" 
          label="Phone Number" 
          placeholder="0716******" 
          type="tel"
          icon="i-heroicons-phone" 
          class="mb-4" 
          :style="{ backgroundColor: 'white', color: 'black' }" 
          required 
        />
        <div class="mb-4 relative">
          <UInput 
            v-model="formData.password" 
            label="Password" 
            placeholder="Enter your password"
            :type="isPassVisible ? 'text' : 'password'" 
            required 
            :style="{ backgroundColor: 'white', color:'black' }" 
          />
          <span 
            class="absolute right-3 top-0 cursor-pointer text-gray-500 border-l-2 p-1" 
            @click="togglePassword">
            {{ isPassVisible ? "🙈" : "👁️" }}
          </span>
        </div>
        <div class="text-center">
          <UButton type="submit" class="flex justify-center w-full py-2 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700">
            Login
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

const formData = ref({
  phone: '',
  password: '',
});

const loginUser = async () => {
  try {
    const success = await userStore.login(formData.value.phone, formData.value.password);
    if (success) {
      const role = userStore.getUserRole();
      router.push(`/${role}/dashboard`);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  } catch (error) {
    alert("An error occurred. Please try again later.");
    console.error(error);
  }
};
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
