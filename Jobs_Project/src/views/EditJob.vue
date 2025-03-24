<template>
  <div class="edit-job">
    <h2>Modifier l'emploi</h2>
    <form @submit.prevent="updateJob">
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
        <input
          id="annee_experience"
          v-model.number="job.annee_experience"
          type="number"
          required
        />
      </div>

      <button type="submit" class="btn">Mettre à jour</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EditJob',
  props: {
    id: {
      type: String,
      required: true
    }
  },
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
  created() {
    this.loadJob();
  },
  methods: {
    loadJob() {
      console.log('Chargement du job...');
      console.log('ID reçu dans le composant:', this.id);
      
      // Convertir l'ID en number pour la comparaison
      const jobId = parseInt(this.id);
      
      const storedJobs = localStorage.getItem('jobs');
      if (!storedJobs) {
        console.error('Aucun job trouvé dans localStorage.');
        return;
      }

      const jobsList = JSON.parse(storedJobs);
      console.log('Liste des jobs récupérée :', jobsList);

      const jobToEdit = jobsList.find(job => job.id === jobId);
      if (!jobToEdit) {
        console.error(`Aucun job trouvé avec l'ID ${jobId}`);
        return;
      }

      this.job = { ...jobToEdit };
      console.log('Données du job chargé :', this.job);
    },
    updateJob() {
      // Convertir l'ID en number pour la comparaison
      const jobId = parseInt(this.id);
      
      // 1) Récupérer la liste existante depuis localStorage
      const storedJobs = localStorage.getItem('jobs');
      if (storedJobs) {
        let jobsList = JSON.parse(storedJobs);
        // 2) Retrouver l'index de l'emploi à modifier
        const index = jobsList.findIndex(j => j.id === jobId);
        if (index !== -1) {
          // 3) Mettre à jour dans le tableau
          jobsList[index] = {
            ...this.job,
            id: jobId // S'assurer que l'ID reste intact
          };
          // 4) Réécrire dans localStorage
          localStorage.setItem('jobs', JSON.stringify(jobsList));
        }
      }
      // 5) Rediriger vers la page d'accueil
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.edit-job {
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
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="date"],
input[type="number"] {
  padding-right: 10px;
}

textarea {
  resize: vertical;
}

.btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
