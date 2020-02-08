<template>
  <div id="page_settings" class="dashboard-content">
    <div class="container">
      <h1 class="title">{{ $t("SETTINGS") }}</h1>
      <b-tabs class="mt-3 bg-white">
        <b-tab :title="$t('ACCOUNT_SETTINGS')" active>
          <setting-account />
        </b-tab>

        <b-tab :title="$t('NOTIFICATIONS')">
          <p>I'm a disabled tab!</p>
        </b-tab>
        <b-tab :title="$t('OTHER')"> </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import SettingAccount from "./SettingAccount";
export default {
  name: "Setting",
  components: { SettingAccount }
};
</script>

<style scoped></style>
