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
              <b-form-invalid-feedback class="d-block" v-if="error">
                {{ $t(`validation.${error}`) }}
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
      error: "",
      mailSent: false
    };
  },
  methods: {
    validate() {
      let valid = true;

      if (!this.email) {
        this.error = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.error = "";
      }

      return valid;
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
            let messages = data.response.data.errors.msg;
            if (Array.isArray(messages)) {
              messages.forEach(msg => {
                if (msg.param === "email") {
                  this.error = msg.msg;
                }
              });
            }
          });
      }
    }
  }
};
</script>

<style scoped></style>
