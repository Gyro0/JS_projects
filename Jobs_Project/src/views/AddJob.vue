<template>
  <div class="add-job">
    <h2>Ajouter un nouvel emploi</h2>
    <form @submit.prevent="addNewJob">
      <div class="form-group">
        <label for="titre">Titre :</label>
        <input id="titre" v-model="job.titre" type="text" required />
      </div>
      <div class="form-group">
        <label for="description">Description :</label>
        <textarea id="description" v-model="job.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="salaire">Salaire :</label>
        <input id="salaire" v-model.number="job.salaire" type="number" required />
      </div>
      <div class="form-group">
        <label for="date_creation">Date de création :</label>
        <input id="date_creation" v-model="job.date_creation" type="date" required />
      </div>
      <div class="form-group">
        <label for="annee_experience">Année d'expérience :</label>
        <input id="annee_experience" v-model.number="job.annee_experience" type="number" required />
      </div>
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddJob',
  data() {
    return {
      job: {
        titre: '',
        description: '',
        salaire: 0,
        date_creation: '',
        annee_experience: 0
      }
    }
  },
  methods: {
    addNewJob() {
      // 1) Récupérer la liste existante depuis localStorage
      const storedJobs = localStorage.getItem('jobs');
      let jobsList = [];
      if (storedJobs) {
        jobsList = JSON.parse(storedJobs);
      }
      
      // 2) Construire un nouvel objet emploi
      //    On peut générer un id = max existant + 1, 
      //    pour éviter les doublons si des emplois ont été supprimés
      const maxId = jobsList.length
        ? Math.max(...jobsList.map(j => j.id))
        : 0;
      
      const newJob = {
        id: maxId + 1,
        titre: this.job.titre,
        description: this.job.description,
        salaire: this.job.salaire,
        date_creation: this.job.date_creation,
        annee_experience: this.job.annee_experience
      };

      // 3) Ajouter dans la liste, puis stocker dans localStorage
      jobsList.push(newJob);
      localStorage.setItem('jobs', JSON.stringify(jobsList));

      // 4) Afficher dans la console, si besoin
      console.log('[AddJob] Nouvelle liste après ajout : ', jobsList);

      // 5) Réinitialiser le formulaire
      this.job.titre = '';
      this.job.description = '';
      this.job.salaire = 0;
      this.job.date_creation = '';
      this.job.annee_experience = 0;

      // 6) Rediriger vers la page d'accueil
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.add-job {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>
