<template>
  <div id="page_privacy" class="dashboard-content">
    <div class="container">
      <h1 class="title">{{ $t("page_privacy.title") }}</h1>
      <b-card id="privacy">
        <h3>1. {{ $t("page_privacy.privacy1") }}</h3>
        <p>{{ $t("page_privacy.privacy1_description1") }}</p>

        <h3>2. {{ $t("page_privacy.privacy2") }}</h3>
        <p>{{ $t("page_privacy.privacy2_description1") }}</p>

        <h3>3. {{ $t("page_privacy.privacy3") }}</h3>
        <p>{{ $t("page_privacy.privacy3_description1") }}</p>

        <h3>4. {{ $t("page_privacy.privacy4") }}</h3>
        <p>{{ $t("page_privacy.privacy4_description1") }}</p>

        <h3>5. {{ $t("page_privacy.privacy5") }}</h3>
        <p>{{ $t("page_privacy.privacy5_description1") }}</p>
        <p>{{ $t("page_privacy.privacy5_description2") }}</p>
        <p>{{ $t("page_privacy.privacy5_description3") }}</p>
        <p>{{ $t("page_privacy.privacy5_description4") }}</p>

        <h3>6. {{ $t("page_privacy.privacy6") }}</h3>
        <p>{{ $t("page_privacy.privacy6_description1") }}</p>

        <h3>7. {{ $t("page_privacy.privacy7") }}</h3>
        <p>{{ $t("page_privacy.privacy7_description1") }}</p>
        <p>{{ $t("page_privacy.privacy7_description2") }}</p>

        <h3>8. {{ $t("page_privacy.privacy8") }}</h3>
        <p>{{ $t("page_privacy.privacy8_description1") }}</p>
        <p>{{ $t("page_privacy.privacy8_description2") }}</p>
        <p>{{ $t("page_privacy.privacy8_description3") }}</p>
      </b-card>
    </div>
  </div>
</template>

<script>
import Card from "@/components/common/Card.vue";

export default {
  name: "privacy",
  components: {
    Card
  }
};
</script>

<style scoped></style>
