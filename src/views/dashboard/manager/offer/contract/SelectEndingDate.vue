<template>
  <div id="page_user_create" class="dashboard-content">
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
    <div class="content">
      <h1 class="title text-center">
        {{ $t("page_offer_end.select_date") }}
      </h1>
      <p class="description text-center mt-5">
        {{ $t("page_offer_end.content") }}
      </p>
      <div class="d-flex pb-3 pt-5">
        <div
          class="col-3 d-flex justify-content-end color-blue pt-1 font-weight-bolder"
        >
          {{ $t("page_offer_end.current_date") }}
        </div>
        <div class="col-8">
          <b-form-input type="text" v-model="currentEndDate" disabled />
        </div>
      </div>
      <div class="d-flex pb-4">
        <div
          class="col-3 d-flex justify-content-end color-blue pt-1 font-weight-bolder"
        >
          {{ $t("page_offer_end.new_date") }}
        </div>
        <div class="col-8 text-left">
          <b-form-datepicker
            v-model="newEndDate"
            :date-format-options="dateStringOptions"
            today-button
            reset-button
            locale="nl"
            required
          />
          <b-form-invalid-feedback class="d-block">
            {{ errors | errorFormatter("newEndDate") }}
          </b-form-invalid-feedback>
        </div>
      </div>
      <b-form-invalid-feedback class="d-block">
        {{ errors | errorFormatter }}
      </b-form-invalid-feedback>
      <div class="d-flex justify-content-center">
        <hr class="color-gray col-8" />
      </div>
      <div class="mt-5">
        <button
          class="btn btn-blue large mr-2 min-width-260"
          @click="endContract"
        >
          {{ $t("page_offer_end.button.send") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import jobOfferApi from "@/services/api/joboffers";

export default {
  name: "SelectEndDate",
  data() {
    return {
      companyId: this.$store.state.user.companyId,
      offerId: this.$route.params.offerId,
      currentEndDate: null,
      newEndDate: null,
      errors: null
    };
  },
  mounted() {
    this.getCurrentEndDate();
  },
  methods: {
    validate() {
      this.errors = [];
      if (!this.newEndDate) {
        this.errors.push({
          param: "newEndDate",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      return this.errors.length === 0;
    },
    getCurrentEndDate() {
      const { companyId, offerId } = this;

      jobOfferApi
        .getCurrentEndDate({ companyId, offerId })
        .then(res => {
          this.currentEndDate = this.getDateString(res);
        })
        .catch(e => {});
    },
    endContract() {
      const { companyId, offerId, currentEndDate, newEndDate } = this;
      if (this.validate()) {
        jobOfferApi
          .endContract({ companyId, offerId, currentEndDate, newEndDate })
          .then(res => {
            console.log(res);
            this.currentEndDate = this.getDateString(res.endDate);
            this.newEndDate = null;
          })
          .catch(e => {
            this.errors = e.response.data.errors.msg;
          });
      }
    }
  }
};
</script>
