<template>
    <div style="min-height: 100vh; background-color: #f9fafb; font-family: 'Poppins', sans-serif; position: relative;">
      <!-- Mobile Menu Toggle -->
      <button 
      @click="toggleSidebar"
      class="md:hidden fixed top-4 left-4 z-[100] bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:bg-green-500 hover:scale-105"
    >
      <UIcon name="i-heroicons-bars-3" class="w-6 h-6" />
    </button>
  
      <div style="display: flex; min-height: 100vh;">
        <!-- Sidebar -->
        <AppFarmerNavbar />
  
        <!-- Main Content -->
        <main 
          :style="{ 'margin-left': isMobile && !showFarmers ? '0' : '280px', 'padding': '2rem 1.5rem', 'transition': 'all 0.3s ease', 'flex': '1' }"
          :class="{ 'md:ml-[280px]': !isMobile || showFarmers }"
        >
          <!-- Community Section -->
          <section style="background: linear-gradient(to right, #22c55e, #16a34a); border-radius: 1rem; padding: 2rem; margin-bottom: 2rem; display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);">
            <div style="position: relative; z-index: 10; width: 100%; max-width: 800px; text-align: center;">
              <h1 style="font-size: 2.25rem; font-weight: 800; color: white; margin-bottom: 1rem;">
                Connect with <span style="background: linear-gradient(to right, #fef08a, #facc15); -webkit-background-clip: text; background-clip: text; color: transparent;">Farmers</span>
              </h1>
              <p style="font-size: 1.125rem; color: #d1fae5; margin-bottom: 1.5rem;">
                Share your thoughts, learn from others, and grow your farming community with <strong style="color: white;">AgriLink</strong>.
              </p>
              <UButton 
                size="lg"
                @click="scrollToPosts"
                style="background-color: white; color: #166534; font-weight: 600; border-radius: 0.5rem; padding: 0.75rem 1.5rem; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;"
                class="hover:-translate-y-1 hover:shadow-md"
              >
                Share a Post
                <UIcon name="i-heroicons-pencil" style="margin-left: 0.5rem; width: 1.25rem; height: 1.25rem;" />
              </UButton>
            </div>
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 100%; background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);"></div>
          </section>
  
          <!-- Community Content -->
          <div style="max-width: 100%; margin: 0 auto; animation: fade-in 0.5s ease-out;">
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              <!-- Farmers Sidebar -->
              <div 
                :style="{ 'display': showFarmers ? 'block' : 'none', 'width': '100%', 'max-width': '320px', 'padding': '1.5rem', 'background-color': 'white', 'border-radius': '1rem', 'box-shadow': '0 4px 12px rgba(0, 0, 0, 0.05)', 'margin-bottom': isMobile ? '1.5rem' : '0' }"
                class="md:block"
              >
                <h4 style="font-size: 1.25rem; font-weight: 600; color: #1a3c34; display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                  Active Farmers
                  <button 
                    @click="toggleFarmers" 
                    style="color: #22c55e; transition: transform 0.3s ease;"
                    class="md:hidden"
                  >
                    <UIcon :name="showFarmers ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" style="width: 1.5rem; height: 1.5rem;" />
                  </button>
                </h4>
                <transition name="fade">
                  <div v-if="activeFarmers.length">
                    <span style="font-size: 1rem; font-weight: 500; color: #374151; display: block; margin-bottom: 1rem;">Online Now</span>
                    <div 
                      v-for="farmer in activeFarmers" 
                      :key="farmer.id" 
                      style="display: flex; align-items: center; margin-bottom: 1rem; transition: transform 0.3s ease;"
                      class="hover:transform hover:translate-x-1"
                    >
                      <UIcon name="i-heroicons-user-circle-solid" style="width: 1.5rem; height: 1.5rem; color: #22c55e; margin-right: 0.75rem;" />
                      <p style="font-size: 0.875rem; color: #4b5563;">{{ farmer.first_name }} {{ farmer.last_name }} ({{ farmer.phone }})</p>
                    </div>
                  </div>
                  <p v-else style="font-size: 0.875rem; color: #6b7280;">No active farmers found.</p>
                </transition>
              </div>
  
              <!-- Posts Container -->
              <div style="flex: 1;">
                <div style="background-color: #f0fdf4; border: 2px solid #86efac; border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08); transition: transform 0.3s ease;"
                     class="hover:transform hover:-translate-y-1">
                  <UInput 
                    type="textarea" 
                    v-model="newPost" 
                    placeholder="Share your thoughts..." 
                    rows="3"
                    style="background-color: white; border: 1px solid #d1d5db; border-radius: 0.75rem; padding: 0.75rem; color: #1f2937; font-size: 0.875rem; width: 100%; transition: border-color 0.3s ease;"
                    class="focus:border-[#22c55e] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]"
                  />
                  <UButton 
                    block
                    @click="submitPost" 
                    :disabled="!newPost.trim()"
                    style="background-color: #22c55e; color: white; font-weight: 600; border-radius: 0.75rem; padding: 0.75rem; margin-top: 1rem; transition: background 0.3s ease, transform 0.3s ease;"
                    class="hover:bg-[#16a34a] hover:-translate-y-0.5 disabled:bg-[#9ca3af] disabled:cursor-not-allowed"
                  >
                    Post
                  </UButton>
                </div>
                <div 
                  v-for="post in posts" 
                  :key="post.id" 
                  style="margin-bottom: 1.5rem;"
                >
                  <div style="background-color: white; border: 1px solid #e5e7eb; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); transition: transform 0.3s ease;"
                       class="hover:transform hover:-translate-y-1">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                      <div>
                        <h4 style="font-size: 1rem; font-weight: 600; color: #166534;">{{ post.author }}</h4>
                        <p style="font-size: 0.875rem; color: #1f2937; line-height: 1.5;">{{ post.content }}</p>
                      </div>
                      <small style="font-size: 0.75rem; color: #6b7280;">{{ formatTimestamp(post.timestamp) }}</small>
                    </div>
                    <div style="margin-top: 1.5rem;">
                      <h5 style="font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 1rem;">Comments:</h5>
                      <div v-if="post.comments?.length" style="display: flex; flex-direction: column; gap: 0.75rem;">
                        <div 
                          v-for="comment in post.comments" 
                          :key="comment.id" 
                          style="background-color: #f9fafb; border-radius: 0.75rem; padding: 0.75rem;"
                        >
                          <strong style="font-size: 0.875rem; font-weight: 600; color: #166534;">{{ comment.author }}:</strong>
                          <span style="font-size: 0.875rem; color: #1f2937;">{{ comment.content }}</span>
                        </div>
                      </div>
                      <p v-else style="font-size: 0.875rem; color: #6b7280;">No comments yet.</p>
                      <UInput 
                        type="textarea" 
                        v-model="newComments[post.id]" 
                        placeholder="Write a comment..." 
                        rows="2"
                        style="background-color: white; border: 1px solid #d1d5db; border-radius: 0.75rem; padding: 0.75rem; color: #1f2937; font-size: 0.875rem; margin-top: 1rem; width: 100%; transition: border-color 0.3s ease;"
                        class="focus:border-[#22c55e] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)]"
                      />
                      <UButton 
                        block
                        @click="addComment(post.id)" 
                        :disabled="!newComments[post.id]?.trim()"
                        style="background-color: #22c55e; color: white; font-weight: 600; border-radius: 0.75rem; padding: 0.75rem; margin-top: 0.75rem; transition: background 0.3s ease, transform 0.3s ease;"
                        class="hover:bg-[#16a34a] hover:-translate-y-0.5 disabled:bg-[#9ca3af] disabled:cursor-not-allowed"
                      >
                        Comment
                      </UButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <!-- Toggle Farmers Button -->
      <button 
        @click="toggleFarmers"
        style="position: fixed; bottom: 1.5rem; right: 1.5rem; background-color: #22c55e; color: white; padding: 1rem; border-radius: 50%; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); transition: background 0.3s ease, transform 0.3s ease; display: flex; align-items: center; justify-content: center;"
        class="md:hidden"
      >
        <UIcon name="i-heroicons-users" style="width: 1.75rem; height: 1.75rem;" />
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useUserStore } from "~/store/userStore";
  import { usePostStore } from "~/store/postStore";
  import { onClickOutside } from '@vueuse/core';
  
  const userStore = useUserStore();
  const postStore = usePostStore();
  const newPost = ref("");
  const newComments = ref({});
  const showFarmers = ref(false);
  const isMobile = ref(false);
  const sidebarRef = ref(null);
  
  onMounted(async () => {
    await userStore.fetchUsers();
    await postStore.fetchPosts();
    checkMobile();
    window.addEventListener('resize', checkMobile);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
  });
  
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768;
  };
  
  const activeFarmers = computed(() => userStore.usersList.filter((user) => user.role === "farmer"));
  const posts = computed(() => postStore.posts);
  
  const submitPost = async () => {
    if (!newPost.value.trim()) return;
    await postStore.addPost(newPost.value.trim());
    newPost.value = "";
  };
  
  const addComment = async (postId) => {
    const commentContent = newComments.value[postId]?.trim();
    if (!commentContent) return;
    await postStore.addComment(postId, commentContent);
    newComments.value[postId] = "";
  };
  
  const formatTimestamp = (timestamp) => new Date(timestamp).toLocaleString();
  
  const toggleFarmers = () => {
    showFarmers.value = !showFarmers.value;
  };
  
  const scrollToPosts = () => {
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };
  
  // Close sidebar when clicking outside
  onClickOutside(sidebarRef, () => {
    if (isMobile.value && showFarmers.value) {
      showFarmers.value = false;
    }
  });
  
  useHead({
    title: 'AgriLink - Community',
    meta: [
      { 
        name: 'description', 
        content: 'Connect with farmers, share ideas, and grow your agricultural community with AgriLink.' 
      },
      { 
        property: 'og:title', 
        content: 'Community | AgriLink Africa' 
      },
      { 
        property: 'og:description', 
        content: 'Join the AgriLink community to collaborate with farmers and share knowledge.' 
      },
    ],
  });
  </script>
  
  <style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease-in-out;
  }
  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  </style>