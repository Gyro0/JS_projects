<template>
  <div class="tag-cloud">
    <h3>Tags</h3>
    <ul>
      <li v-for="tag in uniqueTags" :key="tag">
        <router-link :to="`/tags/${tag}`" class="tag-link">{{ tag }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TagCloud",
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  computed: {
    uniqueTags() {
      const tags = this.posts.flatMap(post => post.tags);
      return [...new Set(tags)];
    }
  }
}
</script>

<style scoped>
.tag-cloud {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.tag-cloud h3 {
  margin: 0 0 10px 0;
  color: #444;
  font-size: 1rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
}

.tag-cloud ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tag-cloud li {
  margin-bottom: 5px;
}

.tag-link {
  display: block;
  padding: 5px 8px;
  background-color: #efefef;
  color: #333;
  text-decoration: none;
  border-radius: 3px;
  font-size: 0.85rem;
  text-align: left;
}

.tag-link:hover {
  background-color: #e0e0e0;
}

.tag-link.router-link-active {
  background-color: #d0d0d0;
  font-weight: 500;
}
</style>
