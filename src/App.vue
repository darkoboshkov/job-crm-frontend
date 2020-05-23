<template>
  <div id="app">
    <router-view />
    <loader />
    <success-modal />
    <error-modal />
    <confirm-modal />
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import ErrorModal from "@/components/ErrorModal";
import SuccessModal from "@/components/SuccessModal";
import ConfirmModal from "@/components/ConfirmModal";

export default {
  name: "App",
  components: {
    Loader,
    ErrorModal,
    SuccessModal,
    ConfirmModal
  }
};
</script>

<style></style>
