<template>
  <div id="page_forgot_password">
    <div class="container">
      <div class="row justify-content-center">
        <div class="form-container">
          <form class="forgot-password-form">
            <img
              class="logo"
              src="@/assets/image/hiway_crm.png"
              alt="Hiway CRM"
            />
            <div class="forgot-password-form__header-line"></div>
            <h1 class="title">{{ $t("page_forgot.title") }}</h1>
            <div v-if="!mailSent">
              <b-form-input
                id="email"
                v-model="email"
                type="email"
                required
                :placeholder="$t('page_forgot.form.email')"
                class="custom-input mt-5"
              />
              <b-form-invalid-feedback class="d-block">
                {{ errors | errorFormatter("email") }}
              </b-form-invalid-feedback>
              <div class="d-flex">
                <button class="btn btn-blue send" @click.prevent="forgot">
                  {{ $t("page_forgot.button.send") }}
                </button>
              </div>
            </div>
            <div class="text-center" v-else>
              <h5 class="mt-5">{{ $t("page_forgot.text1") }}.</h5>
              <button class="btn btn-blue send" @click.prevent="forgot">
                {{ $t("page_forgot.button.resend") }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authApi from "@/services/api/auth";

export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      errors: null,
      mailSent: false
    };
  },
  methods: {
    validate() {
      this.errors = [];
      if (!this.email) {
        this.errors.push({
          param: "email",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      return this.errors.length === 0;
    },
    forgot() {
      if (this.validate()) {
        this.error = "";

        authApi
          .forgot({
            email: this.email
          })
          .then(res => {
            this.mailSent = true;
          })
          .catch(data => {
            this.errors = data.response.data.errors.msg;
          });
      }
    }
  }
};
</script>

<style scoped></style>
