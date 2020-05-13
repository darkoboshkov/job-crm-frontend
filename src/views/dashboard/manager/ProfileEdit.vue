<template>
  <div id="page_update_profile" class="dashboard-content">
    <div class="container">
      <h1 class="title">{{ $t("page_profile.edit") }}</h1>
      <div class="update-profile mt-3 bg-white p-5">
        <div class="update-profile__form">
          <div class="form-element mt-3">
            <label> {{ $t("page_profile.form.first_name") }}: </label>
            <div class="d-flex flex-column w-100">
              <b-form-input
                type="text"
                required
                class="custom-input"
                v-model="model.firstName"
              />
              <b-form-invalid-feedback class="d-block" v-if="firstNameError">
                {{ $t(`validation.${firstNameError}`) }}
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="form-element mt-3">
            <label>{{ $t("page_profile.form.middle_name") }}:</label>
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="model.middleName"
            />
          </div>
          <div class="form-element mt-3">
            <label>{{ $t("page_profile.form.last_name") }}:</label>
            <div class="d-flex flex-column w-100">
              <b-form-input
                type="text"
                required
                class="custom-input"
                v-model="model.lastName"
              />
              <b-form-invalid-feedback class="d-block" v-if="lastNameError">
                {{ $t(`validation.${lastNameError}`) }}
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="form-element mt-3">
            <label>{{ $t("page_profile.form.gender") }}:</label>
            <div class="gender">
              <b-form-radio v-model="model.gender" name="gender" value="male">
                {{ $t("page_profile.form.man") }}
              </b-form-radio>
              <b-form-radio v-model="model.gender" name="gender" value="female">
                {{ $t("page_profile.form.woman") }}
              </b-form-radio>
              <b-form-radio v-model="model.gender" name="gender" value="other">
                {{ $t("page_profile.form.other") }}
              </b-form-radio>
            </div>
          </div>
          <div class="form-element mt-3">
            <label>{{ $t("page_profile.form.honorific_title") }}:</label>
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
          </div>
          <div class="form-element mt-3">
            <label>{{ $t("page_profile.form.profession") }}:</label>
            <b-form-select v-model="model.professionId">
              <option
                v-for="profession in professions"
                :key="profession._id"
                :value="profession._id"
                >{{ $t(`profession.${profession.name}`) }}
              </option>
            </b-form-select>
          </div>

          <div class="form-element mt-3">
            <label>{{ $t("page_profile.form.overview") }}:</label>
            <b-form-textarea
              rows="10"
              required
              class="custom-input"
              v-model="model.overview"
            />
          </div>
          <div class="form-element mt-3">
            <label>{{ $t("page_profile.form.phone") }}:</label>
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="model.phone"
            />
          </div>
          <div class="form-element mt-3">
            <label>{{ $t("page_profile.form.country") }}:</label>
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="model.country"
            />
          </div>
          <div class="form-element mt-3">
            <label>{{ $t("page_profile.form.city") }}:</label>
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="model.city"
            />
          </div>
          <div class="form-element mt-3">
            <label>{{ $t("page_profile.form.street") }}:</label>
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="model.street"
            />
          </div>
          <div class="form-element mt-3">
            <label>{{ $t("page_profile.form.house_number") }}:</label>
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="model.houseNumber"
            />
          </div>
          <div class="form-element mt-3">
            <label>{{ $t("page_profile.form.postal_code") }}:</label>
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="model.postalCode"
            />
          </div>
          <div class="form-element mt-3">
            <label>{{ $t("page_profile.form.birthday") }}:</label>
            <b-form-input
              type="date"
              required
              class="custom-input"
              v-model="model.birthday"
            />
          </div>
          <div class="form-element mt-3">
            <label> {{ $t("page_profile.form.bank_account_number") }}: </label>
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="model.bankNumber"
            />
          </div>
          <div class="form-element mt-3">
            <label>
              {{ $t("page_profile.form.social_security_number") }}:
            </label>
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="model.socialSecurityNumber"
            />
          </div>
          <div class="form-element mt-3">
            <label> {{ $t("page_profile.form.id_type") }}: </label>
            <div class="d-flex flex-column w-100">
              <b-form-select v-model="model.identificationType">
                <option value="id">
                  {{ $t("page_profile.form.id") }}
                </option>
                <option value="passport">
                  {{ $t("page_profile.form.passport") }}
                </option>
              </b-form-select>
              <b-form-invalid-feedback
                class="d-block"
                v-if="identificationTypeError"
              >
                {{ $t(`validation.${identificationTypeError}`) }}
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="form-element mt-3">
            <label> {{ $t("page_profile.form.id_number") }}: </label>
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="model.identificationNumber"
            />
          </div>
          <div class="form-element mt-3">
            <label> {{ $t("page_profile.form.id_exp_date") }}: </label>
            <b-form-input
              type="date"
              required
              class="custom-input"
              v-model="model.identificationExpirationDate"
            />
          </div>
          <div class="form-element mt-3">
            <label> {{ $t("page_profile.form.id_image") }}: </label>
            <div class="d-flex flex-column w-100">
              <div class="position-relative w-100">
                <input
                  type="file"
                  id="idCard"
                  name="idCard"
                  accept="image/*"
                  @change="onIDUpload"
                  class="d-none"
                />
                <b-input
                  placeholder="Choose ID Card"
                  :value="model.identificationImage.name"
                  class="custom-input"
                />
                <label class="position-absolute id-selector" for="idCard" />
                <i
                  class="hiway-crm-icon icon-upload position-absolute"
                  style="top: 15px;right: 11px;"
                />
              </div>
              <b-form-invalid-feedback
                class="d-block"
                v-if="identificationImageError"
              >
                {{ $t(`validation.${identificationImageError}`) }}
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="form-element mt-5">
            <button class="btn btn-blue" @click="update">
              {{ $t("page_profile.button.update") }}
            </button>
          </div>
        </div>
        <div class="update-profile__photo">
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
    </div>
  </div>
</template>

<script>
import profileApi from "@/services/api/profile";
import professionApi from "@/services/api/professions";

export default {
  name: "ProfileEdit",
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
      userId: "",
      firstNameError: "",
      lastNameError: "",
      identificationTypeError: "",
      identificationImageError: ""
    };
  },
  computed: {
    companyId() {
      return this.$store.state.user.companyId;
    }
  },
  mounted() {
    this.userId = this.$route.params.id;
    profileApi
      .getDetail({ companyId: this.companyId, id: this.userId })
      .then(res => {
        this.model = res;
        this.model.birthday = this.getISODateString(res.birthday);
        this.model.identificationExpirationDate = this.getISODateString(
          res.identificationExpirationDate
        );
        this.imageData.preview = res.image ? this.getAppUrl(res.image) : null;
      });
    professionApi.getAll().then(res => {
      this.professions = res;
    });
  },
  methods: {
    validate() {
      let valid = true;
      if (!this.model.firstName) {
        this.firstNameError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.firstNameError = "";
      }
      if (!this.model.lastName) {
        this.lastNameError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.lastNameError = "";
      }
      return valid;
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
        if (files.length !== 1 || !files[0].type.match("image")) return;
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
    async update() {
      if (this.validate()) {
        try {
          if (this.imageData.file) {
            this.isImageLoading = true;
            const data = new FormData();
            data.append("title", this.imageData.title);
            data.append("file", this.imageData.file);
            const response = await profileApi.uploadImage(data);
            this.isImageLoading = false;
            this.model.image = response.path;
            delete this.imageData.file;
          }
          if (this.idImageData.file) {
            this.isImageLoading = true;
            const data = new FormData();
            data.append("title", this.idImageData.title);
            data.append("file", this.idImageData.file);
            const response = await profileApi.uploadID(data);
            this.isImageLoading = false;
            this.model.identificationImage.path = response.path;
            delete this.idImageData.file;
          }
          await profileApi.patchById(
            Object.assign(
              { id: this.userId, companyId: this.companyId },
              this.model
            )
          );
          this.$store.dispatch("updateShowSuccessModal", true);
          this.$store.dispatch("updateSuccessModalContent", {
            title: this.$t("page_profile.modal.change.title"),
            subTitle: this.$t("page_profile.modal.change.sub_title"),
            button: this.$t("page_profile.modal.change.continue")
          });
        } catch (error) {
          this.isImageLoading = false;
          console.log(error);
        }
      }
    }
  }
};
</script>

<style scoped></style>
