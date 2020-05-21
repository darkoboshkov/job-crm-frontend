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
          <b-form-radio v-model="model.gender" name="gender" value="male">
            {{ $t("page_setting.account_setting.form.man") }}
          </b-form-radio>
          <b-form-radio v-model="model.gender" name="gender" value="female">
            {{ $t("page_setting.account_setting.form.woman") }}
          </b-form-radio>
          <b-form-radio v-model="model.gender" name="gender" value="other">
            {{ $t("page_setting.account_setting.form.other") }}
          </b-form-radio>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.birthday") }}:</label>
        <b-form-input
          type="date"
          required
          class="custom-input"
          v-model="model.birthday"
        />
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.city") }}:</label>
        <b-form-input
          type="text"
          required
          class="custom-input"
          v-model="model.city"
        />
      </div>
      <div class="form-element mt-5">
        <button class="btn btn-blue" @click="update">
          {{ $t("page_setting.account_setting.button.update") }}
        </button>
      </div>
    </div>
    <div class="setting-profile__photo">
      <div class="image-wrapper">
        <img :src="imageData.preview" />
        <b-spinner type="grow" label="Spinning" v-if="isImageLoading" />
        <input
          type="file"
          class="form-control"
          id="image_upload"
          accept="image/*"
          @change="onFileChange"
        />
      </div>
    </div>
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
        passport: "",
        image: ""
      },
      maxSize: 2097152,
      imageData: {
        preview: null
      },
      isImageLoading: false
    };
  },
  mounted() {
    settingsApi.get().then(res => {
      this.model = res;
      this.model.birthday = this.getISODateString(res.birthday);
      this.imageData.preview = res.image ? this.getAppUrl(res.image) : null;
    });
  },
  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }

      if (window.File && window.FileList && window.FileReader) {
        let reader = new FileReader();
        let vm = this;

        if (files.length !== 1 || !files[0].type.match("image")) return;
        let file = files[0];
        reader.onload = e => {
          let title = file.name;
          let titleArray = title.split(".");
          title = title.replace("." + titleArray[titleArray.length - 1], "");

          vm.imageData = {
            file: file,
            preview: e.target.result,
            title: title,
            size: file.size
          };
        };
        reader.readAsDataURL(file);
      } else {
        console.error("Your browser does not support File API");
      }
    },
    async update() {
      try {
        if (this.imageData.file) {
          this.isImageLoading = true;
          const data = new FormData();
          data.append("title", this.imageData.title);
          data.append("file", this.imageData.file);
          const response = await settingsApi.uploadImage(data);
          this.isImageLoading = false;
          this.model.image = response.path;
          delete this.imageData.file;
        }
        await settingsApi.patch(
          Object.assign(this.$store.state.user, this.model)
        );
        this.$store.dispatch("updateShowSuccessModal", true);
        this.$store.dispatch("updateSuccessModalContent", {
          title: this.$t("page_setting.modal.account_change.title"),
          subTitle: this.$t("page_setting.modal.account_change.sub_title"),
          button: this.$t("page_setting.modal.account_change.continue")
        });
      } catch (error) {
        this.isImageLoading = false;
      }
    }
  }
};
</script>

<style scoped></style>
