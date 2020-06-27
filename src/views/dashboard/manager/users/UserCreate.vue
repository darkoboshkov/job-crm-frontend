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
    <div class="content shadow-sm">
      <h1 class="title">{{ $t("page_users_create.title") }}</h1>
      <p class="mt-5">{{ $t("page_users_create.description") }}</p>
      <div class="mt-5">
        <button
          class="btn btn-red large mr-2 min-width-260"
          @click="$router.push({ name: 'manager-users-create-invite' })"
        >
          {{ $t("page_users_create.button.invite") }}
        </button>

        <button
          class="btn btn-blue large ml-2 min-width-240"
          @click="$router.push({ name: 'manager-users-create-manual' })"
        >
          {{ $t("page_users_create.button.manual") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Invitation",
  data() {
    return {};
  }
};
</script>

<style scoped></style>
