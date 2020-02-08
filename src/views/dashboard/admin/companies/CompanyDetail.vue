<template>
  <div id="page_companies_detail" class="dashboard-content">
    <a href="javascript:void(0)" class="back" @click.prevent="$router.go(-1)">
      <i class="hiway-crm-icon icon-angle-left mr-2" />
      <span>{{ $t("BACK") }}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "CompanyDetail"
};
</script>

<style scoped></style>
