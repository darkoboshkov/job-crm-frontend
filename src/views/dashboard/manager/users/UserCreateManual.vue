<template>
  <div id="page_user_create_manual" class="dashboard-content">
    <div class="d-flex">
      <a
        href="javascript:void(0)"
        class="back pull-left"
        @click.prevent="$router.go(-1)"
      >
        <i class="hiway-crm-icon icon-angle-left mr-2" />
        <span>{{ $t("common.back") }}</span>
      </a>
    </div>
    <div class="content shadow-sm">
      <h1 class="title mt-5 text-center">
        {{ $t("page_users_create_manual.title") }}
      </h1>
      <p class="description text-center mt-5">
        {{ $t("page_users_create_manual.description") }}
      </p>
      <div class="mt-5">
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.role") }}:
          </label>
          <div class="flex-3">
            <div class="role">
              <b-form-radio v-model="form.role" name="role" value="worker">
                {{ $t("page_users_create_manual.form.worker") }}
              </b-form-radio>
              <b-form-radio v-model="form.role" name="role" value="manager">
                {{ $t("page_users_create_manual.form.manager") }}
              </b-form-radio>
            </div>
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("role") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.email") }}:
          </label>
          <div class="flex-3">
            <b-form-input
              type="email"
              required
              class="custom-input"
              v-model="form.email"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("email") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.firstName") }}:
          </label>
          <div class="flex-3">
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="form.firstName"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("firstName") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.middleName") }}:
          </label>
          <div class="flex-3">
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="form.middleName"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("middleName") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.lastName") }}:
          </label>
          <div class="flex-3">
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="form.lastName"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("lastName") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.profession") }}:
          </label>
          <div class="flex-3">
            <b-form-select v-model="form.professionId">
              <option value="" />
              <option
                v-for="profession in professions"
                :key="profession._id"
                :value="profession._id"
                >{{ $t(`profession.${profession.name}`) }}</option
              >
            </b-form-select>
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("professionId") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.phone") }}:
          </label>
          <div class="flex-3">
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="form.phone"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("phone") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.password") }}:
          </label>
          <div class="flex-3">
            <b-form-input
              v-if="showPassword"
              type="text"
              required
              class="custom-input"
              v-model="form.password"
            />
            <b-form-input
              v-if="!showPassword"
              type="password"
              required
              class="custom-input"
              v-model="form.password"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("password") }}
            </b-form-invalid-feedback>
            <b-form-checkbox
              class="rtl text-right mr-20"
              switch
              size="lg"
              v-model="showPassword"
            >
              <span class="font-size-7">
                {{ $t("page_users_create_manual.form.show") }}
              </span>
            </b-form-checkbox>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.repeat_password") }}:
          </label>
          <div class="flex-3">
            <b-form-input
              v-if="showRepeatPassword"
              type="text"
              required
              class="custom-input"
              v-model="form.c_password"
            />
            <b-form-input
              v-if="!showRepeatPassword"
              type="password"
              required
              class="custom-input"
              v-model="form.c_password"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("c_password") }}
            </b-form-invalid-feedback>
            <b-form-checkbox
              class="rtl text-right mr-20"
              switch
              size="lg"
              v-model="showRepeatPassword"
            >
              <span class="font-size-7">
                {{ $t("page_users_create_manual.form.show") }}
              </span>
            </b-form-checkbox>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.gender") }}:
          </label>
          <div class="flex-3">
            <div class="role">
              <b-form-radio v-model="form.gender" name="gender" value="male">
                {{ $t("page_users_create_manual.form.male") }}
              </b-form-radio>
              <b-form-radio v-model="form.gender" name="gender" value="female">
                {{ $t("page_users_create_manual.form.female") }}
              </b-form-radio>
              <b-form-radio v-model="form.other" name="gender" value="other">
                {{ $t("page_users_create_manual.form.other") }}
              </b-form-radio>
            </div>
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("gender") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_setting.account_setting.form.honorific_title") }}:
          </label>
          <div class="flex-3">
            <div class="role">
              <b-form-radio
                v-model="form.honorificTitle"
                name="honorific"
                value="mr"
              >
                {{ $t("honorific.mr") }}
              </b-form-radio>
              <b-form-radio
                v-model="form.honorificTitle"
                name="honorific"
                value="mrs"
              >
                {{ $t("honorific.mrs") }}
              </b-form-radio>
              <b-form-radio
                v-model="form.honorificTitle"
                name="honorific"
                value="ms"
              >
                {{ $t("honorific.ms") }}
              </b-form-radio>
              <b-form-radio
                v-model="form.honorificTitle"
                name="honorific"
                value="miss"
              >
                {{ $t("honorific.miss") }}
              </b-form-radio>
            </div>
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("honorificTitle") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.birthday") }}:
          </label>
          <div class="flex-3">
            <b-form-datepicker
              v-model="form.birthday"
              class="custom-input"
              :date-format-options="dateStringOptions"
              today-button
              reset-button
              locale="nl"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("birthday") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.bankNumber") }}:
          </label>
          <div class="flex-3">
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="form.bankNumber"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("bankNumber") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.street-house") }}:
          </label>
          <div class="flex-3 d-flex">
            <div class="flex-1 pr-2">
              <b-form-input
                type="text"
                required
                class="custom-input"
                v-model="form.street"
              />
              <b-form-invalid-feedback class="d-block">
                {{ errors | errorFormatter("street") }}
              </b-form-invalid-feedback>
            </div>
            <div class="flex-1 pl-2">
              <b-form-input
                type="text"
                required
                class="custom-input"
                v-model="form.houseNumber"
              />
              <b-form-invalid-feedback class="d-block">
                {{ errors | errorFormatter("houseNumber") }}
              </b-form-invalid-feedback>
            </div>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.postalCode") }}:
          </label>
          <div class="flex-3">
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="form.postalCode"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("postalCode") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.country") }}:
          </label>
          <div class="flex-3">
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="form.country"
            />
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.city") }}:
          </label>
          <div class="flex-3">
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="form.city"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("city") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div
          class="form-element d-flex align-items-center mt-5"
          v-if="form.role === 'worker'"
        >
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.overview") }}:
          </label>
          <div class="flex-3">
            <b-form-textarea
              rows="10"
              required
              class="custom-input"
              v-model="form.overview"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("overview") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div
          class="form-element d-flex align-items-center mt-5"
          v-if="form.role === 'worker'"
        >
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.social_security_number") }}:
          </label>
          <div class="flex-3">
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="form.socialSecurityNumber"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("socialSecurityNumber") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div
          class="form-element d-flex align-items-center mt-5"
          v-if="form.role === 'worker'"
        >
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.id_type") }}:
          </label>
          <div class="flex-3">
            <b-form-select v-model="form.identificationType">
              <option value="" />
              <option value="id">
                {{ $t("page_users_create_manual.form.id") }}
              </option>
              <option value="passport">
                {{ $t("page_users_create_manual.form.passport") }}
              </option>
            </b-form-select>
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("identificationType") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div
          class="form-element d-flex align-items-center mt-5"
          v-if="form.role === 'worker'"
        >
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.id_number") }}:
          </label>
          <div class="flex-3">
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="form.identificationNumber"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("identificationNumber") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div
          class="form-element d-flex align-items-center mt-5"
          v-if="form.role === 'worker'"
        >
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.id_exp_date") }}:
          </label>
          <div class="flex-3">
            <b-form-datepicker
              v-model="form.identificationExpirationDate"
              class="custom-input"
              :date-format-options="dateStringOptions"
              today-button
              reset-button
              locale="nl"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("identificationExpirationDate") }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div
          class="form-element d-flex align-items-center mt-5"
          v-if="form.role === 'worker'"
        >
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.id_image") }}:
          </label>
          <div class="flex-3">
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
                :value="form.identificationImage.name"
                class="custom-input"
              />
              <label class="position-absolute id-selector" for="idCard" />
              <i class="hiway-crm-icon icon-upload position-absolute" />
            </div>
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("identificationImage") }}
            </b-form-invalid-feedback>
          </div>
        </div>
      </div>
      <b-form-invalid-feedback class="d-block mt-5">
        {{ errors | errorFormatter }}
      </b-form-invalid-feedback>
      <div class="form-element mt-5 text-center">
        <button class="btn btn-blue large" @click="createUser">
          {{ $t("page_users_create_manual.button.create") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import companiesApi from "@/services/api/companies";
import professionsApi from "@/services/api/professions";
import usersApi from "@/services/api/users";
import settingsApi from "@/services/api/settings";

export default {
  name: "UserCreateManual",
  data() {
    return {
      professions: [],
      companies: [],
      form: {
        role: "worker",
        email: "",
        firstName: "",
        lastName: "",
        middleName: "",
        phone: "",
        gender: "male",
        honorificTitle: "mr",
        birthday: "",
        bankNumber: "",
        street: "",
        houseNumber: "",
        postalCode: "",
        country: "",
        city: "",
        password: "",
        c_password: "",
        overview: "",
        socialSecurityNumber: "",
        identificationType: "id",
        identificationNumber: "",
        identificationExpirationDate: "",
        identificationImage: {
          name: "",
          size: "",
          path: ""
        }
      },
      errors: null,
      showPassword: false,
      showRepeatPassword: false,
      idImageData: {},
      isImageLoading: false,
      companyId: this.$store.state.user.companyId
    };
  },
  mounted() {
    this.getCompanies();
    this.getProfessions();
  },
  methods: {
    validate() {
      this.errors = [];
      if (!this.form.email) {
        this.errors.push({
          param: "email",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!this.form.firstName) {
        this.errors.push({
          param: "firstName",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!this.form.lastName) {
        this.errors.push({
          param: "lastName",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!this.form.password) {
        this.errors.push({
          param: "password",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (this.form.password !== this.form.c_password) {
        this.errors.push({
          param: "c_password",
          msg: "PASSWORDS_NOT_MATCH"
        });
      }
      if (!this.form.identificationType && this.form.role === "worker") {
        this.errors.push({
          param: "identificationType",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      return this.errors.length === 0;
    },
    getCompanies() {
      return companiesApi
        .getAllowedCompanies({ companyId: this.companyId, pagination: 0 })
        .then(res => {
          this.companies = res.docs;
        });
    },
    getProfessions() {
      professionsApi.getAll().then(res => {
        this.professions = res;
      });
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
        this.form.identificationImage = {
          name: file.name,
          size: file.size.toString()
        };
      } else {
        console.error("Your browser does not support File API");
      }
    },
    async createUser() {
      if (this.validate()) {
        const params = {
          ...this.form,
          companyId: this.companyId
        };
        try {
          if (this.idImageData.file) {
            this.isImageLoading = true;
            const data = new FormData();
            data.append("title", this.idImageData.title);
            data.append("file", this.idImageData.file);
            const response = await settingsApi.uploadID(data);
            this.isImageLoading = false;
            this.form.identificationImage.path = response.path;
            delete this.idImageData.file;
          }

          await usersApi.create(params);
          await this.$store.dispatch("updateShowSuccessModal", true);
          await this.$store.dispatch("updateSuccessModalContent", {
            title: this.$t("page_users_create_manual.modal.create.title"),
            subTitle: this.$t(
              "page_users_create_manual.modal.create.sub_title"
            ),
            button: this.$t("page_users_create_manual.modal.create.continue")
          });
        } catch (data) {
          this.errors = data.response.data.errors.msg;
        }
      }
    }
  }
};
</script>

<style scoped>
.icon-upload {
  top: 15px;
  right: 11px;
}
</style>
