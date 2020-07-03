<template>
  <div id="page_user_create" class="dashboard-content">
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
        {{ $t("page_offer_end.title") }}
      </h1>
      <p class="description text-center mt-5">
        {{ $t("page_offer_end.description") }}
      </p>
      <div class="mt-5">
        <button
          class="btn btn-blue large mr-2 min-width-260"
          @click="
            $router.push({
              name: 'admin-offer-select-date',
              params: {
                offerId: $route.params.offerId
              }
            })
          "
        >
          {{ $t("page_offer_end.button.end_date") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EndContract"
};
</script>

<style scoped></style>
