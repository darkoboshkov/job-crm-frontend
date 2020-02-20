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
        />
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
        />
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.last_name") }}:</label>
        <b-form-input
          type="text"
          required
          class="custom-input"
          v-model="model.lastName"
        />
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.gender") }}:</label>
        <div class="gender">
          <b-form-radio v-model="model.gender" name="gender" value="male">{{
            $t("page_setting.account_setting.form.man")
          }}</b-form-radio>
          <b-form-radio v-model="model.gender" name="gender" value="female">{{
            $t("page_setting.account_setting.form.woman")
          }}</b-form-radio>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.birthday") }}:</label>
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
        <label>{{ $t("page_setting.account_setting.form.city") }}:</label>
        <b-form-input
          type="text"
          required
          class="custom-input"
          v-model="model.city"
        />
      </div>
      <!--<div class="form-element mt-3">-->
      <!--<label>{{ $t("page_setting.account_setting.form.email") }}:</label>-->
      <!--<b-form-input-->
      <!--type="text"-->
      <!--required-->
      <!--class="custom-input"-->
      <!--v-model="model.email"-->
      <!--/>-->
      <!--</div>-->
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
      <input type="file" class="form-control" id="image_upload" accept="image/*" @change="onFileChange"/>
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
        // street: "",
        // houseNumber: "",
        postalCode: "",
        city: "",
        email: "",
        password: "",
        passport: ""
      },
      maxSize: 2097152,
      imageData: null,
    };
  },
  mounted() {
    settingsApi.get(this.$store.state.user).then(res => {
      this.model = res;
    });
  },
  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }

      this.imageData = null;
      if (window.File && window.FileList && window.FileReader) {
        let reader = new FileReader();
        let vm = this;

        if (files.length !== 1 || !files[0].type.match('image')) return;
        let file = files[0];
        reader.onload = (e) => {
          let title = file.name;
          let titleArray = title.split('.');
          title = title.replace('.' + titleArray[titleArray.length - 1], '');

          vm.imageData = {
            file: file,
            preview: e.target.result,
            title: title,
            size: file.size
          };

          vm.uploadImage();
        };
        reader.readAsDataURL(file);
      } else {
        console.error('Your browser does not support File API')
      }
    },
    update() {
      settingsApi
        .patch(Object.assign(this.$store.state.user, this.model))
        .then(res => {
          this.$refs["modal-alert"].show();
          console.log("response", res);
        });
    },
    uploadImage() {}
  }
};
</script>

<style scoped></style>
