<template>
    <div class="comment-item bg-gray-100 dark:bg-gray-700 p-2 mb-2 rounded">

        <p>
            <strong>{{ comment.author }}:</strong> {{ comment.content }}
        </p>


        <div v-if="showReplyInput" class="mt-2">
            <UInput ref="replyInput" type="textarea" v-model="replyContent" placeholder="Write a reply..." rows="2"
                class="resize-none" />
            <UButton block class="mt-2" variant="success" @click="submitReply" :disabled="!replyContent.trim()">
                Reply
            </UButton>
        </div>
        <button @click="toggleReplyInput" class="mt-2 text-green-500 text-sm hover:underline">
            Reply
        </button>


        <div v-if="comment.replies.length" class="replies pl-4 mt-2 border-l border-gray-300">
            <div v-for="reply in comment.replies" :key="reply.id">
                <commentItem :comment="reply" :postId="postId" @add-reply="forwardReply" />
            </div>
            <div class="text-sm text-gray-500 mt-2">
                {{ comment.replies.length }} {{ comment.replies.length > 1 ? 'Replies' : 'Reply' }}
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, nextTick } from "vue";


defineProps({
    comment: Object,
    postId: {
        type: Number,
        required: true,
    },
});


const emit = defineEmits(["add-reply"]);


const showReplyInput = ref(false);
const replyContent = ref("");
const replyInput = ref(null);


function toggleReplyInput() {
    showReplyInput.value = !showReplyInput.value;
    if (showReplyInput.value) {
        nextTick(() => {
            replyInput.value?.focus();
        });
    }
}

function submitReply() {
    if (!replyContent.value.trim()) return;

    const reply = {
        id: Date.now(),
        author: "You",
        content: replyContent.value.trim(),
        replies: [],
    };


    emit("add-reply", { postId, commentId: comment.id, reply });
    replyContent.value = "";
    showReplyInput.value = false;
}

function forwardReply(data) {
    emit("add-reply", data);
}
</script>


<style scoped>
.comment-item {
    background-color: #f8f8f8;
    padding: 1rem;
    border-radius: 8px;
}

.replies {
    padding-left: 1.5rem;
    margin-top: 0.5rem;
    border-left: 2px solid #e0e0e0;
}
</style>