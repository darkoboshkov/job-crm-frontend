<template>
  <div id="page_signup">
    <div class="container">
      <div class="row justify-content-center">
        <div class="form-container">
          <form>
            <img src="@/assets/image/hiway_crm.png" alt="Hiway CRM" />
            <div></div>
            <h1>{{ $t("page_signup.title") }}</h1>
            <b-row>
              <b-col md="6">
                <b-form-input
                  id="first_name"
                  v-model="firstName"
                  type="text"
                  required
                  :placeholder="$t('page_signup.form.first_name')"
                  class="custom-input first-name mt-3"
                />
                <b-form-invalid-feedback class="d-block" v-if="firstNameError">
                  {{ $t(`validation.${firstNameError}`) }}
                </b-form-invalid-feedback>
              </b-col>
              <b-col md="6">
                <b-form-input
                  id="last_name"
                  v-model="lastName"
                  type="text"
                  required
                  :placeholder="$t('page_signup.form.last_name')"
                  class="custom-input last-name mt-3"
                />
                <b-form-invalid-feedback class="d-block" v-if="lastNameError">
                  {{ $t(`validation.${lastNameError}`) }}
                </b-form-invalid-feedback>
              </b-col>
            </b-row>
            <b-form-input
              id="email"
              v-model="email"
              type="email"
              required
              :placeholder="$t('page_signup.form.email')"
              class="custom-input mt-3"
            />
            <b-form-invalid-feedback class="d-block" v-if="emailError">
              {{ $t(`validation.${emailError}`) }}
            </b-form-invalid-feedback>
            <b-form-input
              id="password"
              v-model="password"
              type="password"
              required
              :placeholder="$t('page_signup.form.password')"
              class="custom-input mt-3"
            />
            <b-form-invalid-feedback class="d-block" v-if="passwordError">
              {{ $t(`validation.${passwordError}`) }}
            </b-form-invalid-feedback>
            <b-form-input
              id="c_password"
              v-model="cPassword"
              type="password"
              required
              :placeholder="$t('page_signup.form.c_password')"
              class="custom-input mt-3"
            />
            <b-form-invalid-feedback class="d-block" v-if="cPasswordError">
              {{ $t(`validation.${cPasswordError}`) }}
            </b-form-invalid-feedback>
            <b-form-invalid-feedback class="d-block mt-4" v-if="error">
              {{ $t(`validation.${error}`) }}
            </b-form-invalid-feedback>
            <b-row class="buttons">
              <b-col md="6">
                <button class="btn btn-red" @click.prevent="signup">
                  {{ $t("page_signup.button.signup") }}
                </button>
              </b-col>
              <b-col md="6">
                <button class="btn btn-blue" @click.prevent="goToLogin">
                  {{ $t("page_signup.button.login") }}
                </button>
              </b-col>
            </b-row>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authApi from "@/services/api/auth";
import { Toast, handleLogin } from "@/utils";

export default {
  name: "SignUp",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cPassword: "",

      firstNameError: "",
      lastNameError: "",
      emailError: "",
      passwordError: "",
      cPasswordError: "",
      error: ""
    };
  },
  methods: {
    validate() {
      let valid = true;
      this.error = "";

      if (!this.firstName) {
        this.firstNameError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.firstNameError = "";
      }
      if (!this.lastName) {
        this.lastNameError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.lastNameError = "";
      }
      if (!this.email) {
        this.emailError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.emailError = "";
      }
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
    signup() {
      if (this.validate()) {
        return authApi
          .signup({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            c_password: this.cPassword
          })
          .then(res => {
            handleLogin(
              {
                jwt: res.token,
                expiresIn: res.tokenExpiresIn
              },
              res.user
            );
            // Toast('Please verify your email!', 'warning')
            this.$router.push("/verify");
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
                if (msg.param === "email") {
                  this.emailError = msg.msg;
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
    },
    goToLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped></style>
