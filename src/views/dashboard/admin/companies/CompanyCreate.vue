<template>
  <div id="page_company_create" class="company-create">
    <div class="company-create__header text-center">
      <h1>
        {{ $t('CREATE_YOUR_OWN_COMPANY') }}
      </h1>
    </div>
    <form class="company-create__form mt-4" ref="company-create-form">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="form-element">
              <label>{{ $t("COMPANY_NAME") }}:</label>
              <b-form-input
                      type="text"
                      name="name"
                      required
                      class="custom-input"
                      v-model="model.name"
              />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-element">
              <label>{{ $t("COMPANY_EMAIL") }}:</label>
              <b-form-input
                      type="email"
                      name="email"
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
                      :options="['7 days', '14 days', '30 days']"
                      class="custom-input"
                      v-model="model.termOfPayment"
              ></b-form-select>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-element">
              <b-form-checkbox
                      type="text"
                      name="automatic_collection"
                      required
                      class="custom-input"
                      v-model="model.automaticCollection"
              >
                {{ $t("COMPANY_AUTOMATIC_COLLECTION") }}
              </b-form-checkbox>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-element">
              <b-form-checkbox
                      name="charge_travel_expenses"
                      required
                      class="custom-input"
                      v-model="model.chargeTravelExpenses"
              >
                {{ $t("COMPANY_CHARGE_TRAVEL_EXPENSES") }}
              </b-form-checkbox>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-element">
              <b-form-checkbox
                      name="charge_other_expenses"
                      required
                      class="custom-input"
                      v-model="model.chargeOtherExpenses"
              >
                {{ $t("COMPANY_CHARGE_OTHER_EXPENSES") }}
              </b-form-checkbox>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="form-element">
              <b-form-checkbox
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
        <div class="row">
          <div class="col-12 text-right">
            <button type="submit" class="btn btn-blue">{{ $t('CREATE') }}</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import companyApi from '../../../../services/api/companies.js';

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
      create() {
        // companyApi.create(this.model);
        console.log('company create');
        companyApi.create(this.model).then(res => {
          console.log('res', res);
        });
      }
    },
    mounted() {
      this.$refs["company-create-form"].addEventListener('submit', e => {
        e.preventDefault();
        this.create();
      });
    },
    beforeDestroy() {
      this.$refs["company-create-form"].removeEventListener('submit')
    },
  };
</script>

<style scoped></style>
