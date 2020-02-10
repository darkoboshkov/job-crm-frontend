<template>
  <div id="page_user_create" class="dashboard-content">
    <h1 class="title">{{ $t("page_users_create.title") }}</h1>
    <p class="mt-5">{{ $t("page_users_create.description") }}</p>
    <div class="d-flex mt-5">
      <button
        class="btn btn-red large mr-4"
        @click.prevent="$router.push({ name: 'admin-users-create-invite' })"
        style="min-width:260px;"
      >
        {{ $t("page_users_create.button.invite") }}
      </button>

      <button
        class="btn btn-blue large"
        @click.prevent="$router.push({ name: 'admin-users-create-manual' })"
        style="min-width:240px;"
      >
        {{ $t("page_users_create.button.manual") }}
      </button>
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
