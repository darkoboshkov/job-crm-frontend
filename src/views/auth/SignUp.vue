<template>
  <div id="page_signup">
    <div class="container">
      <div class="row justify-content-center">
        <div class="form-container">
          <form>
            <img src="@/assets/image/hiway_crm.png" alt="Hiway CRM" />
            <div></div>
            <h1>{{ $t("SIGNUP") }}</h1>
            <b-row>
              <b-col md="6">
                <b-form-input
                  id="first_name"
                  v-model="firstName"
                  type="text"
                  required
                  :placeholder="$t('FIRST_NAME')"
                  class="custom-input first-name mt-3"
                />
                <b-form-invalid-feedback class="d-block">
                  {{ $t(firstNameError) }}
                </b-form-invalid-feedback>
              </b-col>
              <b-col md="6">
                <b-form-input
                  id="last_name"
                  v-model="lastName"
                  type="text"
                  required
                  :placeholder="$t('LAST_NAME')"
                  class="custom-input last-name mt-3"
                />
                <b-form-invalid-feedback class="d-block">
                  {{ $t(lastNameError) }}
                </b-form-invalid-feedback>
              </b-col>
            </b-row>
            <b-form-input
              id="email"
              v-model="email"
              type="email"
              required
              :placeholder="$t('EMAIL_ADDRESS')"
              class="custom-input mt-3"
            />
            <b-form-invalid-feedback class="d-block">
              {{ $t(emailError) }}
            </b-form-invalid-feedback>
            <b-form-input
              id="password"
              v-model="password"
              type="password"
              required
              :placeholder="$t('PASSWORD')"
              class="custom-input mt-3"
            />
            <b-form-invalid-feedback class="d-block">
              {{ $t(passwordError) }}
            </b-form-invalid-feedback>
            <b-form-input
              id="c_password"
              v-model="cPassword"
              type="password"
              required
              :placeholder="$t('CONFIRM_PASSWORD')"
              class="custom-input mt-3"
            />
            <b-form-invalid-feedback class="d-block">
              {{ $t(cPasswordError) }}
            </b-form-invalid-feedback>
            <div class="d-flex role-selector">
              <b-form-radio v-model="role" name="role" value="manager">{{
                $t("MANAGER")
              }}</b-form-radio>
              <b-form-radio v-model="role" name="role" value="worker">{{
                $t("WORKER")
              }}</b-form-radio>
            </div>
            <b-form-invalid-feedback class="d-block mt-4">
              {{ $t(error) }}
            </b-form-invalid-feedback>
            <b-row class="buttons">
              <b-col md="6">
                <button class="btn btn-red" @click.prevent="signup">
                  {{ $t("SIGNUP") }}
                </button>
              </b-col>
              <b-col md="6">
                <button class="btn btn-blue" @click.prevent="goToLogin">
                  {{ $t("LOGIN") }}
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
      role: "manager",
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
            role: this.role,
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
