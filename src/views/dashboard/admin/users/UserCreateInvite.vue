<template>
  <div id="page_user_create_invite" class="dashboard-content">
    <div class="d-flex">
      <a
        href="javascript:void(0)"
        class="back pull-left"
        @click.prevent="$router.go(-1)"
      >
        <i class="hiway-crm-icon icon-angle-left mr-2" />
        <span>{{ $t("common.back") }}</span>
      </a>
    </div>
    <div class="content shadow-sm">
      <h1 class="title text-center">
        {{ $t("page_users_create_invite.title") }}
      </h1>
      <p class="description text-center mt-5">
        {{ $t("page_users_create_invite.description") }}
      </p>
      <div class="mt-5">
        <div class="form-element">
          <label>{{ $t("page_users_create_invite.form.company_list") }}:</label>
          <b-form-select v-model="form.companyId">
            <option value="" />
            <option
              v-for="(company, idx) in companies"
              :key="idx"
              :value="company._id"
              >{{ company.name }}</option
            >
          </b-form-select>
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("companyId") }}
          </b-form-invalid-feedback>
        </div>
        <div class="form-element mt-5">
          <label>{{ $t("page_users_create_invite.form.email") }}:</label>
          <b-form-input
            type="email"
            required
            class="custom-input"
            v-model="form.email"
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("email") }}
          </b-form-invalid-feedback>
        </div>
        <div class="form-element mt-5">
          <div class="role text-center">
            <b-form-radio v-model="form.role" name="role" value="worker">
              {{ $t("page_users_create_invite.form.worker") }}
            </b-form-radio>
            <b-form-radio v-model="form.role" name="role" value="manager">
              {{ $t("page_users_create_invite.form.manager") }}
            </b-form-radio>
          </div>
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("role") }}
          </b-form-invalid-feedback>
        </div>
        <b-form-invalid-feedback class="d-block mt-5">
          {{ errors | errorFormatter }}
        </b-form-invalid-feedback>
        <div class="form-element mt-5 text-center">
          <button class="btn btn-blue large" @click="sendInvitation">
            {{ $t("page_users_create_invite.button.send") }}
          </button>
        </div>
      </div>
    </div>
    <b-modal
      ref="modal-invite-success"
      :hide-footer="true"
      :hide-header="true"
      centered
      modal-class="modal-success"
    >
      <div class="text-center">
        <img class="success-image" src="@/assets/image/icon/success.svg" />
        <p class="success-title color-blue">
          {{ $t("page_users_create_invite.modal.invite.title") }}
        </p>
        <p class="success-sub-title">
          {{ $t("page_users_create_invite.modal.invite.sub_title") }}
        </p>
        <div class="d-flex justify-content-around">
          <button
            class="btn btn-blue"
            @click="$router.push({ name: 'admin-candidates' })"
          >
            {{ $t("page_users_create_invite.modal.invite.view_candidates") }}
          </button>
          <button class="btn btn-red" @click="clear">
            {{ $t("page_users_create_invite.modal.invite.invite_more") }}
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import companiesApi from "@/services/api/companies";
import usersApi from "@/services/api/users";

export default {
  name: "UserCreateInvite",
  data() {
    return {
      companies: [],
      form: {
        companyId: "",
        role: "worker",
        email: ""
      },
      errors: null
    };
  },
  mounted() {
    this.getCompanies();
  },
  methods: {
    validate() {
      this.errors = [];
      if (!this.form.companyId) {
        this.errors.push({
          param: "companyId",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!this.form.email) {
        this.errors.push({
          param: "email",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      return this.errors.length === 0;
    },
    clear() {
      this.form.email = "";
      this.$refs["modal-invite-success"].hide();
    },
    getCompanies() {
      return companiesApi.getAll().then(res => {
        this.companies = res;
      });
    },
    sendInvitation() {
      if (this.validate()) {
        const params = {
          ...this.form
        };
        usersApi
          .invite(params)
          .then(res => {
            this.$refs["modal-invite-success"].show();
          })
          .catch(error => {
            this.errors = error.response.data.errors.msg;
          });
      }
    }
  }
};
</script>
