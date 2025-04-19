<template>
    <AppFarmerNavbar />
    <div class="community-container">
      <!-- Sidebar -->
      <div 
        class="community-sidebar"
        :class="{ 'mobile-hidden': !showFarmers }"
      >
        <div class="sidebar-header">
          <h3 class="sidebar-title">Active Farmers</h3>
          <button 
            @click="toggleFarmers" 
            class="mobile-toggle-button"
          >
            <UIcon 
              :name="showFarmers ? 'i-heroicons-x-mark' : 'i-heroicons-users'" 
              size="20" 
            />
          </button>
        </div>
  
        <div class="farmers-list">
          <transition name="fade">
            <div v-if="activeFarmers.length" class="farmers-content">
              <div 
                v-for="farmer in activeFarmers" 
                :key="farmer.id" 
                class="farmer-item"
              >
                <div class="farmer-avatar">
                  <UIcon 
                    name="i-heroicons-user-circle-solid" 
                    size="24" 
                    class="avatar-icon"
                  />
                </div>
                <div class="farmer-details">
                  <p class="farmer-name">{{ farmer.first_name }} {{ farmer.last_name }}</p>
                  <p class="farmer-phone">{{ formatPhoneNumber(farmer.phone) }}</p>
                </div>
              </div>
            </div>
            <div v-else class="empty-state">
              <UIcon name="i-heroicons-user-group" size="24" />
              <p>No active farmers found</p>
            </div>
          </transition>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="community-main">
        <!-- New Post Card -->
        <UCard 
          class="post-editor"
          :ui="{
            background: 'bg-white',
            ring: 'ring-1 ring-gray-200',
            rounded: 'rounded-lg',
            shadow: 'shadow-sm'
          }"
        >
          <template #header>
            <h3 class="post-editor-title">Create a Post</h3>
          </template>
          
          <UTextarea
            v-model="newPost"
            placeholder="Share your farming tips, ask questions, or start a discussion..."
            rows="3"
            autoresize
            class="post-input"
            :ui="{
              background: 'bg-white',
              color: 'text-black',
              border: 'border border-gray-300',
              ring: 'ring-1 ring-transparent focus:ring-green-500',
              rounded: 'rounded-md'
            }"
            :style="{ backgroundColor: 'white', color: 'black' }"   
          />
          
          <div class="post-actions">
            <UButton
              @click="submitPost"
              :disabled="!newPost.trim()"
              class="post-button"
              :ui="{
                background: 'bg-green-600 hover:bg-green-700',
                color: 'text-white',
                padding: 'px-4 py-2',
                rounded: 'rounded-md'
              }"
            >
              <UIcon name="i-heroicons-paper-airplane" class="mr-2" />
              Post
            </UButton>
          </div>
        </UCard>
  
        <!-- Posts Feed -->
        <div class="posts-feed">
          <transition-group name="post-fade">
            <div 
              v-for="post in posts" 
              :key="post.id" 
              class="post-card"
            >
              <UCard
                :ui="{
                  background: 'bg-white',
                  ring: 'ring-1 ring-gray-200',
                  rounded: 'rounded-lg',
                  shadow: 'shadow-sm'
                }"
              >
                <div class="post-header">
                  <div class="post-author">
                    <UIcon 
                      name="i-heroicons-user-circle-solid" 
                      size="20" 
                      class="author-icon"
                    />
                    <span class="author-name">{{ post.author }}</span>
                  </div>
                  <span class="post-time">{{ formatTimeAgo(post.timestamp) }}</span>
                </div>
  
                <div class="post-content">
                  {{ post.content }}
                </div>
  
                <div class="post-comments">
                  <div class="comments-header">
                    <h4>Comments</h4>
                    <span class="comments-count">{{ post.comments?.length || 0 }}</span>
                  </div>
  
                  <div v-if="post.comments?.length" class="comments-list">
                    <div 
                      v-for="comment in post.comments" 
                      :key="comment.id" 
                      class="comment-item"
                    >
                      <div class="comment-author">
                        <UIcon 
                          name="i-heroicons-user-circle-solid" 
                          size="16" 
                          class="comment-icon"
                        />
                        <span>{{ comment.author }}</span>
                      </div>
                      <div class="comment-content">
                        {{ comment.content }}
                      </div>
                      <div class="comment-time">
                        {{ formatTimeAgo(comment.timestamp) }}
                      </div>
                    </div>
                  </div>
                  <div v-else class="no-comments">
                    No comments yet. Be the first to comment!
                  </div>
  
                  <div class="add-comment">
                    <UTextarea
                      v-model="newComments[post.id]"
                      placeholder="Write a comment..."
                      rows="1"
                      autoresize
                      class="comment-input"
                      :ui="{
                        background: 'bg-white',
                        color: 'text-black',
                        border: 'border border-gray-300',
                        ring: 'ring-1 ring-transparent focus:ring-green-500',
                        rounded: 'rounded-md'
                      }"
                       :style="{ backgroundColor: 'white', color: 'black' }"  
                    />
                    <UButton
                      @click="addComment(post.id)"
                      :disabled="!newComments[post.id]?.trim()"
                      size="sm"
                      class="comment-button"
                      :ui="{
                        background: 'bg-green-600 hover:bg-green-700',
                        color: 'text-white',
                        padding: 'px-3 py-1',
                        rounded: 'rounded-md'
                      }"
                    >
                      <UIcon name="i-heroicons-paper-airplane" size="16" />
                    </UButton>
                  </div>
                </div>
              </UCard>
            </div>
          </transition-group>
  
          <div v-if="!posts.length" class="empty-posts">
            <UIcon name="i-heroicons-chat-bubble-left-ellipsis" size="32" />
            <p>No posts yet. Be the first to share!</p>
          </div>
        </div>
      </div>
  
      <!-- Mobile Toggle Button -->
      <button
        @click="toggleFarmers"
        class="mobile-farmers-button"
      >
        <UIcon 
          :name="showFarmers ? 'i-heroicons-x-mark' : 'i-heroicons-users'" 
          size="20" 
        />
        <span>{{ showFarmers ? 'Close' : 'Farmers' }}</span>
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useUserStore } from "~/store/userStore";
  import { usePostStore } from "~/store/postStore";
  
  const userStore = useUserStore();
  const postStore = usePostStore();
  const newPost = ref("");
  const newComments = ref({});
  const showFarmers = ref(false);
  
  onMounted(async () => {
    await userStore.fetchUsers();
    await postStore.fetchPosts();
  });
  
  const activeFarmers = computed(() => 
    userStore.usersList.filter((user) => user.role === "farmer")
  );
  
  const posts = computed(() => 
    [...postStore.posts].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    )
  );
  
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
  
  const formatPhoneNumber = (phone) => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  };
  
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };
  
  const toggleFarmers = () => {
    showFarmers.value = !showFarmers.value;
  };
  </script>
  
  <style>
  /* Base Colors */
  :root {
    --color-primary: #16a34a;
    --color-primary-hover: #15803d;
    --color-white: #ffffff;
    --color-gray-100: #f3f4f6;
    --color-gray-200: #e5e7eb;
    --color-gray-300: #d1d5db;
    --color-gray-500: #6b7280;
    --color-gray-700: #374151;
    --color-gray-800: #1f2937;
    --color-gray-900: #111827;
    --color-black: #000000;
  }
  
  /* Layout */
  .community-container {
    min-height: 100vh;
    background-color: var(--color-gray-100);
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
  }
  
  @media (min-width: 768px) {
    .community-container {
      flex-direction: row;
    }
  }
  
  /* Sidebar */
  .community-sidebar {
    width: 100%;
    padding: 1rem;
    background-color: var(--color-white);
    border-right: 1px solid var(--color-gray-200);
    height: calc(100vh - 5rem);
    overflow-y: auto;
  }
  
  @media (min-width: 768px) {
    .community-sidebar {
      width: 20rem;
    }
  }
  
  .mobile-hidden {
    display: none;
  }
  
  @media (min-width: 768px) {
    .mobile-hidden {
      display: block;
    }
  }
  
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--color-gray-200);
  }
  
  .sidebar-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-gray-800);
  }
  
  .mobile-toggle-button {
    display: none;
    padding: 0.5rem;
    border-radius: 9999px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-gray-700);
  }
  
  .mobile-toggle-button:hover {
    background-color: var(--color-gray-100);
  }
  
  @media (max-width: 767px) {
    .mobile-toggle-button {
      display: block;
    }
  }
  
  /* Farmer List */
  .farmers-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .farmer-item {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border-radius: 0.5rem;
    background-color: var(--color-white);
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .farmer-item:hover {
    background-color: var(--color-gray-100);
  }
  
  .farmer-avatar {
    flex-shrink: 0;
    margin-right: 0.75rem;
  }
  
  .avatar-icon {
    color: var(--color-primary);
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .farmer-details {
    flex: 1;
    min-width: 0;
  }
  
  .farmer-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-gray-800);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .farmer-phone {
    font-size: 0.75rem;
    color: var(--color-gray-500);
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    color: var(--color-gray-500);
    gap: 0.5rem;
  }
  
  /* Main Content */
  .community-main {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    height: calc(100vh - 5rem);
  }
  
  /* Post Editor */
  .post-editor {
    margin-bottom: 1.5rem;
  }
  
  .post-editor-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-gray-800);
  }
  
  .post-input {
    width: 100%;
    border: 1px solid var(--color-gray-300);
    border-radius: 0.375rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    background-color: var(--color-white);
    color: var(--color-black);
    transition: border-color 0.2s ease;
  }
  
  .post-input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 1px var(--color-primary);
  }
  
  .post-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.75rem;
  }
  
  .post-button {
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: none;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
  }
  
  .post-button:hover {
    background-color: var(--color-primary-hover);
  }
  
  .post-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Posts Feed */
  .posts-feed {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .post-card {
    transition: all 0.2s ease;
  }
  
  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }
  
  .post-author {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .author-icon {
    color: var(--color-primary);
  }
  
  .author-name {
    font-weight: 500;
    color: var(--color-gray-800);
  }
  
  .post-time {
    font-size: 0.75rem;
    color: var(--color-gray-500);
  }
  
  .post-content {
    color: var(--color-gray-700);
    margin-bottom: 1rem;
  }
  
  /* Comments */
  .post-comments {
    border-top: 1px solid var(--color-gray-200);
    padding-top: 0.75rem;
    margin-top: 0.75rem;
  }
  
  .comments-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }
  
  .comments-header h4 {
    font-weight: 500;
    font-size: 0.875rem;
    color: var(--color-gray-700);
  }
  
  .comments-count {
    font-size: 0.75rem;
    background-color: var(--color-gray-100);
    color: var(--color-gray-600);
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
  }
  
  .comments-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  
  .comment-item {
    background-color: var(--color-gray-100);
    padding: 0.75rem;
    border-radius: 0.5rem;
  }
  
  .comment-author {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-gray-700);
    margin-bottom: 0.25rem;
  }
  
  .comment-icon {
    color: var(--color-primary);
  }
  
  .comment-content {
    font-size: 0.875rem;
    color: var(--color-gray-700);
  }
  
  .comment-time {
    font-size: 0.75rem;
    color: var(--color-gray-500);
    margin-top: 0.25rem;
  }
  
  .no-comments {
    font-size: 0.875rem;
    color: var(--color-gray-500);
    font-style: italic;
    margin-bottom: 1rem;
  }
  
  .add-comment {
    display: flex;
    gap: 0.5rem;
  }
  
  .comment-input {
    flex: 1;
    border: 1px solid var(--color-gray-300);
    border-radius: 0.375rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    background-color: var(--color-white);
    color: var(--color-black);
    transition: border-color 0.2s ease;
  }
  
  .comment-input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 1px var(--color-primary);
  }
  
  .comment-button {
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: 0.5rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .comment-button:hover {
    background-color: var(--color-primary-hover);
  }
  
  .comment-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Empty States */
  .empty-posts {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    color: var(--color-gray-500);
    gap: 0.5rem;
  }
  
  /* Mobile Button */
  .mobile-farmers-button {
    display: none;
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: 0.75rem;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 40;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .mobile-farmers-button:hover {
    background-color: var(--color-primary-hover);
  }
  
  @media (max-width: 767px) {
    .mobile-farmers-button {
      display: flex;
    }
  }
  
  /* Animations */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .post-fade-enter-active,
  .post-fade-leave-active {
    transition: all 0.3s ease;
  }
  
  .post-fade-enter-from,
  .post-fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  </style>