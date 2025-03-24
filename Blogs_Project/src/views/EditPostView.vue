<template>
  <div>
    <div class="edit-post" v-if="post">
      <div class="form-container">
        <h1>Modifier un post</h1>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="title">Titre :</label>
            <input id="title" v-model="form.title" required />
          </div>
          <div class="form-group">
            <label for="body">Contenu :</label>
            <textarea id="body" v-model="form.body" required rows="8"></textarea>
          </div>
          <div class="form-group">
            <label for="tags">Tags (séparés par des virgules) :</label>
            <input id="tags" v-model="tagsString" placeholder="technologie, vue, blog" />
          </div>
          <div class="button-group">
            <button type="submit" class="submit-button">Mettre à jour</button>
            <button type="button" @click="$router.go(-1)" class="cancel-button">Annuler</button>
          </div>
        </form>
      </div>
    </div>
    <div v-else class="loading">
      <p>Chargement du post...</p>
    </div>
  </div>
</template>

<script>
import { getPost } from "@/composables/getPost";
import { updatePost } from "@/composables/getPosts";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "EditPostView",
  components: {
    NavBar
  },
  data() {
    return {
      post: null,
      form: {
        title: "",
        body: "",
      },
      tagsString: ""
    };
  },
  created() {
    this.loadPost();
  },
  methods: {
    loadPost() {
      const id = parseInt(this.$route.params.id);
      
      getPost(id).then(post => {
        this.post = post;
        
        if (this.post) {
          // Mettre à jour les champs du formulaire
          this.form.title = this.post.title;
          this.form.body = this.post.body;
          this.tagsString = this.post.tags.join(", ");
        } else {
          alert("Post non trouvé!");
          this.$router.push("/");
        }
      }).catch(error => {
        console.error("Erreur lors du chargement du post:", error);
        alert("Une erreur s'est produite lors du chargement du post.");
        this.$router.push("/");
      });
    },
    handleSubmit() {
      // Convertir la chaîne de tags en tableau
      const tags = this.tagsString
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
      
      // Mettre à jour le post
      const updatedPost = {
        ...this.post,
        title: this.form.title,
        body: this.form.body,
        tags: tags
      };
      
      updatePost(updatedPost).then(success => {
        if (success) {
          // Rediriger vers la page de détails du post
          this.$router.push(`/post/${this.post.id}`);
        } else {
          alert("Une erreur s'est produite lors de la mise à jour du post.");
        }
      }).catch(error => {
        console.error("Erreur lors de la mise à jour:", error);
        alert("Une erreur s'est produite lors de la mise à jour du post.");
      });
    }
  }
};
</script>

<style scoped>
.edit-post {
  max-width: 700px;
  margin: 0 auto;
  padding: 15px;
}

.form-container {
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-top: 20px;
}

h1 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
  font-size: 0.95rem;
}

input, textarea {
  width: 100%;
  padding: 8px 10px;
  font-size: 0.95rem;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-sizing: border-box;
}

input:focus, textarea:focus {
  border-color: #007bff;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 140px;
}

.button-group {
  display: flex;
  gap: 10px;
}

.submit-button, .cancel-button {
  padding: 8px 16px;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 3px;
  cursor: pointer;
  border: none;
}

.submit-button {
  background-color: #007bff;
  color: white;
  flex: 1;
}

.cancel-button {
  background-color: #f0f0f0;
  color: #333;
}

.submit-button:hover {
  background-color: #0069d9;
}

.cancel-button:hover {
  background-color: #e0e0e0;
}

.loading {
  text-align: center;
  margin-top: 30px;
  color: #666;
  font-size: 1rem;
}

</style>