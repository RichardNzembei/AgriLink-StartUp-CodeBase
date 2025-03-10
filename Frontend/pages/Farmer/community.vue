<template>
    <AppFarmerNavbar />
    <div class="community-page px-4 py-6 mt-20 w-full flex">

        <div class="w-1/4 pr-4 border-r border-gray-200">
            <div class="recent-posts mb-8">
                <h4 class="font-semibold mb-2">Recent Posts</h4>
                <div v-for="post in posts" :key="post.id" class="post-item flex items-center mb-4">
                    <UIcon name="i-heroicons-document-text-solid" size="20" class="mr-2 text-gray-600" />
                    <div class="post-summary">
                        <h5 class="text-sm font-medium">{{ post.author }}</h5>
                        <p class="text-gray-600 text-xs">{{ post.content.substring(0, 40) }}...</p>
                    </div>
                </div>
            </div>

            <div class="mentions mb-8">
                <h4 class="font-semibold mb-2">Mentions</h4>
                <div v-for="post in posts" :key="post.id" class="mention-item flex items-center mb-4">
                    <UIcon name="i-heroicons-at-symbol-solid" size="20" class="mr-2 text-blue-600" />
                    <p class="text-sm text-blue-600">You were mentioned in: {{ post.content }}</p>
                </div>
            </div>

            <div class="notifications mb-8">
                <h4 class="font-semibold mb-2">Notifications</h4>
                <div v-for="post in posts" :key="post.id" class="notification-item flex items-center mb-4">
                    <UIcon name="i-heroicons-bell-solid" size="20" class="mr-2 text-yellow-500" />
                    <p class="text-sm text-yellow-500">New comment on your post: "{{ post.content }}"</p>
                </div>
            </div>

            <div class="active-farmers mb-8">
                <h4 class="font-semibold mb-2">Active Farmers</h4>
                <div class="active-farmer-item flex items-center mb-4" v-for="farmer in activeFarmers" :key="farmer.id">
                    <UIcon name="i-heroicons-user-circle-solid" size="20" class="mr-2 text-green-600" />
                    <p class="text-sm text-gray-600">{{ farmer.name }} ({{ farmer.state }})</p>
                </div>
            </div>
        </div>


        <div class="w-3/4 pl-4">

            <UCard class="new-post mb-6 shadow-md">
                <UInput type="textarea" v-model="newPost" placeholder="Share a thought or ask a question..." rows="3"
                    class="resize-none" />
                <UButton block class="mt-3 text-green-400" variant="primary" @click="submitPost"
                    :disabled="!newPost.trim()">
                    <UIcon name="i-heroicons-paper-clip-solid" size="20" class="mr-2" />
                    Post
                </UButton>
            </UCard>

            <!-- Posts Section -->
            <div v-for="post in posts" :key="post.id" class="post mb-4">
                <UCard class="shadow-md">
                    <!-- Post Content -->
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-medium">{{ post.author }}</h4>
                            <p class="text-gray-600 dark:text-gray-300">{{ post.content }}</p>
                        </div>
                        <small class="text-gray-500 dark:text-gray-400">{{ post.timestamp }}</small>
                    </div>


                    <div class="comments mt-4">
                        <h5 class="font-medium text-sm mb-2">Comments:</h5>
                        <div>

                            <HomeCommentItem v-for="comment in post.comments" :key="comment.id" :comment="comment"
                                :postId="post.id" @add-reply="handleAddReply" />
                        </div>


                        <div class="add-comment mt-2">
                            <UInput type="textarea" v-model="newComments[post.id]" placeholder="Write a comment..."
                                rows="2" class="resize-none" />
                            <UButton block class="mt-2 text-green-400" variant="success" @click="addComment(post.id)"
                                :disabled="!newComments[post.id]?.trim()">
                                <UIcon name="i-heroicons-chat-bubble-left-right-solid" size="20" class="mr-2" />
                                Comment
                            </UButton>
                        </div>
                    </div>
                </UCard>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";


useHead({
    title: 'Connect-community',
    meta: [
        { name: 'description', content: 'connect with farmers across the continent.' },
        { property: 'og:title', content: 'Connect-community' },
        { property: 'og:description', content: 'Share insights and build an Agriculture culture.' },
    ],
});


const activeFarmers = ref([
    { id: 1, name: "Wycliffe", state: "online" },
    { id: 2, name: "Nzembei", state: "offline" },
    { id: 3, name: "Mwendwa", state: "online" },
    { id: 3, name: "Maweu", state: "online" },
    { id: 3, name: "Katheu", state: "offline" },
    { id: 3, name: "Russia", state: "offline" },
    { id: 3, name: "Maxwell", state: "online" },
]);


const posts = ref([
    {
        id: 1,
        author: "Mwendwa Reuben",
        content: "What is the best way to increase crop yield?",
        timestamp: "2 hours ago",
        comments: [
            {
                id: 1,
                author: "Wycliffe Wambua",
                content: "I recommend organic farming.",
                replies: [],
            },
            {
                id: 2,
                author: "Katheu Musembi",
                content: "I recommend monituring your Watering patterns.",
                replies: [],
            },
        ],
    },
    {
        id: 2,
        author: "Reuben Nzembei",
        content: "Does anyone know how to deal with pests naturally?",
        timestamp: "1 hour ago",
        comments: [],
    },
]);


const newPost = ref("");


const newComments = ref({});


function submitPost() {
    if (!newPost.value.trim()) return;

    posts.value.unshift({
        id: Date.now(),
        author: "You",
        content: newPost.value.trim(),
        timestamp: "Just now",
        comments: [],
    });

    newPost.value = "";
}

function addComment(postId) {
    const commentContent = newComments.value[postId]?.trim();
    if (!commentContent) return;

    const post = posts.value.find((p) => p.id === postId);
    if (post) {
        post.comments.push({
            id: Date.now(),
            author: "You",
            content: commentContent,
            replies: [],
        });
    }

    newComments.value[postId] = "";
}


function handleAddReply({ postId, commentId, reply }) {
    const post = posts.value.find((p) => p.id === postId);
    if (!post) return;

    const findComment = (comments) =>
        comments.find((c) => c.id === commentId) ||
        comments.reduce((result, c) => result || findComment(c.replies), null);

    const comment = findComment(post.comments);
    if (comment) {
        comment.replies.push(reply);
    }
}
</script>

<style scoped>
.community-page {
    display: flex;
}
</style>