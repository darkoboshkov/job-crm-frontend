<template>
  <div class="setting-profile">
    <div class="setting-profile__form">
      <div class="form-element">
        <label>{{ $t("FIRST_NAME") }}:</label>
        <b-form-input
                type="text"
                required
                class="custom-input"
                v-model="model.firstName"
        />
      </div>
      <div class="form-element mt-3">
        <label>{{ $t('MIDDLE_NAME') }}:</label>
        <b-form-input
                type="text"
                required
                class="custom-input"
                v-model="model.middleName"
        />
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("LAST_NAME") }}:</label>
        <b-form-input
                type="text"
                required
                class="custom-input"
                v-model="model.lastName"
        />
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("GENDER") }}:</label>
        <div class="gender">
          <b-form-radio v-model="model.gender" name="gender" value="male">{{
            $t("MAN")
            }}</b-form-radio>
          <b-form-radio v-model="model.gender" name="gender" value="female">{{
            $t("WOMAN")
            }}</b-form-radio>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("DATE_OF_BIRTH") }}:</label>
        <b-form-input
                type="text"
                required
                class="custom-input"
                v-model="model.birthday"
        />
      </div>
      <!--<div class="form-element mt-3">-->
      <!--<label>{{ $t('BANK_ACCOUNT_NUMBER') }}:</label>-->
      <!--<b-form-input-->
      <!--type="text"-->
      <!--required-->
      <!--class="custom-input"-->
      <!--v-model="model.bankNumber"-->
      <!--/>-->
      <!--</div>-->
      <!--<div class="form-element mt-3">-->
      <!--<label>{{ $t('ADDRESS') }}:</label>-->
      <!--<b-form-input-->
      <!--type="text"-->
      <!--required-->
      <!--class="custom-input"-->
      <!--/>-->
      <!--</div>-->
      <!--<div class="form-element mt-3">-->
      <!--<label>{{ $t('POSTAL_CODE') }}:</label>-->
      <!--<b-form-input-->
      <!--type="text"-->
      <!--required-->
      <!--class="custom-input"-->
      <!--v-model="model.postalCode"-->
      <!--/>-->
      <!--</div>-->
      <div class="form-element mt-3">
        <label>{{ $t("CITY") }}:</label>
        <b-form-input
                type="text"
                required
                class="custom-input"
                v-model="model.city"
        />
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("EMAIL") }}:</label>
        <b-form-input
                type="text"
                required
                class="custom-input"
                v-model="model.email"
        />
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
        <b-button @click="update">{{ $t("update profile") }}</b-button>
      </div>
    </div>
    <div class="setting-profile__photo">
      <div class="image-wrapper">
        <img src="@/assets/image/avatar_nick.png" />
      </div>
    </div>
  </div>
</template>

<script>
  import settingsApi from "@/services/api/settings";

  export default {
    name: "SettingProfile",
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
          // street: "",
          // houseNumber: "",
          postalCode: "",
          city: "",
          email: "",
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
            console.log("response", res);
          });
      }
    }
  };
</script>

<style scoped></style>
