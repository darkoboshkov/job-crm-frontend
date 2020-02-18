<template>
  <div id="page_company_create" class="company-create">
    <div class="company-create__header text-center">
      <h1>
        {{ $t("page_detail_company.create_title") }}
      </h1>
    </div>
    <div class="company-create__description text-center">
      <div class="row">
        <div class="col-12 col-md-8 offset-md-2">
          <p>
            {{ $t("page_detail_company.description") }}
          </p>
        </div>
      </div>
    </div>
    <form class="company-create__form mt-4" ref="company-create-form">
      <div class="container">
        <div class="row align-items-center pb-3">
          <div class="col-12 col-md-4">
            <label class="pull-right"
              >{{ $t("page_detail_company.form.name") }}:</label
            >
          </div>
          <div class="col-12 col-md-6">
            <b-form-input
              type="text"
              name="name"
              required
              class="custom-input"
              v-model="model.name"
            ></b-form-input>
          </div>
        </div>
        <div class="row align-items-center pb-3">
          <div class="col-12 col-md-4">
            <label class="pull-right"
              >{{ $t("page_detail_company.form.owner") }}:</label
            >
          </div>
          <div class="col-12 col-md-6">
            <b-form-select
              name="email"
              v-model="model.email"
              class="custom-input"
              style="margin-top:-8px"
            >
              <option
                v-for="(manager, index) in managers"
                :value="manager.email"
                :key="index"
              >
                {{ manager.email }}
              </option>
            </b-form-select>

            <!--<b-form-input-->
            <!--type="email"-->
            <!--name="email"-->
            <!--required-->
            <!--class="custom-input"-->
            <!--v-model="model.email"-->
            <!--&gt;</b-form-input>-->
          </div>
        </div>
        <div class="row align-items-center pb-3">
          <div class="col-12 col-md-4">
            <label class="pull-right"
              >{{ $t("page_detail_company.form.kvk") }}:</label
            >
          </div>
          <div class="col-12 col-md-6">
            <b-form-input
              type="number"
              name="kvk"
              required
              class="custom-input"
              v-model="model.kvkNumber"
            ></b-form-input>
          </div>
        </div>
        <div class="row align-items-center pb-3">
          <div class="col-12 col-md-4">
            <label class="pull-right"
              >{{ $t("page_detail_company.form.limit_credit_safe") }}:</label
            >
          </div>
          <div class="col-12 col-md-6">
            <b-form-input
              type="number"
              name="limit_credit_safe"
              required
              class="custom-input"
              v-model="model.limitCreditSafe"
            ></b-form-input>
          </div>
        </div>
        <div class="row align-items-center pb-3">
          <div class="col-12 col-md-4">
            <label class="pull-right"
              >{{ $t("page_detail_company.form.vat_shifted") }}:</label
            >
          </div>
          <div class="col-12 col-md-6">
            <div class="row align-items-center">
              <div class="col-12 col-md-4">
                <b-form-group class="mb-2">
                  <b-form-radio-group
                    id="radio-group-1"
                    v-model="model.vatShiftedEnabled"
                    name="vat_shifted"
                    style="outline: none;"
                  >
                    <b-form-radio :value="false">No</b-form-radio>
                    <b-form-radio :value="true">Yes</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </div>
              <div class="col-12 col-md-8">
                <div class="row align-items-center">
                  <div class="col-12 col-md-4">
                    <label class="pull-right">Number:</label>
                  </div>
                  <div class="col-12 col-md-8">
                    <b-form-input
                      type="text"
                      name="vat_shifted"
                      :disabled="!model.vatShiftedEnabled"
                      class="custom-input"
                      v-model="model.VATShifted"
                    ></b-form-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row align-items-center pb-3">
          <div class="col-12 col-md-4">
            <label class="pull-right"
              >{{ $t("page_detail_company.form.g_account") }}:</label
            >
          </div>
          <div class="col-12 col-md-6">
            <div class="row align-items-center">
              <div class="col-12 col-md-4">
                <b-form-group class="mb-2">
                  <b-form-radio-group
                    id="radio-group-2"
                    v-model="model.gAccountEnabled"
                    name="g_account"
                    style="outline: none;"
                  >
                    <b-form-radio :value="false">No</b-form-radio>
                    <b-form-radio :value="true">Yes</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </div>
              <div class="col-12 col-md-8">
                <div class="row align-items-center">
                  <div class="col-12 col-md-4">
                    <label class="pull-right">Percentage:</label>
                  </div>
                  <div class="col-12 col-md-8">
                    <b-form-input
                      type="number"
                      name="vat_shifted"
                      :disabled="!model.gAccountEnabled"
                      class="custom-input"
                      v-model="model.GAccount"
                    ></b-form-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row align-items-center pb-3">
          <div class="col-12 col-md-4">
            <label class="pull-right"
              >{{ $t("page_detail_company.form.terms_of_payment") }}:</label
            >
          </div>
          <div class="col-12 col-md-6">
            <b-form-group class="mb-2">
              <b-form-radio-group
                id="radio-group-3"
                v-model="model.termOfPayment"
                :options="termsOfPayment"
                name="term_of_payment"
                style="outline: none;"
              ></b-form-radio-group>
            </b-form-group>
          </div>
        </div>
        <div class="row align-items-center pb-3">
          <div class="col-12 col-md-4">
            <label class="pull-right"
              >{{ $t("page_detail_company.form.automatic_collection") }}:</label
            >
          </div>
          <div class="col-12 col-md-6">
            <b-form-group class="mb-2">
              <b-form-radio-group
                id="radio-group-4"
                v-model="model.automaticCollection"
                name="automatic_collection"
                style="outline: none;"
              >
                <b-form-radio :value="false">No</b-form-radio>
                <b-form-radio :value="true">Yes</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </div>
        </div>
        <div class="row align-items-center pb-3">
          <div class="col-12 col-md-4">
            <label class="pull-right"
              >{{
                $t("page_detail_company.form.charge_travel_expenses")
              }}:</label
            >
          </div>
          <div class="col-12 col-md-6">
            <b-form-group class="mb-2">
              <b-form-radio-group
                id="radio-group-5"
                v-model="model.chargeTravelExpenses"
                name="charge_travel_expenses"
                style="outline: none;"
              >
                <b-form-radio :value="false">No</b-form-radio>
                <b-form-radio :value="true">Yes</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </div>
        </div>
        <div class="row align-items-center pb-3">
          <div class="col-12 col-md-4">
            <label class="pull-right"
              >{{
                $t("page_detail_company.form.charge_other_expenses")
              }}:</label
            >
          </div>
          <div class="col-12 col-md-6">
            <b-form-group class="mb-2">
              <b-form-radio-group
                id="radio-group-6"
                v-model="model.chargeOtherExpenses"
                name="charge_other_expenses"
                style="outline: none;"
              >
                <b-form-radio :value="false">No</b-form-radio>
                <b-form-radio :value="true">Yes</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <!--<div class="col-12 col-md-6">-->
          <!--<div class="form-element">-->
          <!--<b-form-checkbox-->
          <!--v-model="model.active"-->
          <!--class="custom-input"-->
          <!--name="is_active"-->
          <!--&gt;-->
          <!--{{ $t("page_detail_company.form.is_active") }}-->
          <!--</b-form-checkbox>-->
          <!--</div>-->
          <!--</div>-->
          <div class="col-12 col-md-6">
            <!--<div class="form-element">-->
            <!--<label>{{ $t("COMPANY_MEMBERS") }}:</label>-->
            <!--<b-form-input-->
            <!--type="text"-->
            <!--required-->
            <!--class="custom-input"-->
            <!--v-model="model.members"-->
            <!--/>-->
            <!--</div>-->
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-8 offset-md-2 text-right">
            <button type="submit" class="btn btn-blue">
              {{ $t("page_detail_company.button.create") }}
            </button>
          </div>
        </div>
      </div>
    </form>
    <b-modal
      ref="modal-alert"
      :hide-footer="true"
      :hide-header="true"
      centered
      modal-class="modal-alert"
    >
      <div class="text-center">
        <img class="success-image" src="@/assets/image/icon/alert.svg" />
        <p class="alert-title color-blue">
          {{ $t("page_detail_company.modal.create_error.title") }}
        </p>
        <p class="alert-sub-title">
          {{ error }}
        </p>
        <button class="btn btn-blue" @click="$refs['modal-alert'].hide()">
          {{ $t("page_detail_company.modal.create_error.continue") }}
        </button>
      </div>
    </b-modal>
    <b-modal
      ref="modal-success"
      :hide-footer="true"
      :hide-header="true"
      centered
      modal-class="modal-success"
    >
      <div class="text-center">
        <img class="success-image" src="@/assets/image/icon/success.svg" />
        <p class="alert-title color-blue">
          {{ $t("page_detail_company.modal.create_success.title") }}
        </p>
        <p class="alert-sub-title">
          {{ $t("page_detail_company.modal.create_success.sub_title") }}
        </p>
        <button class="btn btn-blue" @click="$refs['modal-success'].hide()">
          {{ $t("page_detail_company.modal.create_success.continue") }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import companyApi from "../../../../services/api/companies.js";
import constantsApi from "../../../../services/api/constants.js";
import usersApi from "@/services/api/users";
import errorReader from "@/helpers/ErrorReader";

export default {
  name: "CompanyCreate",
  data() {
    return {
      model: {
        name: "",
        email: "",
        phoneNumber: "",
        kvkNumber: "",
        limitCreditSafe: "",
        vatShiftedEnabled: false,
        VATShifted: "",
        gAccountEnabled: false,
        GAccount: "",
        termOfPayment: "",
        automaticCollection: true,
        chargeTravelExpenses: true,
        chargeOtherExpenses: true,
        active: false,
        members: []
      },
      managers: [],
      termsOfPayment: [],
      error: ""
    };
  },
  methods: {
    getManagers() {
      usersApi
        .getAll({
          filter: {
            role: "manager"
          },
          limit: 100
        })
        .then(res => {
          this.managers = res.docs;
        });
    },
    getTermsOfPayment() {
      return constantsApi.getAll().then(res => {
        this.termsOfPayment = res.termsOfPayments;
        this.model.termOfPayment = this.termsOfPayment[0];
      });
    },
    create() {
      if (!this.model.vatShiftedEnabled) {
        delete this.model.VATShifted;
      }
      if (!this.model.gAccountEnabled) {
        delete this.model.GAccount;
      }

      companyApi
        .create(this.model)
        .then(res => {
          this.$refs["modal-success"].show();
        })
        .catch(err => {
          // let read = errorReader(err);
          // this.error = read.param + ' is ' + read.msg.toLowerCase();

          this.error = err.response.data?.errors?.msg;

          this.$refs["modal-alert"].show();
        });
    },
    catchSubmitCreate(e) {
      e.preventDefault();
      this.create();
    }
  },
  mounted() {
    this.getManagers();
    this.getTermsOfPayment();
    this.$refs["company-create-form"].addEventListener(
      "submit",
      this.catchSubmitCreate.bind(this)
    );
  },
  beforeDestroy() {
    this.$refs["company-create-form"].removeEventListener(
      "submit",
      this.catchSubmitCreate
    );
  }
};
</script>
