<template>
    <div class="create-post">
      <div class="form-container">
        <h1>Créer un nouveau post</h1>
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
            <input id="tags" v-model="form.tags" placeholder="technologie, vue, blog" />
          </div>
          <button type="submit" class="submit-button">Ajouter</button>
        </form>
      </div>
    </div>
</template>
  
<script>
import { addPost } from "@/composables/getPosts";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "CreatePostView",
  components: {
    NavBar
  },
  data() {
    return {
      form: {
        title: "",
        body: "",
        tags: ""
      }
    }
  },
  methods: {
    handleSubmit() {
      // Convertir la chaîne de tags en tableau
      const tags = this.form.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      
      // Créer un objet post
      const newPost = {
        title: this.form.title,
        body: this.form.body,
        tags: tags
      };
      
      // Ajouter le post en utilisant notre fonction
      addPost(newPost).then(() => {
        // Rediriger vers la page d'accueil
        this.$router.push("/");
      }).catch(error => {
        console.error("Erreur lors de l'ajout du post:", error);
      });
    }
  }
}
</script>

<style scoped>
.create-post {
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

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 3px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0069d9;
}

/* Responsive design */
@media (max-width: 768px) {
  .form-container {
    padding: 15px;
  }
  
  h1 {
    font-size: 1.3rem;
  }
}
</style>
