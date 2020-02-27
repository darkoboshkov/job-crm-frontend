<template>
  <div id="app">
    <router-view />

    <div class="loader" v-if="$store.state.loading">
      <div class="overlay"></div>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<style></style>
