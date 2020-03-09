<template>
  <div class="setting-profile">
    <div class="setting-profile__form">
      <div class="form-element">
        <label
          >{{ $t("page_setting.reset_password.form.old_password") }}:</label
        >
        <b-form-input
          type="password"
          required
          class="custom-input"
          v-model="model.oldPassword"
        />
      </div>
      <div class="form-element mt-3">
        <label
          >{{ $t("page_setting.reset_password.form.new_password") }}:</label
        >
        <b-form-input
          type="password"
          required
          class="custom-input"
          v-model="model.newPassword"
        />
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.reset_password.form.confirm") }}:</label>
        <b-form-input
          type="password"
          required
          class="custom-input"
          v-model="model.confirm"
        />
      </div>
      <div class="form-element mt-3">
        <button class="btn btn-blue" @click="update">
          {{ $t("page_setting.reset_password.button.update") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import settingsApi from "@/services/api/settings";
import errorReader from "@/helpers/ErrorReader";

export default {
  name: "ResetPassword",
  data() {
    return {
      error: "",
      model: {
        oldPassword: "",
        newPassword: "",
        confirm: ""
      }
    };
  },
  mounted() {},
  methods: {
    update() {
      settingsApi
        .resetPassword(this.model)
        .then(res => {
          this.$store.dispatch("updateShowSuccessModal", true);
          this.$store.dispatch("updateSuccessModalContent", {
            title: this.$t("page_setting.modal.reset_password.success_title"),
            subTitle: this.$t(
              "page_setting.modal.reset_password.success_sub_title"
            ),
            button: this.$t("page_setting.modal.reset_password.continue")
          });
        })
        .catch(err => {
          let read = errorReader(err);
          this.error = read.param + " is " + read.msg.toLowerCase();

          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_setting.modal.reset_password.error_title"),
            subTitle: this.error,
            button: this.$t("page_setting.modal.reset_password.continue")
          });
        });

      settingsApi
        .patch(Object.assign(this.$store.state.user, this.model))
        .then(res => {
          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_setting.modal.reset_password.error_title"),
            subTitle: this.error,
            button: this.$t("page_setting.modal.reset_password.continue")
          });
        });
    }
  }
};
</script>

<style scoped></style>
