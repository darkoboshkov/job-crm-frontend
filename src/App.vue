<template>
  <div id="app">
    <router-view />
    <loader />
    <success-modal />
    <error-modal />
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import ErrorModal from "@/components/ErrorModal";
import SuccessModal from "@/components/SuccessModal";

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
