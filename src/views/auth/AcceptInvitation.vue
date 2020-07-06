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
            <b-row>
              <b-col md="6">
                <b-form-input
                  id="first_name"
                  v-model="form.firstName"
                  type="text"
                  required
                  :placeholder="$t('page_accept.form.first_name')"
                  class="custom-input first-name mt-5"
                />
                <b-form-invalid-feedback class="d-block">
                  {{ errors | errorFormatter("firstName") }}
                </b-form-invalid-feedback>
              </b-col>
              <b-col md="6">
                <b-form-input
                  id="last_name"
                  v-model="form.lastName"
                  type="text"
                  required
                  :placeholder="$t('page_accept.form.last_name')"
                  class="custom-input last-name mt-5"
                />
                <b-form-invalid-feedback class="d-block">
                  {{ errors | errorFormatter("lastName") }}
                </b-form-invalid-feedback>
              </b-col>
            </b-row>
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              required
              :placeholder="$t('page_accept.form.password')"
              class="custom-input mt-5"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("password") }}
            </b-form-invalid-feedback>
            <b-form-input
              id="c_password"
              v-model="form.c_password"
              type="password"
              required
              :placeholder="$t('page_accept.form.c_password')"
              class="custom-input mt-5"
            />
            <b-form-invalid-feedback class="d-block">
              {{ errors | errorFormatter("c_password") }}
            </b-form-invalid-feedback>
            <b-form-invalid-feedback class="d-block mt-4">
              {{ errors | errorFormatter }}
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
        id: this.$route.params.id
      },
      errors: null
    };
  },
  methods: {
    validate() {
      this.errors = [];
      if (!this.form.firstName) {
        this.errors.push({
          param: "firstName",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!this.form.lastName) {
        this.errors.push({
          param: "lastName",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!this.form.password) {
        this.errors.push({
          param: "password",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (this.form.password !== this.form.c_password) {
        this.errors.push({
          param: "c_password",
          msg: "PASSWORDS_NOT_MATCH"
        });
      }
      return this.errors.length === 0;
    },
    accept() {
      if (this.validate()) {
        const params = {
          ...this.form
        };
        return authApi.invitation(params).then(res => {
          this.$store.dispatch("updateShowSuccessModal", true);
          this.$store.dispatch("updateSuccessModalContent", {
            title: this.$t("page_accept.modal.accept.title"),
            subTitle: this.$t("page_accept.modal.accept.sub_title"),
            button: this.$t("page_accept.modal.accept.login"),
            onButtonClick: () => {
              this.$router.push({ name: "login" });
              this.$store.dispatch("updateShowSuccessModal", false);
            }
          });
        });
      }
    }
  }
};
</script>

<style scoped></style>
