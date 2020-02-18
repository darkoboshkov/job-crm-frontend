<template>
  <div class="setting-profile">
    <div class="setting-profile__form">
      <div class="form-element">
        <label>{{ $t("page_setting.account_setting.form.first_name") }}:</label>
        <b-form-input
          type="text"
          required
          class="custom-input"
          v-model="model.firstName"
        ></b-form-input>
      </div>
      <div class="form-element mt-3">
        <label
          >{{ $t("page_setting.account_setting.form.middle_name") }}:</label
        >
        <b-form-input
          type="text"
          required
          class="custom-input"
          v-model="model.middleName"
        ></b-form-input>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.last_name") }}:</label>
        <b-form-input
          type="text"
          required
          class="custom-input"
          v-model="model.lastName"
        ></b-form-input>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.gender") }}:</label>
        <div class="gender">
          <b-form-radio v-model="model.gender" name="gender" value="male">
            {{ $t("page_setting.account_setting.form.man") }}
          </b-form-radio>
          <b-form-radio v-model="model.gender" name="gender" value="female">
            {{ $t("page_setting.account_setting.form.woman") }}
          </b-form-radio>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.birthday") }}:</label>
        <b-form-input
          type="text"
          required
          class="custom-input"
          v-model="model.birthday"
        ></b-form-input>
      </div>
      <div class="form-element mt-3">
        <label
          >{{
            $t("page_setting.account_setting.form.bank_account_number")
          }}:</label
        >
        <b-form-input
          type="text"
          required
          class="custom-input"
          v-model="model.bankNumber"
        ></b-form-input>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.city") }}:</label>
        <b-form-input
          type="text"
          required
          class="custom-input"
          v-model="model.city"
        ></b-form-input>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.street") }}:</label>
        <b-form-input
          type="text"
          required
          class="custom-input"
          v-model="model.street"
        ></b-form-input>
      </div>
      <div class="form-element mt-3">
        <label
          >{{ $t("page_setting.account_setting.form.house_number") }}:</label
        >
        <b-form-input
          type="text"
          required
          class="custom-input"
          v-model="model.houseNumber"
        ></b-form-input>
      </div>
      <div class="form-element mt-3">
        <label
          >{{ $t("page_setting.account_setting.form.postal_code") }}:</label
        >
        <b-form-input
          type="text"
          required
          class="custom-input"
          v-model="model.postalCode"
        ></b-form-input>
      </div>
      <!--<div class="form-element mt-3">-->
      <!--<label>{{ $t('PASSWORD') }}:</label>-->
      <!--<b-form-input-->
      <!--type="text"-->
      <!--required-->
      <!--class="custom-input"-->
      <!--v-model="model.password"-->
      <!--/>-->
      <!--</div>-->
      <!--<div class="form-element mt-3">-->
      <!--<label>{{ $t('PASSPORT') }}:</label>-->
      <!--<b-form-input-->
      <!--type="text"-->
      <!--required-->
      <!--class="custom-input"-->
      <!--v-model="model.passport"-->
      <!--/>-->
      <!--</div>-->
      <div class="form-element mt-3">
        <button class="btn btn-blue" @click="update">
          {{ $t("page_setting.account_setting.button.update") }}
        </button>
      </div>
    </div>
    <div class="setting-profile__photo">
      <div class="image-wrapper">
        <img src="@/assets/image/avatar_nick.png" />
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
        <img class="success-image" src="@/assets/image/icon/success.svg" />
        <p class="alert-title color-blue">
          {{ $t("page_setting.modal.account_change.title") }}
        </p>
        <p class="alert-sub-title">
          {{ $t("page_setting.modal.account_change.sub_title") }}
        </p>
        <button class="btn btn-blue" @click="$refs['modal-alert'].hide()">
          {{ $t("page_setting.modal.account_change.continue") }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import settingsApi from "@/services/api/settings";

export default {
  name: "SettingAccount",
  data() {
    return {
      model: {
        role: "",
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "male",
        birthday: "",
        bankNumber: "",
        city: "",
        street: "",
        houseNumber: "",
        postalCode: "",
        password: "",
        passport: ""
      }
    };
  },
  mounted() {
    settingsApi.get(this.$store.state.user).then(res => {
      this.model = res;
    });
  },
  methods: {
    update() {
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
