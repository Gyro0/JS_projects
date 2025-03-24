<template>
  <div id="app">
    
    <h1>Application de gestion des emplois</h1>
    <nav class="navbar">
    <ul class="navbar-list">
      <li class="navbar-item">
        <router-link class="navbar-link" :to="{ name: 'Home' }">Accueil</router-link>
      </li>
      <li class="navbar-item">
        <router-link class="navbar-link" :to="{ name: 'AddJob' }">Ajouter un emploi</router-link>
      </li>
    </ul>
    </nav> 
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #42b983;
}

router-view {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}
.navbar {
  background-color: #333;
  color: white;
  padding: 10px;
}

.navbar-list {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
  justify-content: center; 
  align-items: center;    
  gap: 1rem;             
}



.navbar-link {
  color: white;
  text-decoration: none;
  font-weight: 500; 
}

.navbar-link:hover {
  text-decoration: underline;
}
</style>