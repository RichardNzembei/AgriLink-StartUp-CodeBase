<template>
    <div class="min-h-screen flex items-center bg-gradient-to-r from-green-200 to-blue-200 p-6">
        <div class="mx-auto w-fit bg-white shadow-lg rounded-lg p-8">
            <h1 class="text-2xl font-bold text-center mb-6 text-green-400">Welcome to AgriLink</h1>

            <form @submit.prevent="registerUser">
                <!-- Role Selection -->
                <USelect v-model="formData.role" :options="roles" placeholder="Choose your role"   :style="{ backgroundColor: 'white', color:'black' }"  class="mb-4 w-full"
                    :key="roles.length" required />

                <UInput v-model.trim="formData.first_name" label="First Name"   :style="{ backgroundColor: 'white', color:'black' }"  placeholder="Enter your first name"
                    class="mb-4" required />
                <UInput v-model.trim="formData.last_name" label="Last Name"   :style="{ backgroundColor: 'white', color:'black' }"  placeholder="Enter your last name"
                    class="mb-4" required />
                <UInput v-model.trim="formData.email" label="Email Address"   :style="{ backgroundColor: 'white', color:'black' }"  type="email" icon="i-heroicons-envelope"
                    placeholder="yourexample@gmail.com" class="mb-4" required />
                <UInput v-model.trim="formData.phone" label="Phone Number"   :style="{ backgroundColor: 'white', color:'black' }"  type="tel" icon="i-heroicons-phone"
                    placeholder="0716******" class="mb-4" required />

                <!-- Password Field -->
                <div class="mb-4 relative">
                    <UInput v-model="formData.password" label="Password"   :style="{ backgroundColor: 'white', color:'black' }"  :type="isPassVisible ? 'text' : 'password'"
                        placeholder="Enter your password" required />
                    <span class="absolute right-3 top-0 cursor-pointer text-gray-500 border-l-2 p-1"
                        @click="togglePassword">
                        {{ isPassVisible ? "🙈" : "👁️" }}
                    </span>
                </div>

                <UButton type="submit" class="w-full py-2 px-4 bg-green-600 text-white hover:bg-green-700">Register
                </UButton>
            </form>

            <p class="text-sm text-black text-center mt-4">Already have an account? <router-link to="/login"
                    class="text-green-600 hover:underline">Login</router-link></p>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useUserStore } from '~/store/userStore';
import { useTogglePassword } from '~/composables/toggle';
import { useRouter } from 'vue-router';

definePageMeta({
  ssr: false, // Disable SSR for this page
});

const router = useRouter();
const { isPassVisible, togglePassword } = useTogglePassword();

const formData = reactive({
  role: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
});

const roles = ref([
  { label: 'Farmer', value: 'farmer' },
  { label: 'Buyer', value: 'buyer' }
]);

let userStore;
onMounted(() => {
  userStore = useUserStore(); // Ensure Pinia is ready before using it
});

const registerUser = async () => {
  try {
    if (!userStore) {
      alert("Store is not initialized. Try again.");
      return;
    }
    await userStore.register(
      formData.role,
      formData.phone,
      formData.first_name,
      formData.last_name,
      formData.email,
      formData.password
    );
    alert("Registration successful! Redirecting to login...");
    router.push('/login');
  } catch (error) {
    alert(error.message);
  }
};

</script>



<style scoped>
body {
    font-family: 'Poppins', sans-serif;
}
</style>