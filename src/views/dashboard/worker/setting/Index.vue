<template>
  <div id="page_settings" class="dashboard-content">
    <div class="container">
      <h1 class="title">{{ $t("page_setting.title") }}</h1>
      <b-tabs class="mt-3 bg-white">
        <b-tab :title="$t('page_setting.account_setting.title')" active>
          <setting-account />
        </b-tab>
        <b-tab :title="$t('page_setting.system_setting.title')">
          <setting-system />
        </b-tab>
        <b-tab :title="$t('page_setting.notification_setting.title')"> </b-tab>
        <b-tab :title="$t('page_setting.other_setting.title')"> </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import SettingAccount from "./SettingAccount";
import SettingSystem from "./SettingSystem";
export default {
  name: "Setting",
  components: { SettingSystem, SettingAccount }
};
</script>

<style scoped></style>
