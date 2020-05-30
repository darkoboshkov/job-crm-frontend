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
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("password") }}
            </b-form-invalid-feedback>
            <b-form-input
              id="c_password"
              v-model="cPassword"
              type="password"
              required
              :placeholder="$t('page_reset.form.c_password')"
              class="custom-input mt-5"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("c_password") }}
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
      errors: null
    };
  },
  methods: {
    validate() {

      this.error = [];

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
            this.errors = data.response.data.errors.msg;
          });
      }
    }
  }
};
</script>

<style scoped></style>
