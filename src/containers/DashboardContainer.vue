<template>
  <div class="dashboard-container">
    <div class="dashboard-container__back">
      <div class="circle-2"></div>
      <div class="circle-3"></div>
      <div class="circle-4"></div>
      <div class="circle-5"></div>
      <div class="circle-6"></div>
    </div>
    <app-header />
    <app-sidebar />
    <div class="app-content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import AppSidebar from "../components/Sidebar/AppSidebar";
  import AppHeader from "../components/Header/AppHeader";
  export default {
    name: "DashboardContainer",
    components: {
      AppHeader,
      AppSidebar
    }
  }
</script>

<style scoped>

</style>
