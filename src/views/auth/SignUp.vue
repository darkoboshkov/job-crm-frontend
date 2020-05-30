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
                <b-form-invalid-feedback class="d-block">
                  {{ errors | errorFormatter("firstName") }}
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
                <b-form-invalid-feedback class="d-block">
                  {{ errors | errorFormatter("lastName") }}
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
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("email") }}
            </b-form-invalid-feedback>
            <b-form-input
              id="password"
              v-model="password"
              type="password"
              required
              :placeholder="$t('page_signup.form.password')"
              class="custom-input mt-3"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("password") }}
            </b-form-invalid-feedback>
            <b-form-input
              id="c_password"
              v-model="cPassword"
              type="password"
              required
              :placeholder="$t('page_signup.form.c_password')"
              class="custom-input mt-3"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("c_password") }}
            </b-form-invalid-feedback>
            <b-form-invalid-feedback class="d-block mt-5">
              {{ errors | errorFormatter }}
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
import { handleLogin } from "@/utils";

export default {
  name: "SignUp",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cPassword: "",
      companyId: "",
      errors: null
    };
  },
  methods: {
    validate() {
      this.errors = [];
      if (!this.firstName) {
        this.errors.push({
          param: "firstName",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!this.lastName) {
        this.errors.push({
          param: "lastName",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!this.email) {
        this.errors.push({
          param: "email",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!this.password) {
        this.errors.push({
          param: "password",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!this.cPassword) {
        this.errors.push({
          param: "c_password",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      return this.errors.length === 0;
    },
    signup() {
      if (this.validate()) {
        const data = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          c_password: this.cPassword
        };

        if (this.$route.params.code) {
          data.companyId = this.$route.params.code;
        }

        return authApi
          .signup(data)
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
            this.errors = data.response.data.errors.msg;
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
