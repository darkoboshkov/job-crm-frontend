<template>
  <div id="page_404">
    <h1>404</h1>
    <h2>{{ $t("SOMETHING_WRONG") }}</h2>
    <p>
      Curabitur luctus sit amet nunc et commodo. Phasellus tincidunt, metus eu
      maximus interdum, dui purus cursus elit, nec bibendum tellus erat a
      libero. Morbi et auctor sapien, nec dignissim mi.
    </p>
    <button class="btn btn-blue large" @click="goToDashBoard">
      <span class="float-left pl-4">{{ $t("BACK_TO_YOUR_DASHBOARD") }}</span>
      <span class="float-right px-4">
        <i class="icon-angle-right" />
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
