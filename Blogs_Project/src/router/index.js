// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import CreatePostView from "@/views/CreatePostView.vue";
import EditPostView from "@/views/EditPostView.vue";
import PostDetailView from "@/views/PostDetailView.vue";
import TagPostsView from "@/views/TagPostsView.vue";
import ManagePostsView from "@/views/ManagePostsView.vue";

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/create", name: "CreatePost", component: CreatePostView },
    { path: "/edit/:id", name: "EditPost", component: EditPostView },
    { path: "/post/:id", name: "PostDetail", component: PostDetailView },
    { path: "/tags/:tag", name: "TagPosts", component: TagPostsView },
    { path: "/manage-posts", name: "ManagePosts", component: ManagePostsView }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;