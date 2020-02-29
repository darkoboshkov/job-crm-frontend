<template>
  <div class="loader" v-if="$store.state.loading">
    <div class="overlay"></div>
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style scoped></style>
