<template>
  <div>
    <div class="manage-posts">
      <h1>Gérer les articles</h1>
      
      <div class="posts-list" v-if="posts.length > 0">
        <div class="post-item" v-for="post in posts" :key="post.id">
          <div class="post-title">{{ post.title }}</div>
          <div class="post-actions">
            <router-link :to="`/edit/${post.id}`" class="btn btn-edit">Modifier</router-link>
            <button @click="deletePost(post.id)" class="btn btn-delete">Supprimer</button>
          </div>
        </div>
      </div>
      
      <div v-else class="no-posts">
        <p>Aucun article disponible</p>
        <router-link to="/create" class="btn btn-create">Créer un article</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { getPosts, deletePost } from "@/composables/getPosts";

export default {
  name: "ManagePostsView",
  components: {
    NavBar
  },
  data() {
    return {
      posts: []
    }
  },
  created() {
    this.loadPosts();
  },
  methods: {
    loadPosts() {
      getPosts().then(result => {
        this.posts = result;
      }).catch(error => {
        console.error("Erreur lors du chargement des posts:", error);
      });
    },
    deletePost(id) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
        deletePost(id).then(success => {
          if (success) {
            // Recharger la liste des posts après suppression
            this.loadPosts();
          } else {
            alert("Une erreur s'est produite lors de la suppression du post.");
          }
        }).catch(error => {
          console.error("Erreur lors de la suppression:", error);
          alert("Une erreur s'est produite lors de la suppression du post.");
        });
      }
    }
  }
}
</script>

<style scoped>
.manage-posts {
  max-width: 700px;
  margin: 0 auto;
  padding: 15px;
}

h1 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.posts-list {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.post-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #f0f0f0;
}

.post-item:last-child {
  border-bottom: none;
}

.post-title {
  font-weight: 500;
  font-size: 1rem;
  color: #333;
  flex: 1;
  text-align: left;
}

.post-actions {
  display: flex;
  gap: 8px;
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

.btn-edit:hover {
  background-color: #0069d9;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-delete:hover {
  background-color: #c82333;
}

.btn-create {
  background-color: #007bff;
  color: white;
  display: inline-block;
  margin-top: 10px;
}

.btn-create:hover {
  background-color: #0069d9;
}

.no-posts {
  text-align: center;
  padding: 20px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .post-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .post-title {
    margin-bottom: 10px;
  }
  
  .post-actions {
    width: 100%;
  }
  
  .btn {
    flex: 1;
    text-align: center;
  }
}
</style>