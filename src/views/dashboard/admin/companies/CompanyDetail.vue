<template>
  <div id="page_companies_detail" class="dashboard-content">
    <a href="javascript:void(0)" class="back" @click.prevent="$router.go(-1)">
      <i class="hiway-crm-icon icon-angle-left mr-2" />
      <span>{{ $t("BACK") }}</span>
    </a>

    <div class="container mt-4">
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="form-element">
            <label>{{ $t("COMPANY_NAME") }}:</label>
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
            <label>{{ $t("COMPANY_EMAIL") }}:</label>
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
            <label>{{ $t("COMPANY_PHONE_NUMBER") }}:</label>
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
            <label>{{ $t("COMPANY_KVK_NUMBER") }}:</label>
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
            <label>{{ $t("COMPANY_LIMIT_CREDIT_SAFE") }}:</label>
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
            <label>{{ $t("COMPANY_VAT_SHIFTED") }}:</label>
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
            <label>{{ $t("COMPANY_G_ACCOUNT") }}:</label>
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
            <label>{{ $t("COMPANY_TERM_OF_PAYMENT") }}:</label>
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
            <label>{{ $t("COMPANY_AUTOMATIC_COLLECTION") }}:</label>
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
            <label>{{ $t("COMPANY_CHARGE_TRAVEL_EXPENSES") }}:</label>
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
            <label>{{ $t("COMPANY_CHARGE_OTHER_EXPENSES") }}:</label>
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
            <label>{{ $t("COMPANY_ACTIVE_STATE") }}:</label>
            <b-form-checkbox
                    disabled
                    v-model="model.active"
                    class="custom-input"
                    name="is_active"
            >
              {{ $t('COMPANY_IS_ACTIVE') }}
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
  import companyService from '../../../../services/api/companies';

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
        console.log('id in router', companyId);
        companyService.get({companyId}).then(res => {
          console.log('res', res);
          this.model = res;
        })
      }
    },
    mounted() {
      console.log('this.$route', this.$route)
      let companyId = this.$route.params.companyId;
      console.log('companyId', companyId);
      this.getCompany(companyId);
    }
  };
</script>

<style scoped></style>
