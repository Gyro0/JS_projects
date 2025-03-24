<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/create">Ajouter un post</router-link></li>
      <li><router-link to="/manage-posts">Gérer les posts</router-link></li>
    </ul>
  </nav>
</template>
  
<script>
export default {
  name: "NavBar"
}
</script>
  
<style scoped>
.navbar {
  background-color: #f8f8f8;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

nav ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  justify-content: center;
}

nav li {
  margin: 0 0.8rem;
}

nav a {
  display: inline-block;
  padding: 0.8rem 0.3rem;
  color: #444;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

nav a:hover {
  color: #007bff;
  border-bottom-color: #007bff;
}

nav a.router-link-active {
  color: #007bff;
  border-bottom-color: #007bff;
}

</style>
