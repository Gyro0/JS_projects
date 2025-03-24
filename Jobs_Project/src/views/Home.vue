<template>
  <div class="home">
    <h2>Page d'accueil - Liste des emplois</h2>
    <FilterNav v-model="searchQuery" />

    <div class="jobs-list">
      <div v-for="job in filteredJobs" :key="job.id" class="job-item" @click="goToJobDetails(job.id)">
        <p id="titre">{{ job.titre }}</p>
        <p id="salaire">Salaire : {{ job.salaire }} $</p>
        <p id="date">Annee D'experience : {{ job.annee_experience }}</p>
        <button @click.stop="deleteJob(job.id)" class="delete-button">Supprimer</button>
      </div>
    </div>

    <button @click="goToAddJob" class="add-button">Ajouter un emploi</button>
  </div>
</template>

<script>
import FilterNav from '@/components/FilterNav.vue'
import JobDetail from '@/components/JobDetail.vue'

export default {
  name: 'Home',
  components: {
    FilterNav,
    JobDetail
  },
  data() {
    return {
      jobs: [],
      filteredJobs: [],
      searchQuery: '',

    }
  },
  mounted() {
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      this.jobs = JSON.parse(storedJobs);
      this.filteredJobs = JSON.parse(storedJobs);
    } else {
      fetch('/jobsList.json')
        .then(response => response.json())
        .then(data => {
          this.jobs = data;
          this.filteredJobs = data;
          localStorage.setItem('jobs', JSON.stringify(data));
        });
    }
  },
  methods: {
    goToAddJob() {
      this.$router.push('/add')
    },
    deleteJob(jobId) {
      const confirmed = confirm('Voulez-vous vraiment supprimer cet emploi ?');
      if (confirmed) {
        this.jobs = this.jobs.filter(job => job.id !== jobId);
        this.filteredJobs = this.filteredJobs.filter(job => job.id !== jobId);

        localStorage.setItem('jobs', JSON.stringify(this.jobs));
      }
    },
    goToJobDetails(jobId) {
      this.$router.push({ name: 'JobDetails', params: { id: Number(jobId) } });
    }
  },
  computed: {
    filteredJobs() {
      return this.jobs.filter(job =>
        job.titre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

.jobs-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  list-style-type: none;
  padding: 0;
  margin: 0; 
}

.job-item {
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#titre {
  font-weight:bold;
  font-size:large;
}
.job-item:hover{
  scale: 1.07;
  transition: 0.3s;
  cursor: pointer;
  background-color: #f0f0f0;
}

.job-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.job-link:hover {
  text-decoration: underline;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.delete-button:hover {
  background-color: #c82333;
}

.add-button {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: 500;
}

.add-button:hover {
  background-color: #0056b3;
}
</style>