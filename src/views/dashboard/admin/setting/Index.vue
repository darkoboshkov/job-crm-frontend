<template>
  <div id="page_settings" class="dashboard-content">
    <div class="container">
      <h1 class="title">{{ $t("page_setting.title") }}</h1>
      <b-tabs class="mt-3 bg-white">
        <b-tab :title="$t('page_setting.account_setting.title')" active>
          <setting-account />
        </b-tab>
        <b-tab :title="$t('page_setting.reset_password.title')">
          <reset-password />
        </b-tab>
        <b-tab :title="$t('page_setting.language_setting.title')">
          <localization />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import SettingAccount from "./SettingAccount";
import ResetPassword from "./ResetPassword";
import Localization from "@/components/common/Localization";
export default {
  name: "Setting",
  components: {
    Localization,
    SettingAccount,
    ResetPassword
  }
};
</script>

<style scoped></style>
