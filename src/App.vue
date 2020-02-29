<template>
  <div id="app">
    <router-view />

    <loader></loader>
    <success-modal></success-modal>
    <error-modal></error-modal>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import ErrorModal from "@/components/ErrorModal.vue";
import SuccessModal from "@/components/SuccessModal.vue";

export default {
  name: "App",
  components: {
    loader: Loader,
    "error-modal": ErrorModal,
    "success-modal": SuccessModal
  }
};
</script>

<style></style>
