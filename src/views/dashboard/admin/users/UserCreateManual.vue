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
        <div class="form-element d-flex align-items-center">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.company_list") }}:
          </label>
          <div class="flex-3">
            <b-form-select v-model="form.companyId">
              <option value=""></option>
              <option
                v-for="(company, idx) in companies"
                :key="idx"
                :value="company._id"
                >{{ company.name }}</option
              >
            </b-form-select>
            <b-form-invalid-feedback class="d-block" v-if="companyError">
              {{ $t(`validation.${companyError}`) }}
            </b-form-invalid-feedback>
          </div>
        </div>
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
              <b-form-radio v-model="form.role" name="role" value="owner">
                {{ $t("page_users_create_manual.form.owner") }}
              </b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.email") }}:
          </label>
          <div class="flex-3">
            <b-form-input
              type="text"
              required
              class="custom-input"
              v-model="form.email"
            />
            <b-form-invalid-feedback class="d-block" v-if="emailError">
              {{ $t(`validation.${emailError}`) }}
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
            <b-form-invalid-feedback class="d-block" v-if="firstNameError">
              {{ $t(`validation.${firstNameError}`) }}
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
            <b-form-invalid-feedback class="d-block" v-if="middleNameError">
              {{ $t(`validation.${middleNameError}`) }}
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
            <b-form-invalid-feedback class="d-block" v-if="lastNameError">
              {{ $t(`validation.${lastNameError}`) }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.position") }}:
          </label>
          <div class="flex-3">
            <b-form-select v-model="form.positionId">
              <option value=""></option>
              <option
                  v-for="(position) in positions"
                  :key="position._id"
                  :value="position._id"
              >{{ position.name }}</option
              >
            </b-form-select>
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
            <b-form-invalid-feedback class="d-block" v-if="phoneError">
              {{ $t(`validation.${phoneError}`) }}
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
            <b-form-invalid-feedback class="d-block" v-if="passwordError">
              {{ $t(`validation.${passwordError}`) }}
            </b-form-invalid-feedback>
            <b-form-checkbox
              class="rtl text-right"
              style="margin-right: 20px;"
              switch
              size="lg"
              v-model="showPassword"
              ><span style="font-size: 0.75em;">Show</span></b-form-checkbox
            >
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
            <b-form-invalid-feedback class="d-block" v-if="repeatPasswordError">
              {{ $t(`validation.${repeatPasswordError}`) }}
            </b-form-invalid-feedback>
            <b-form-checkbox
              class="rtl text-right"
              style="margin-right: 20px;"
              switch
              size="lg"
              v-model="showRepeatPassword"
              ><span style="font-size: 0.75em;">Show</span></b-form-checkbox
            >
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
          </div>
        </div>
        <div class="form-element d-flex align-items-center mt-5">
          <label class="flex-1">
            {{ $t("page_users_create_manual.form.birthday") }}:
          </label>
          <div class="flex-3">
            <b-form-input
              type="date"
              required
              class="custom-input"
              v-model="form.birthday"
            />
            <b-form-invalid-feedback class="d-block" v-if="birthdayError">
              {{ $t(`validation.${birthdayError}`) }}
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
            <b-form-invalid-feedback class="d-block" v-if="bankNumberError">
              {{ $t(`validation.${bankNumberError}`) }}
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
              <b-form-invalid-feedback class="d-block" v-if="streetError">
                {{ $t(`validation.${streetError}`) }}
              </b-form-invalid-feedback>
            </div>
            <div class="flex-1 pl-2">
              <b-form-input
                type="text"
                required
                class="custom-input"
                v-model="form.houseNumber"
              />
              <b-form-invalid-feedback class="d-block" v-if="houseNumberError">
                {{ $t(`validation.${houseNumberError}`) }}
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
            <b-form-invalid-feedback class="d-block" v-if="postalCodeError">
              {{ $t(`validation.${postalCodeError}`) }}
            </b-form-invalid-feedback>
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
            <b-form-invalid-feedback class="d-block" v-if="cityError">
              {{ $t(`validation.${cityError}`) }}
            </b-form-invalid-feedback>
          </div>
        </div>
        <!--        <div class="form-element d-flex align-items-center mt-5">-->
        <!--          <label class="flex-1">-->
        <!--            {{ $t("page_users_create_manual.form.passport") }}:-->
        <!--          </label>-->
        <!--          <div class="flex-3">-->
        <!--            <b-form-input-->
        <!--              type="text"-->
        <!--              required-->
        <!--              class="custom-input"-->
        <!--              v-model="form.passport"-->
        <!--            />-->
        <!--            <b-form-invalid-feedback class="d-block" v-if="passportError">-->
        <!--              {{ $t(`validation.${passportError}`) }}-->
        <!--            </b-form-invalid-feedback>-->
        <!--          </div>-->
        <!--        </div>-->
        <b-form-invalid-feedback class="d-block mt-5" v-if="error">
          {{ $t(`${error}`) }}
        </b-form-invalid-feedback>
        <div class="form-element mt-5 text-center">
          <button class="btn btn-blue large" @click="createUser">
            {{ $t("page_users_create_manual.button.create") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import companyApi from "@/services/api/companies";
import positionApi from "@/services/api/positions";
import userApi from "@/services/api/users";

export default {
  name: "UserCreateManual",
  data() {
    return {
      positions: [],
      companies: [],
      form: {
        companyId: "",
        positionId: "",
        role: "worker",
        email: "",
        firstName: "",
        lastName: "",
        middleName: "",
        phone: "",
        gender: "male",
        birthday: "",
        bankNumber: "",
        street: "",
        houseNumber: "",
        postalCode: "",
        city: "",
        password: "",
        c_password: "",
        passport: ""
      },
      roleError: "",
      emailError: "",
      companyError: "",
      firstNameError: "",
      lastNameError: "",
      middleNameError: "",
      genderError: "male",
      birthdayError: "",
      bankNumberError: "",
      streetError: "",
      houseNumberError: "",
      postalCodeError: "",
      cityError: "",
      phoneError: "",
      passwordError: "",
      repeatPasswordError: "",
      passportError: "",
      error: "",
      showPassword: false,
      showRepeatPassword: false
    };
  },
  mounted() {
    this.getCompanies();
    this.getPositions();
  },
  methods: {
    validate() {
      let valid = true;
      this.error = "";
      if (!this.form.companyId) {
        this.companyError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.companyError = "";
      }
      if (!this.form.email) {
        this.emailError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.emailError = "";
      }
      if (!this.form.firstName) {
        this.firstNameError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.firstNameError = "";
      }
      if (!this.form.lastName) {
        this.lastNameError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.lastNameError = "";
      }
      if (!this.form.password) {
        this.passwordError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.passwordError = "";
      }
      if (this.form.password !== this.form.c_password) {
        this.repeatPasswordError = "PASSWORDS_NOT_MATCH";
        valid = false;
      } else {
        this.repeatPasswordError = "";
      }

      return valid;
    },
    getCompanies() {
      companyApi.getAll().then(res => {
        this.companies = res;
      });
    },
    getPositions() {
      positionApi.getAll().then(res => {
        this.positions = res;
      });
    },
    createUser() {
      if (this.validate()) {
        const params = {
          ...this.form
        };
        userApi
          .create(params)
          .then(res => {
            this.$store.dispatch("updateShowErrorModal", true);
            this.$store.dispatch("updateErrorModalContent", {
              title: this.$t("page_users_create_manual.modal.create.title"),
              subTitle: this.$t(
                "page_users_create_manual.modal.create.sub_title"
              ),
              button: this.$t("page_users_create_manual.modal.create.continue")
            });
          })
          .catch(data => {
            let messages = data.response.data.errors.msg;
            if (Array.isArray(messages)) {
              messages.forEach(msg => {
                if (msg.param === "companyId") {
                  this.companyError = msg.msg;
                }
                if (msg.param === "email") {
                  this.emailError = msg.msg;
                }
                if (msg.param === "firstName") {
                  this.firstNameError = msg.msg;
                }
                if (msg.param === "lastName") {
                  this.lastNameError = msg.msg;
                }
                if (msg.param === "middleName") {
                  this.middleNameError = msg.msg;
                }
                if (msg.param === "password") {
                  this.passwordError = msg.msg;
                }
                if (msg.param === "gender") {
                  this.genderError = msg.msg;
                }
                if (msg.param === "birthday") {
                  this.birthdayError = msg.msg;
                }
                if (msg.param === "bankNumber") {
                  this.bankNumberError = msg.msg;
                }
                if (msg.param === "street") {
                  this.streetError = msg.msg;
                }
                if (msg.param === "houseNumber") {
                  this.houseNumberError = msg.msg;
                }
                if (msg.param === "postalCode") {
                  this.postalCodeError = msg.msg;
                }
                if (msg.param === "city") {
                  this.cityError = msg.msg;
                }
                if (msg.param === "passport") {
                  this.passportError = msg.msg;
                }
              });
            } else {
              this.error = messages;
            }
          });
      }
    }
  }
};
</script>
