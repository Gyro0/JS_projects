<template>
  <div>
    <div class="tag-posts-container">
      <h1>Posts avec le tag: <span class="highlight">{{ tag }}</span></h1>
      <div class="post-list">
        <div class="posts">
          <SinglePost v-for="post in filteredPosts" :key="post.id" :post="post" />
          <p v-if="filteredPosts.length === 0" class="no-posts">Aucun post trouvé avec ce tag.</p>
        </div>
        <aside class="tags">
          <TagCloud :posts="posts" />
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SinglePost from "@/components/SinglePost.vue";
import TagCloud from "@/components/TagCloud.vue";
import { getPosts } from "@/composables/getPosts";

export default {
  name: "TagPostsView",
  components: { NavBar, SinglePost, TagCloud },
  data() {
    return {
      tag: "",
      posts: []
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post => post.tags.includes(this.tag));
    }
  },
  created() {
    this.tag = this.$route.params.tag;
    getPosts().then(posts => {
      this.posts = posts;
    }).catch(error => {
      console.error("Erreur lors du chargement des posts:", error);
    });
  },
  watch: {
    "$route.params.tag": function(newTag) {
      this.tag = newTag;
    }
  }
}
</script>

<style scoped>
.tag-posts-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 15px;
}

h1 {
  color: #333;
  font-size: 1.5rem;
  margin: 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.highlight {
  color: #007bff;
}

.post-list {
  display: flex;
  gap: 20px;
  margin-top: 15px;
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

.no-posts {
  text-align: center;
  padding: 20px;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin: 10px 0;
}

@media (max-width: 768px) {
  .post-list {
    flex-direction: column;
  }
  
  .tags {
    margin-top: 15px;
    position: static;
  }
  
  h1 {
    font-size: 1.3rem;
  }
}
</style>