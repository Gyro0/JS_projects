<template>
  <div class="single-post">
    <h2 class="post-title">{{ post.title }}</h2>
    <p class="tags">
      <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
    </p>
    <p class="snippet">{{ snippet }}</p>
    <router-link :to="`/post/${post.id}`" class="read-more">Lire la suite</router-link>
  </div>
</template>

<script>
export default {
  name: "SinglePost",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    snippet() {
      // Calcul du snippet : 50 premiers caractères du body
      return this.post.body.substring(0, 50) + (this.post.body.length > 50 ? "..." : "");
    }
  }
}
</script>

<style scoped>
.single-post {
  padding: 16px;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  background-color: white;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.single-post:hover {
  background-color: #f9f9f9;
}

.post-title {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 1.3rem;
  color: #333;
  font-weight: 500;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.tags span {
  margin-right: 6px;
  margin-bottom: 6px;
  font-size: 0.75rem;
  background: #efefef;
  color: #555;
  padding: 4px 8px;
  border-radius: 3px;
}

.snippet {
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
  font-size: 0.95rem;
}

.read-more {
  display: inline-block;
  color: #0077cc;
  font-size: 0.9rem;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 2px;
  transition: border-color 0.2s;
}

.read-more:hover {
  border-bottom: 1px solid #0077cc;
}
</style>
