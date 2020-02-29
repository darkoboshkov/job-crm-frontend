<template>
  <div id="page_welcome">
    <h1>{{ $t("page_welcome.title") }}</h1>
    <h2>{{ $t("page_welcome.sub_title") }}</h2>
    <p class="mt-5">{{ $t("page_welcome.description") }}</p>
    <button class="btn btn-blue large" @click="logout">
      <span>{{ $t("page_welcome.button.back") }}</span>
      <span class="float-right pl-4">
        <i class="hiway-crm-icon icon-angle-right" />
      </span>
    </button>
  </div>
</template>

<script>
import { handleLogout } from "@/utils";

export default {
  name: "Welcome",
  methods: {
    logout() {
      handleLogout();
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped></style>
