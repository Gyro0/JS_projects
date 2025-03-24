<template>
  <div class="filter-nav">
    <h3>Rechercher</h3>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Rechercher un emploi..."
    />
  </div>
</template>

<script>
export default {
  name: 'FilterNav',
  props: {
    modelValue: String 
  }
};
</script>

<style scoped>
.filter-nav {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-nav h3 {
  margin-bottom: 10px;
  font-size: 1.5em;
  color: #333;
}

.filter-nav input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.filter-nav input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
