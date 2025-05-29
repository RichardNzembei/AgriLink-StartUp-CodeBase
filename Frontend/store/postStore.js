import { defineStore } from "pinia";
import axios from "axios";

const apiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://agrilink-startup-codebase.onrender.com"
    : "http://localhost:5000";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [],
    loading: false,
  }),

  actions: {
    async fetchPosts() {
      try {
        this.loading = true;
        const response = await axios.get(`${apiBaseUrl}/api/posts`);
        this.posts = response.data;
        console.log("✅ Posts retrieved:", this.posts.length);
      } catch (error) {
        console.error("❌ Fetch error:", error);
      } finally {
        this.loading = false;
      }
    },

    async addPost(content) {
      if (!content.trim()) return;

      const userPhone = localStorage.getItem("currentUserPhone");
      if (!userPhone) {
        console.error("❌ User not logged in!");
        return Promise.reject("User not logged in");
      }

      const newPost = {
        authorPhone: userPhone,
        content,
        timestamp: new Date().toISOString(),
        comments: [],
      };

      try {
        this.loading = true;
        const response = await axios.post(`${apiBaseUrl}/api/posts`, newPost);
        this.posts.unshift(response.data);
        console.log("✅ Post added successfully");
      } catch (error) {
        console.error("❌ Error adding post:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async addComment(postId, content) {
      if (!content.trim()) return;

      const userPhone = localStorage.getItem("currentUserPhone");
      if (!userPhone) {
        console.error("❌ User not logged in!");
        return Promise.reject("User not logged in");
      }

      const newComment = {
        authorPhone: userPhone,
        content,
        timestamp: new Date().toISOString(),
      };

      try {
        this.loading = true;
        const response = await axios.post(
          `${apiBaseUrl}/api/posts/${postId}/comments`,
          newComment
        );
        const updatedPost = response.data;
        const postIndex = this.posts.findIndex((p) => p.id === postId);
        if (postIndex !== -1)
          this.posts[postIndex].comments.push(updatedPost.comments.at(-1));

        console.log("✅ Comment added successfully");
      } catch (error) {
        console.error("❌ Error adding comment:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});