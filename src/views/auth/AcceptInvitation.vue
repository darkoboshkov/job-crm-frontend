<template>
  <div id="page_invitation">
    <div class="container">
      <div class="row justify-content-center">
        <div class="form-container">
          <form class="invitation-form">
            <img
              class="logo"
              src="@/assets/image/hiway_crm.png"
              alt="Hiway CRM"
            />
            <div class="invitation-form__header-line"></div>
            <h1 class="title">{{ $t("page_accept.title") }}</h1>
            <div class="name-group d-flex">
              <b-form-input
                id="first_name"
                v-model="form.firstName"
                type="text"
                required
                :placeholder="$t('page_accept.form.first_name')"
                class="custom-input first-name mt-5"
              />
              <b-form-invalid-feedback class="d-block" v-if="firstNameError">
                {{ $t(`validation.${firstNameError}`) }}
              </b-form-invalid-feedback>
              <b-form-input
                id="last_name"
                v-model="form.lastName"
                type="text"
                required
                :placeholder="$t('page_accept.form.last_name')"
                class="custom-input last-name mt-5"
              />
              <b-form-invalid-feedback class="d-block" v-if="lastNameError">
                {{ $t(`validation.${lastNameError}`) }}
              </b-form-invalid-feedback>
            </div>
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              required
              :placeholder="$t('page_accept.form.password')"
              class="custom-input mt-5"
            />
            <b-form-invalid-feedback class="d-block" v-if="passwordError">
              {{ $t(`validation.${passwordError}`) }}
            </b-form-invalid-feedback>
            <b-form-input
              id="c_password"
              v-model="form.c_password"
              type="password"
              required
              :placeholder="$t('page_accept.form.c_password')"
              class="custom-input mt-5"
            />
            <b-form-invalid-feedback class="d-block" v-if="cPasswordError">
              {{ $t(`validation.${cPasswordError}`) }}
            </b-form-invalid-feedback>
            <b-form-invalid-feedback class="d-block mt-4" v-if="error">
              {{ $t(`validation.${error}`) }}
            </b-form-invalid-feedback>
            <div class="d-flex">
              <button class="btn btn-blue accept" @click.prevent="accept">
                {{ $t("page_accept.button.accept") }}
              </button>
            </div>
          </form>
        </div>
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
          {{ $t("page_accept.modal.accept.title") }}
        </p>
        <p class="alert-sub-title">
          {{ $t("page_accept.modal.accept.sub_title") }}
        </p>
        <button class="btn btn-blue" @click="$router.push({ name: 'login' })">
          {{ $t("page_accept.modal.accept.login") }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import authApi from "@/services/api/auth";

export default {
  name: "AcceptInvitation",
  data() {
    return {
      form: {
        firstName: null,
        lastName: null,
        password: null,
        c_password: null,
        id: null
      },
      firstNameError: "",
      lastNameError: "",
      passwordError: "",
      cPasswordError: "",
      error: ""
    };
  },
  mounted() {
    this.form.id = this.$route.params.id;
  },
  methods: {
    validate() {
      let valid = true;
      this.error = "";
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
        this.lastNameError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.passwordError = "";
      }
      if (!this.form.c_password) {
        this.cPasswordError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.cPasswordError = "";
      }

      return valid;
    },
    accept() {
      if (this.validate()) {
        const params = {
          ...this.form
        };
        return authApi
          .invitation(params)
          .then(res => {
            this.$refs["modal-alert"].show();
          })
          .catch(data => {
            let messages = data.response.data.errors.msg;
            if (Array.isArray(messages)) {
              messages.forEach(msg => {
                if (msg.param === "firstName") {
                  this.firstNameError = msg.msg;
                }
                if (msg.param === "lastName") {
                  this.lastNameError = msg.msg;
                }
                if (msg.param === "password") {
                  this.passwordError = msg.msg;
                }
                if (msg.param === "c_password") {
                  this.cPasswordError = msg.msg;
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

<style scoped></style>
