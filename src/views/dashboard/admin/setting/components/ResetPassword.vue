<template>
  <div class="setting-profile">
    <div class="setting-profile__form">
      <div class="form-element">
        <label>
          {{ $t("page_setting.reset_password.form.old_password") }}:
        </label>
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="password"
            required
            class="custom-input"
            v-model="model.oldPassword"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("oldPassword") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>
          {{ $t("page_setting.reset_password.form.new_password") }}:
        </label>
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="password"
            required
            class="custom-input"
            v-model="model.newPassword"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("newPassword") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.reset_password.form.confirm") }}:</label>
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="password"
            required
            class="custom-input"
            v-model="model.confirm"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("confirm") }}
          </b-form-invalid-feedback>
        </div>
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

export default {
  name: "ResetPassword",
  data() {
    return {
      error: "",
      model: {
        oldPassword: "",
        newPassword: "",
        confirm: ""
      },
      errors: null
    };
  },
  mounted() {},
  methods: {
    validate() {
      this.errors = [];
      if (!this.model.oldPassword) {
        this.errors.push({
          param: "oldPassword",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!this.model.newPassword) {
        this.errors.push({
          param: "newPassword",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      } else {
        if (this.model.newPassword.length < 5) {
          this.errors.push({
            param: "newPassword",
            msg: "PASSWORD_TOO_SHORT_MIN_5"
          });
        }
      }
      if (this.model.newPassword !== this.model.confirm) {
        this.errors.push({
          param: "confirm",
          msg: "PASSWORDS_NOT_MATCH"
        });
      }
      return this.errors.length === 0;
    },
    update() {
      if (this.validate()) {
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
            this.errors = err.response.data.errors.msg;
            this.$store.dispatch("updateShowErrorModal", true);
            this.$store.dispatch("updateErrorModalContent", {
              title: this.$t("page_setting.modal.reset_password.error_title"),
              button: this.$t("page_setting.modal.reset_password.continue")
            });
          });
      }
    }
  }
};
</script>

<style scoped />
