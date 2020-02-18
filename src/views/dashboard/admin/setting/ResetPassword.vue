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
    <b-modal
      ref="modal-alert"
      :hide-footer="true"
      :hide-header="true"
      centered
      modal-class="modal-alert"
    >
      <div class="text-center">
        <img class="success-image" src="@/assets/image/icon/alert.svg" />
        <p class="alert-title color-blue">
          {{ $t("page_setting.modal.reset_password.error_title") }}
        </p>
        <p class="alert-sub-title">
          {{ error }}
        </p>
        <button class="btn btn-blue" @click="$refs['modal-alert'].hide()">
          {{ $t("page_setting.modal.reset_password.continue") }}
        </button>
      </div>
    </b-modal>
    <b-modal
      ref="modal-success"
      :hide-footer="true"
      :hide-header="true"
      centered
      modal-class="modal-alert"
    >
      <div class="text-center">
        <img class="success-image" src="@/assets/image/icon/success.svg" />
        <p class="alert-title color-blue">
          {{ $t("page_setting.modal.reset_password.success_title") }}
        </p>
        <p class="alert-sub-title">
          {{ $t("page_setting.modal.reset_password.success_sub_title") }}
        </p>
        <button class="btn btn-blue" @click="$refs['modal-alert'].hide()">
          {{ $t("page_setting.modal.reset_password.continue") }}
        </button>
      </div>
    </b-modal>
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
          this.$refs["modal-success"].show();
        })
        .catch(err => {
          let read = errorReader(err);
          this.error = read.param + " is " + read.msg.toLowerCase();

          this.$refs["modal-alert"].show();
        });

      settingsApi
        .patch(Object.assign(this.$store.state.user, this.model))
        .then(res => {
          this.$refs["modal-alert"].show();
          console.log("response", res);
        });
    }
  }
};
</script>

<style scoped></style>
