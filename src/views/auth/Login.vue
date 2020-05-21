<template>
  <div id="page_login">
    <div class="container">
      <div class="row justify-content-center">
        <div class="form-container">
          <form class="login-form">
            <img
              class="logo"
              src="@/assets/image/hiway_crm.png"
              alt="Hiway CRM"
            />
            <div class="login-form__header-line"></div>
            <h1 class="title">{{ $t("page_login.title") }}</h1>
            <b-form-input
              id="email"
              v-model="email"
              type="email"
              :placeholder="$t('page_login.form.email')"
              class="custom-input mt-5"
            />

            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("email") }}
            </b-form-invalid-feedback>

            <div class="input-wrapper mt-5">
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                required
                :placeholder="$t('page_login.form.password')"
                class="custom-input"
              />
              <b-form-invalid-feedback class="d-block">
                {{ errors | errorFormatter("password") }}
              </b-form-invalid-feedback>
              <a href="/forgot" class="forgot-pass"
                >{{ $t("page_login.form.forgot") }}?</a
              >
            </div>

            <b-form-invalid-feedback class="d-block mt-5">
              {{ errors | errorFormatter }}
            </b-form-invalid-feedback>

            <div class="buttons d-flex">
              <div>
                <button class="btn btn-red login" @click.prevent="login">
                  {{ $t("page_login.button.login") }}
                </button>
              </div>
              <div>
                <button class="btn btn-blue signup" @click.prevent="goToSignup">
                  {{ $t("page_login.button.create") }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authApi from "@/services/api/auth";
import { handleLogin } from "@/utils";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errors: null
    };
  },
  methods: {
    validate() {
      let valid = true;
      this.error = [];

      if (!this.email) {
        this.errors.push({
          param: "email",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
        valid = false;
      }
      if (!this.password) {
        this.errors.push({
          param: "password",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
        valid = false;
      }
      return valid;
    },
    login() {
      if (this.validate()) {
        return authApi
          .login({
            email: this.email,
            password: this.password
          })
          .then(res => {
            handleLogin(
              {
                jwt: res.token,
                expiresIn: res.tokenExpiresIn
              },
              res.user
            );
            this.$router.push("/dashboard");
          })
          .catch(data => {
            this.errors = data.response.data.errors.msg;
          });
      }
    },
    goToSignup() {
      this.$router.push("/signup");
    }
  }
};
</script>

<style scoped></style>
