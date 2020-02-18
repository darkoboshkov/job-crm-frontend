<template>
  <div id="page_jobs_select_candidate" class="dashboard-content">
    <h1 class="title text-center">
      {{ $t("page_jobs_select_candidate.title") }}
    </h1>
    <p class="description text-center mt-5">
      {{ $t("page_jobs_select_candidate.description") }}
    </p>
    <div class="form-element mt-5">
      <b-form-input
          type="text"
          required
          class="custom-input"
          :placeholder="$t('page_jobs_select_candidate.form.search')"
          v-model="form.search"
      />
    </div>
    <div class="mt-5">
      <button
          class="btn btn-red large mr-2"
          style="min-width:260px;"
      >
        {{ $t("page_jobs_select_candidate.button.search") }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CandidateSelect",
    data() {
      return {
        form: {
          search: "",
          users: []
        },
      }
    }
  };
</script>

<style scoped></style>
