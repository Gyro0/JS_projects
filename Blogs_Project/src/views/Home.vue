<template>
  <div class="home">
    <div class="content">
      <PostList />
    </div>
  </div>
</template>
  
<script>
import NavBar from "@/components/NavBar.vue";
import PostList from "@/components/PostList.vue";
  
export default {
  name: "Home",
  components: { NavBar, PostList }
  
}

</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: #f9f9f9;
}

.content {
  padding-top: 10px;
  padding-bottom: 30px;
}

</style>
