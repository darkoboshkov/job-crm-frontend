<template>
  <div id="page_jobs_choose_candidate" class="dashboard-content">
    <div class="d-flex">
      <a
        href="javascript:void(0)"
        class="back pull-left"
        @click.prevent="$router.go(-1)"
      >
        <i class="hiway-crm-icon icon-angle-left mr-2" />
        <span>{{ $t("common.back") }}</span>
      </a>
    </div>
    <div class="content">
      <h1 class="title text-center">
        {{ $t("page_jobs_choose_candidate.title") }}
      </h1>
      <p class="description text-center mt-5">
        {{ $t("page_jobs_choose_candidate.description") }}
      </p>
      <div class="mt-5">
        <button
          class="btn btn-red large mr-2 min-btn-260"
          @click="
            $router.push({
              name: 'manager-jobs-select-candidate',
              params: {
                jobId: $route.params.jobId
              }
            })
          "
        >
          {{ $t("page_jobs_choose_candidate.button.search") }}
        </button>

        <button
          class="btn btn-blue large ml-2 min-btn-240"
          @click="$router.push({ name: 'manager-users-create' })"
        >
          {{ $t("page_jobs_choose_candidate.button.new") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CandidateChoose"
};
</script>

<style scoped></style>
