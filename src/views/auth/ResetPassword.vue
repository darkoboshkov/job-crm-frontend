<template>
  <div id="page_reset_password">
    <div class="container">
      <div class="row justify-content-center">
        <div class="form-container">
          <form class="reset-password-form">
            <img
              class="logo"
              src="@/assets/image/hiway_crm.png"
              alt="Hiway CRM"
            />
            <div class="reset-password-form__header-line"></div>
            <h1 class="title">{{ $t("page_reset.title") }}</h1>
            <b-form-input
              id="password"
              v-model="password"
              type="password"
              required
              :placeholder="$t('page_reset.form.password')"
              class="custom-input mt-5"
            />
            <b-form-invalid-feedback class="d-block" v-if="passwordError">
              {{ $t(`validation.${passwordError}`) }}
            </b-form-invalid-feedback>
            <b-form-input
              id="c_password"
              v-model="cPassword"
              type="password"
              required
              :placeholder="$t('page_reset.form.c_password')"
              class="custom-input mt-5"
            />
            <b-form-invalid-feedback class="d-block" v-if="cPasswordError">
              {{ $t(`validation.${cPasswordError}`) }}
            </b-form-invalid-feedback>
            <div class="d-flex">
              <button class="btn btn-blue reset" @click.prevent="reset">
                {{ $t("page_reset.button.reset") }}
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
import { Toast } from "@/utils";

export default {
  name: "ResetPassword",
  data() {
    return {
      password: "",
      cPassword: "",
      passwordError: "",
      cPasswordError: ""
    };
  },
  methods: {
    validate() {
      let valid = true;

      if (!this.password) {
        this.passwordError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.passwordError = "";
      }

      if (!this.cPassword) {
        this.cPasswordError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.cPasswordError = "";
      }

      return valid;
    },
    reset() {
      if (this.validate()) {
        let code = this.$route.params.code;

        authApi
          .reset({
            id: code,
            password: this.password,
            c_password: this.cPassword
          })
          .then(res => {
            Toast("Password is successfully reset!", "success");
            this.$router.push("/login");
          })
          .catch(data => {
            let messages = data.response.data.errors.msg;
            if (Array.isArray(messages)) {
              messages.forEach(msg => {
                if (msg.param === "password") {
                  this.passwordError = msg.msg;
                }
                if (msg.param === "c_password") {
                  this.cPasswordError = msg.msg;
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
