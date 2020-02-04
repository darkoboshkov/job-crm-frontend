<template>
  <div class="app-header">
    <div class="d-flex">
      <div class="logo">
        <a href="/"><img src="@/assets/logo.svg"/></a>
      </div>
      <div class="nav">
        <search-bar />
        <app-header-account-dropdown />
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/common/SearchBar.vue";
import AppHeaderAccountDropdown from "@/components/Header/AppHeaderAccountDropdown";

export default {
  name: "AppHeader",
  components: {
    AppHeaderAccountDropdown,
    SearchBar
  }
};
</script>

<style scoped></style>
