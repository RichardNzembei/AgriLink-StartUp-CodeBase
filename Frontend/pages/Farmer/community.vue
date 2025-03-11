<template>
    <AppFarmerNavbar />
    <div class="community-page px-4 py-6 mt-20 w-full flex flex-col md:flex-row bg-white">
        
        <!-- Sidebar for Active Farmers (Hidden on Small Screens) -->
        <div class="w-full md:w-1/4 pr-4 border-r border-gray-200 relative md:block" :class="{ 'hidden': !showFarmers, 'block': showFarmers }">
            <h4 class="font-semibold mb-2 flex items-center justify-between">
                Active Farmers
                <button @click="toggleFarmers" class="md:hidden text-green-500">
                    <UIcon :name="showFarmers ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" size="20" />
                </button>
            </h4>

            <transition name="fade">
                <div v-if="activeFarmers.length">
                    <span class="text-mono text-black font-sans">Active farmers</span>
                    <div v-for="farmer in activeFarmers" :key="farmer.id" class="flex items-center mb-4">
                        <UIcon name="i-heroicons-user-circle-solid" size="20" class="mr-2 text-green-600" />
                        <p class="text-sm text-gray-600">{{ farmer.first_name }} {{ farmer.last_name }} ({{ farmer.phone }})</p>
                    </div>
                </div>
                <p v-else class="text-gray-500">No active farmers found.</p>
            </transition>

           
        </div>

        <!-- Main Content Area -->
        <div class="w-full md:w-3/4 pl-4">
            <!-- New Post Input -->
            <UCard class="new-post mb-6 shadow-lg bg-white p-4 rounded-lg" :style="{backgroundColor:'white'}">
                <UInput type="textarea" v-model="newPost" placeholder="Share your thoughts..." rows="3" class="resize-none rounded-lg border-gray-300 focus:border-green-500" :style="{backgroundColor:'white'}" />
                <UButton block class="mt-3 text-white bg-green-500 hover:bg-green-600 transition-all" @click="submitPost" :disabled="!newPost.trim()">
                    Post
                </UButton>
            </UCard>

            <!-- Posts Feed -->
            <div v-for="post in posts" :key="post.id" class="post mb-4">
                <UCard class="shadow-lg bg-white p-4 rounded-lg" :style="{backgroundColor:'white'}">
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-medium text-green-700">{{ post.author }}</h4>
                            <p class="text-black">{{ post.content }}</p>
                        </div>
                        <small class="text-gray-500">{{ formatTimestamp(post.timestamp) }}</small>
                    </div>

                   <!-- Comments Section -->
<div class="comments mt-4">
    <h5 class="font-medium text-sm mb-2">Comments:</h5>

    <div v-if="post.comments?.length" class="space-y-2">
        <div v-for="comment in post.comments" :key="comment.id" class="bg-gray-100 p-2 rounded-lg">
            <strong class="text-green-700">{{ comment.author }}:</strong> <span class="text-black">{{ comment.content }}</span>
        </div>
    </div>
    <p v-else class="text-gray-400">No comments yet.</p>

    <!-- Add Comment -->
    <UInput 
        type="textarea" 
        v-model="newComments[post.id]" 
        placeholder="Write a comment..." 
        rows="2" 
        class="resize-none border-gray-300 focus:border-green-500 rounded-lg" 
        :style="{backgroundColor:'white'}"
    />
    <UButton 
        block 
        class="mt-2 text-white bg-green-500 hover:bg-green-600 transition-all" 
        @click="addComment(post.id)" 
        :disabled="!newComments[post.id]?.trim()"
    >
        Comment
    </UButton>
</div>

                </UCard>
            </div>
        </div>
    </div>

    <!-- Floating Button for Small Screens -->
    <button class="md:hidden fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all" @click="toggleFarmers">
        <UIcon name="i-heroicons-users" size="24" />
    </button>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "~/store/userStore";
import { usePostStore } from "~/store/postStore";

const userStore = useUserStore();
const postStore = usePostStore();
const newPost = ref("");
const newComments = ref({});
const showFarmers = ref(false); // Toggle for active farmers section on mobile

onMounted(async () => {
    await userStore.fetchUsers();
    await postStore.fetchPosts();
});

const activeFarmers = computed(() => userStore.users.filter(user => user.role === "farmer"));
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
</script>

<style scoped>
/* Fade animation for Active Farmers */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease-in-out;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

/* Mobile UI Enhancements */
@media (max-width: 768px) {
    .community-page {
        flex-direction: column;
    }

    /* Hide Active Farmers initially */
    .hidden {
        display: none;
    }
}
</style>
