<template>
  <div class="setting-profile">
    <div class="setting-profile__form">
      <div class="form-element">
        <label>{{ $t("page_setting.account_setting.form.first_name") }}:</label>
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="text"
            required
            class="custom-input"
            v-model="model.firstName"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("firstName") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label
          >{{ $t("page_setting.account_setting.form.middle_name") }}:</label
        >
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="text"
            required
            class="custom-input"
            v-model="model.middleName"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("middleName") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.last_name") }}:</label>
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="text"
            required
            class="custom-input"
            v-model="model.lastName"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("lastName") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.gender") }}:</label>
        <div class="d-flex flex-column w-100">
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
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("gender") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label
          >{{ $t("page_setting.account_setting.form.honorific_title") }}:</label
        >
        <div class="d-flex flex-column w-100">
          <div class="gender">
            <b-form-radio
              v-model="model.honorificTitle"
              name="honorific"
              value="mr"
              >{{ $t("honorific.mr") }}
            </b-form-radio>
            <b-form-radio
              v-model="model.honorificTitle"
              name="honorific"
              value="mrs"
              >{{ $t("honorific.mrs") }}
            </b-form-radio>
            <b-form-radio
              v-model="model.honorificTitle"
              name="honorific"
              value="ms"
              >{{ $t("honorific.ms") }}
            </b-form-radio>
            <b-form-radio
              v-model="model.honorificTitle"
              name="honorific"
              value="miss"
              >{{ $t("honorific.miss") }}
            </b-form-radio>
          </div>
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("honorificTitle") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.profession") }}:</label>
        <div class="d-flex flex-column w-100">
          <b-form-select v-model="model.professionId">
            <option value="" />
            <option
              v-for="profession in professions"
              :key="profession._id"
              :value="profession._id"
              >{{ $t(`profession.${profession.name}`) }}
            </option>
          </b-form-select>
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("professionId") }}
          </b-form-invalid-feedback>
        </div>
      </div>

      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.overview") }}:</label>
        <div class="d-flex flex-column w-100">
          <b-form-textarea
            rows="10"
            required
            class="custom-input"
            v-model="model.overview"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("overview") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.phone") }}:</label>
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="text"
            required
            class="custom-input"
            v-model="model.phone"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("phone") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.country") }}:</label>
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="text"
            required
            class="custom-input"
            v-model="model.country"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("country") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.city") }}:</label>
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="text"
            required
            class="custom-input"
            v-model="model.city"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("city") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.street") }}:</label>
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="text"
            required
            class="custom-input"
            v-model="model.street"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("street") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label
          >{{ $t("page_setting.account_setting.form.house_number") }}:</label
        >
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="text"
            required
            class="custom-input"
            v-model="model.houseNumber"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("houseNumber") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label
          >{{ $t("page_setting.account_setting.form.postal_code") }}:</label
        >
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="text"
            required
            class="custom-input"
            v-model="model.postalCode"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("postalCode") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.account_setting.form.birthday") }}:</label>
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="date"
            required
            class="custom-input"
            v-model="model.birthday"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("birthday") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>
          {{ $t("page_setting.account_setting.form.bank_account_number") }}:
        </label>
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="text"
            required
            class="custom-input"
            v-model="model.bankNumber"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("bankNumber") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>
          {{ $t("page_setting.account_setting.form.social_security_number") }}:
        </label>
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="text"
            required
            class="custom-input"
            v-model="model.socialSecurityNumber"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("socialSecurityNumber") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label> {{ $t("page_setting.account_setting.form.id_type") }}: </label>
        <div class="d-flex flex-column w-100">
          <b-form-select v-model="model.identificationType">
            <option value="" />
            <option value="id">
              {{ $t("page_setting.account_setting.form.id") }}
            </option>
            <option value="passport">
              {{ $t("page_setting.account_setting.form.passport") }}
            </option>
          </b-form-select>
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("identificationType") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>
          {{ $t("page_setting.account_setting.form.id_number") }}:
        </label>
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="text"
            required
            class="custom-input"
            v-model="model.identificationNumber"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("identificationNumber") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label>
          {{ $t("page_setting.account_setting.form.id_exp_date") }}:
        </label>
        <div class="d-flex flex-column w-100">
          <b-form-input
            type="date"
            required
            class="custom-input"
            v-model="model.identificationExpirationDate"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("identificationExpirationDate") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-3">
        <label> {{ $t("page_setting.account_setting.form.id_image") }}: </label>
        <div class="d-flex flex-column w-100">
          <div class="position-relative w-100">
            <input
              type="file"
              id="idCard"
              name="idCard"
							ref="idCard"
							accept="image/*,.pdf"
              @change="onIDUpload"
              class="d-none"
            />
            <b-input
              placeholder="Choose ID Card"
              :value="model.identificationImage.name"
              class="custom-input"
            />
            <label class="position-absolute id-selector" for="idCard" />
            <div class="d-flex position-absolute" style="top:15px;right:10px;">
              <i class="hiway-crm-icon icon-upload cursor-pointer" @click="$refs.idCard.click()" />
              <i
                class="hiway-crm-icon icon-upload color-blue rotate-180 cursor-pointer ml-3"
                @click="onIDDownload"
                v-show="model.identificationImage.path"
              />
            </div>
          </div>
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("identificationImage") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-element mt-5">
        <button class="btn btn-blue" @click="update">
          {{ $t("page_setting.account_setting.button.update") }}
        </button>
      </div>
    </div>
    <div class="setting-profile__photo">
      <div class="image-wrapper upload">
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
import professionApi from "@/services/api/professions";
import { downloadFile } from "@/utils";

export default {
  name: "SettingAccount",
  data() {
    return {
      professions: [],
      model: {
        role: "",
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "male",
        honorificTitle: "mr",
        birthday: "",
        bankNumber: "",
        overview: "",
        phone: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        postalCode: "",
        email: "",
        passport: "",
        image: "",
        professionId: "",
        socialSecurityNumber: "",
        identificationType: "",
        identificationNumber: "",
        identificationExpirationDate: "",
        identificationImage: {
          name: "",
          size: "",
          path: ""
        }
      },
      maxSize: 2097152,
      imageData: {
        preview: null
      },
      idImageData: {},
      isImageLoading: false,
      errors: null,
      allowIDImage: false
    };
  },
  mounted() {
    this.getSettings();
    professionApi.getAll().then(res => {
      this.professions = res;
    });
  },
  methods: {
    validate() {
      this.errors = [];
      if (!this.model.firstName) {
        this.errors.push({
          param: "firstName",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!this.model.lastName) {
        this.errors.push({
          param: "lastName",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!this.model.professionId) {
        this.errors.push({
          param: "professionId",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!this.model.identificationType) {
        this.errors.push({
          param: "identificationType",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      return this.errors.length === 0;
    },
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
    onIDUpload(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }

      if (window.File && window.FileList && window.FileReader) {
        if (files.length !== 1) return;
        let file = files[0];
        this.idImageData = {
          file: file,
          title: file.name
        };
        this.model.identificationImage = {
          name: file.name,
          size: file.size.toString()
        };
      } else {
        console.error("Your browser does not support File API");
      }
    },
    getSettings() {
      settingsApi.get().then(res => {
        this.model = res;
        this.model.birthday = this.getISODateString(res.birthday);
        this.model.identificationExpirationDate = this.getISODateString(
          res.identificationExpirationDate
        );
        this.imageData.preview = res.image ? this.getAppUrl(res.image) : null;
      });
    },
    async update() {
      try {
        if (!this.validate()) {
          return false;
        }
        if (this.idImageData.file) {
          if (!this.allowIDImage) {
            await this.$store.dispatch("updateShowConfirmModal", true);
            await this.$store.dispatch("updateConfirmModalContent", {
              title: this.$t("page_profile.modal.confirm.title"),
              subTitle: this.$t("page_profile.modal.confirm.sub_title"),
              button: this.$t("page_profile.modal.confirm.continue"),
              onButtonClick: () => {
                this.$store.dispatch("updateShowConfirmModal", false);
                this.allowIDImage = true;
                this.update();
              }
            });
            return false;
          }
          const data = new FormData();
          data.append("title", this.idImageData.title);
          data.append("file", this.idImageData.file);
          const response = await settingsApi.uploadID(data);
          this.model.identificationImage.path = response.path;
          delete this.idImageData.file;
        }

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
        this.getSettings();
        await this.$store.dispatch("updateShowSuccessModal", true);
        await this.$store.dispatch("updateSuccessModalContent", {
          title: this.$t("page_setting.modal.account_change.title"),
          subTitle: this.$t("page_setting.modal.account_change.sub_title"),
          button: this.$t("page_setting.modal.account_change.continue")
        });
      } catch (error) {
        this.errors = error.response.data.errors.msg;
        this.isImageLoading = false;
      }
    },
    onIDDownload() {
      settingsApi.downloadID().then(res => {
        downloadFile(res, this.model.identificationImage.name);
      });
    }
  }
};
</script>

<style scoped></style>
