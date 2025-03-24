<template>
  <div class="post-list">
    <h2 class="post-h">Posts</h2>
    <div class="post-container">
      <div class="posts">
        <SinglePost v-for="post in posts" :key="post.id" :post="post" />
      </div>
      <aside class="tags">
        <TagCloud :posts="posts" />
      </aside>
    </div>
  </div>
</template>

<script>
import SinglePost from "./SinglePost.vue";
import TagCloud from "./TagCloud.vue";
import { getPosts } from "@/composables/getPosts";

export default {
  name: "PostList",
  components: { SinglePost, TagCloud },
  data() {
    return {
      posts: []
    }
  },
  created() {
    getPosts().then(posts => {
      this.posts = posts;
    }).catch(error => {
      console.error('Erreur lors du chargement des posts:', error);
    });
  }
}
</script>

<style scoped>
.post-list {
  max-width: 1100px;
  margin: 0 auto;
  padding: 15px;
}

.post-h {
  text-align: center;
  margin-bottom: 15px;
  font-size: 1.6rem;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
}

.post-container {
  display: flex;
  gap: 20px;
}

.posts {
  flex: 3;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 15px;
}

.tags {
  flex: 1;
  align-self: flex-start;
  position: sticky;
  top: 15px;
}

</style>
