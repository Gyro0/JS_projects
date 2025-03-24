<template>
  <div v-if="job">
    <h2>{{ job.titre }}</h2>
    <p>{{ job.description }}</p>
    <p>Salaire : {{ job.salaire }} €</p>
    <p>Date de création : {{ job.date_creation }}</p>
    <p>Années d'expérience : {{ job.annee_experience }}</p>

    <div class="actions">
      <!-- Bouton d'édition -->
      <button @click="goToEdit" class="edit-button">Modifier</button>
      <!-- Bouton de suppression -->
      <button @click="deleteJob" class="delete-button">Supprimer</button>
    </div>
  </div>
  <div v-else>
    <p>Emploi introuvable.</p>
  </div>
</template>

<script>
export default {
  name: 'JobDetail',
  props: ['id'], // on reçoit l'ID depuis la route (props: true)
  data() {
    return {
      job: null
    };
  },
  mounted() {
    const jobId = parseInt(this.id);
    // Récupération de la liste mise à jour depuis localStorage
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      const jobsList = JSON.parse(storedJobs);
      // Recherche de l'emploi correspondant
      const foundJob = jobsList.find(j => j.id === jobId);
      if (foundJob) {
        this.job = foundJob;
      }
    }
  },
  methods: {
    goToEdit() {
      // Rediriger vers la page d'édition => /jobs/ID/edit
      this.$router.push(`/jobs/${this.id}`);
    },
    deleteJob() {
      const confirmed = confirm('Voulez-vous vraiment supprimer cet emploi ?');
      if (confirmed) {
        // 1) Récupérer la liste depuis localStorage
        const storedJobs = localStorage.getItem('jobs');
        if (!storedJobs) return;
        let jobsList = JSON.parse(storedJobs);

        // 2) Filtrer pour supprimer l'emploi en question
        const jobId = parseInt(this.id);
        jobsList = jobsList.filter(j => j.id !== jobId);

        // 3) Mettre à jour localStorage
        localStorage.setItem('jobs', JSON.stringify(jobsList));

        // 4) Rediriger par exemple vers la page d'accueil (ou autre)
        this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped>
.actions {
  margin-top: 20px;
}

/* Bouton d'édition */
.edit-button {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-right: 10px;
}

.edit-button:hover {
  background-color: #0056b3;
}

/* Bouton de suppression */
.delete-button {
  background-color: #dc3545; 
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>
