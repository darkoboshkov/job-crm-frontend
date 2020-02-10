<template>
  <div id="page_404">
    <h1>{{ $t("page_404.title") }}</h1>
    <h2>{{ $t("page_404.sub_title") }}</h2>
    <p>
      {{ $t("page_404.text") }}.
    </p>
    <button class="btn btn-blue large" @click="goToDashBoard">
      <span>{{ $t("page_404.button.back") }}</span>
      <span class="float-right pl-4">
        <i class="hiway-crm-icon icon-angle-right" />
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Page404",
  methods: {
    goToDashBoard() {
      this.$router.push("/dashboard");
    }
  }
};
</script>
