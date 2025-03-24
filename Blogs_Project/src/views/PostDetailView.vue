<template>
  <div>
    <div class="post-detail">
      <div class="post-container">
        <div class="post-content" v-if="post">
          <h1>{{ post.title }}</h1>
          <div class="post-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <p class="post-body">{{ post.body }}</p>
          <div class="post-actions">
            <router-link :to="`/edit/${post.id}`" class="btn btn-edit">Modifier</router-link>
            <router-link to="/" class="btn btn-back">Retour</router-link>
          </div>
        </div>
        <div v-else class="not-found">
          <p>Post non trouvé.</p>
          <router-link to="/" class="btn btn-back">Retour à l'accueil</router-link>
        </div>
        <aside class="tag-sidebar">
          <TagCloud :posts="allPosts" />
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import { getPost } from "@/composables/getPost";
import { getPosts } from "@/composables/getPosts";
import NavBar from "@/components/NavBar.vue";
import TagCloud from "@/components/TagCloud.vue";

export default {
  name: "PostDetailView",
  components: { NavBar, TagCloud },
  data() {
    return {
      post: null,
      allPosts: []
    }
  },
  created() {
    const id = this.$route.params.id;
    
    getPosts().then(posts => {
      this.allPosts = posts;
    }).catch(error => {
      console.error("Erreur lors du chargement des posts:", error);

    });
    
    getPost(id).then(post => {
      this.post = post;
    }).catch(error => {
      console.error("Erreur lors du chargement du post:", error);
    });
  }
}
</script>

<style scoped>
.post-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 15px;
}

.post-container {
  display: flex;
  gap: 20px;
  margin-top: 10px;

}

.post-content {
  flex: 3;
  background-color: white;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

h1 {
  color: #333;
  font-size: 1.8rem;
  margin-top: 0;
  margin-bottom: 15px;
  font-weight: 500;
}

.post-tags {
  margin: 15px 0;
}

.tag {
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 8px;
  background-color: #e6f2ff;
  padding: 4px 10px;
  border-radius: 3px;
  font-size: 0.8rem;
  color: #0066cc;
}

.post-body {
  line-height: 1.6;
  color: #333;
  margin-bottom: 20px;
}

.tag-sidebar {
  flex: 1;
  align-self: flex-start;
  position: sticky;
  top: 15px;
}

.post-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  border-top: 1px solid #f0f0f0;
  padding-top: 15px;
}

.btn {
  padding: 6px 12px;
  border-radius: 3px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  border: none;
  font-size: 0.85rem;
}

.btn-edit {
  background-color: #007bff;
  color: white;
}

.btn-back {
  background-color: #f0f0f0;
  color: #333;
}

.btn-edit:hover {
  background-color: #0069d9;
}

.btn-back:hover {
  background-color: #e0e0e0;
}

.not-found {
  text-align: center;
  padding: 30px;
  color: #666;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .post-container {
    flex-direction: column;
  }
  
  .tag-sidebar {
    position: static;
  }
  
  h1 {
    font-size: 1.5rem;
  }
}
</style>
