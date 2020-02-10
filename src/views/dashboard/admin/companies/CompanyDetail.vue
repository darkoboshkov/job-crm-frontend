<template>
  <div id="page_companies_detail" class="dashboard-content">
    <a href="javascript:void(0)" class="back" @click.prevent="$router.go(-1)">
      <i class="hiway-crm-icon icon-angle-left mr-2" />
      <span>{{ $t("common.back") }}</span>
    </a>

    <div class="container mt-4">
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="form-element">
            <label>{{ $t("page_detail_company.form.name") }}:</label>
            <b-form-input
              type="text"
              name="name"
              disabled
              required
              class="custom-input"
              v-model="model.name"
            ></b-form-input>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-element">
            <label>{{ $t("page_detail_company.form.email") }}:</label>
            <b-form-input
              type="email"
              name="email"
              disabled
              required
              class="custom-input"
              v-model="model.email"
            ></b-form-input>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-element">
            <label>{{ $t("page_detail_company.form.phone") }}:</label>
            <b-form-input
              type="number"
              name="phone"
              disabled
              class="custom-input"
              v-model="model.phoneNumber"
            ></b-form-input>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-element">
            <label>{{ $t("page_detail_company.form.kvk") }}:</label>
            <b-form-input
              type="number"
              name="kvk"
              disabled
              required
              class="custom-input"
              v-model="model.kvkNumber"
            ></b-form-input>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-element">
            <label
              >{{ $t("page_detail_company.form.limit_credit_safe") }}:</label
            >
            <b-form-input
              type="number"
              disabled
              required
              class="custom-input"
              v-model="model.limitCreditSafe"
            ></b-form-input>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-element">
            <label>{{ $t("page_detail_company.form.vat_shifted") }}:</label>
            <b-form-input
              type="text"
              name="vat_shifted"
              disabled
              required
              class="custom-input"
              v-model="model.vatShifted"
            ></b-form-input>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-element">
            <label>{{ $t("page_detail_company.form.g_account") }}:</label>
            <b-form-input
              type="text"
              disabled
              name="g_account"
              class="custom-input"
              v-model="model.gAccount"
            ></b-form-input>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-element">
            <label
              >{{ $t("page_detail_company.form.terms_of_payment") }}:</label
            >
            <b-form-select
              name="term_of_payment"
              required
              disabled
              :options="['7 days', '14 days', '30 days']"
              class="custom-input"
              v-model="model.termOfPayment"
            ></b-form-select>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-element">
            <label
              >{{ $t("page_detail_company.form.automatic_collection") }}:</label
            >
            <b-form-checkbox
              type="text"
              name="automatic_collection"
              disabled
              required
              class="custom-input"
              v-model="model.automaticCollection"
            ></b-form-checkbox>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-element">
            <label
              >{{
                $t("page_detail_company.form.charge_travel_expenses")
              }}:</label
            >
            <b-form-checkbox
              name="charge_travel_expenses"
              disabled
              required
              class="custom-input"
              v-model="model.chargeTravelExpenses"
            ></b-form-checkbox>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-element">
            <label
              >{{
                $t("page_detail_company.form.charge_other_expenses")
              }}:</label
            >
            <b-form-checkbox
              name="charge_other_expenses"
              disabled
              required
              class="custom-input"
              v-model="model.chargeOtherExpenses"
            ></b-form-checkbox>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-element">
            <label>{{ $t("page_detail_company.form.active_status") }}:</label>
            <b-form-checkbox
              disabled
              v-model="model.active"
              class="custom-input"
              name="is_active"
            >
              {{ $t("page_detail_company.form.is_active") }}
            </b-form-checkbox>
          </div>
        </div>
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
    </div>
  </div>
</template>

<script>
import companyService from "../../../../services/api/companies";

export default {
  name: "CompanyDetail",
  data() {
    return {
      model: {
        name: "",
        email: "",
        phoneNumber: "",
        kvkNumber: "",
        limitCreditSafe: "",
        vatShifted: "",
        gAccount: "",
        termOfPayment: "",
        automaticCollection: "",
        chargeTravelExpenses: "",
        chargeOtherExpenses: "",
        active: false,
        members: []
      }
    };
  },
  methods: {
    getCompany(companyId) {
      console.log("id in router", companyId);
      companyService.get({ companyId }).then(res => {
        console.log("res", res);
        this.model = res;
      });
    }
  },
  mounted() {
    console.log("this.$route", this.$route);
    let companyId = this.$route.params.companyId;
    console.log("companyId", companyId);
    this.getCompany(companyId);
  }
};
</script>

<style scoped></style>
