<template>
  <b-modal
    ref="modal-view-company-contract"
    size="lg"
    :hide-footer="true"
    :hide-header="true"
    centered
    v-model="showModal"
  >
    <div id="joboffer_contract" class="p-3">
      <div class="text-center">
        <strong>{{ $t("page_offer_detail.company_contract.title") }}</strong>
      </div>
      <br />
      <br />
      <div>
        <br />
        <strong>{{
          $t("page_offer_detail.company_contract.company_title.title")
        }}</strong>
      </div>
      <br />
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.company_title.name") }}
        </div>
        : {{ company.name }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.company_title.contact") }}
        </div>
        : {{ manager | fullNameFormatter }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.company_title.address") }}
        </div>
        : {{ company.street }} {{ company.houseNumber }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.company_title.post") }}
        </div>
        : {{ company.postalCode }} {{ company.city }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.company_title.phone") }}
        </div>
        : {{ manager.phone }}
      </div>
      <div>
        <br />
        <br />
        <strong>{{ $t("page_offer_detail.company_contract.and") }}</strong>
        <br />
        <br />
      </div>
      <div>
        <strong>{{
          $t("page_offer_detail.company_contract.hiring_title.title")
        }}</strong>
      </div>
      <br />
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.hiring_title.name") }}
        </div>
        : {{ hiringCompany.name }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.hiring_title.address") }}
        </div>
        : {{ hiringCompany.street }} {{ hiringCompany.houseNumber }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.hiring_title.post") }}
        </div>
        : {{ hiringCompany.postalCode }} {{ hiringCompany.city }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.hiring_title.contact") }}
        </div>
        : {{ hiringManager | fullNameFormatter }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.hiring_title.phone") }}
        </div>
        : {{ hiringManager.phone }}
      </div>
      <br />
      <br />
      {{ $t("page_offer_detail.company_contract.description") }}
      <br />
      <br />
      <strong>{{ $t("page_offer_detail.company_contract.subject") }}</strong>
      <br />
      <br />
      <div class="description">
        {{ $t("page_offer_detail.company_contract.description_1") }}
      </div>
      <br />
      <div class="description">
        {{ $t("page_offer_detail.company_contract.description_2") }}
      </div>
      <br />
      <div class="description">
        {{ $t("page_offer_detail.company_contract.description_3") }}
      </div>
      <br />
      <br />
      <strong>{{
        $t("page_offer_detail.company_contract.contract_title")
      }}</strong>
      <br />
      <br />
      <div class="text-center">
        <strong>{{ $t("page_offer_detail.company_contract.subject1") }}</strong>
      </div>
      <br />
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.start_date") }}
        </div>
        : {{ offer.startDate }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.cao") }}
        </div>
        :
        {{
          offer.CAO && offer.CAO[0] && offer.CAO[0].name
            ? offer.CAO[0].name
            : ""
        }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.job_title") }}
        </div>
        : {{ job.title }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.hours_per_week") }}
        </div>
        : {{ offer.hoursPerWeek }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.worker_name") }}
        </div>
        : {{ worker | fullNameFormatter }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.worker_address") }}
        </div>
        : {{ worker.street }} {{ worker.houseNumber }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.worker_post") }}
        </div>
        : {{ worker.postalCode }} {{ worker.city }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.worker_birth") }}
        </div>
        : {{ worker.birthday | dateFormatter }}
      </div>
      <br />
      <br />
      <br />
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.pay_rate") }}
        </div>
        : € {{ offer.payRate }} &nbsp;{{
          $t("page_offer_detail.company_contract.pay_rate_change")
        }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.one_travel") }}
        </div>
        : {{ offer.oneWayTravelExpenseDistance }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.travel_expenses") }}
        </div>
        : {{ offer.travelExpenses }}
      </div>
      <div>
        <div class="title">
          {{ $t("page_offer_detail.company_contract.terms_payment") }}
        </div>
        : {{ offer.termOfPayment }}&nbsp;{{
          $t("page_offer_detail.company_contract.terms")
        }}
      </div>
      <br />
      <br />
      <br />
      <strong>{{ $t("page_offer_detail.company_contract.subject2") }}</strong>
      <br />
      <br />
      <ul class="description">
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description2_1") }}
          <br />
          <br />
          <ul class="description">
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description2_1_a") }}
            </li>
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description2_1_b") }}
            </li>
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description2_1_c") }}
            </li>
          </ul>
        </li>
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description2_2") }}
        </li>
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description2_3") }}
        </li>
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description2_4") }}
        </li>
        <br />
      </ul>
      <br />
      <div>
        <strong>{{ $t("page_offer_detail.company_contract.subject3") }}</strong>
      </div>
      <br />
      <ul class="description">
        <li class="list-unstyled">
          {{
            $t("page_offer_detail.company_contract.description3_1", {
              jobOfferStartDate: this.offer.startDate
            })
          }}
        </li>
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description3_2") }}
        </li>
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description3_3") }}
          <br />
          <br />
          <ul class="description">
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description3_3_a") }}
            </li>
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description3_3_b") }}
            </li>
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description3_3_c") }}
            </li>
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description3_3_d") }}
            </li>
          </ul>
        </li>
        <br />
        <br />
      </ul>

      <strong>{{ $t("page_offer_detail.company_contract.subject4") }}</strong>
      <br />
      <br />
      <ul class="description">
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description4_1") }}
        </li>
        <br />
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description4_2") }}
          <ul class="description">
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description4_2_a") }}
            </li>
            <br />
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description4_2_b") }}
            </li>
            <br />
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description4_2_c") }}
            </li>
            <br />
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description4_2_d") }}
            </li>
          </ul>
        </li>
        <br />
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description4_3") }}
        </li>
        <br />
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description4_4") }}
        </li>
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description4_5") }}
          <br />
          <br />
          <ul class="description">
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description4_5_1") }}
            </li>
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description4_5_2") }}
            </li>
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description4_5_3") }}
            </li>
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description4_5_4") }}
            </li>
          </ul>
        </li>
        <br />
        <br />
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description4_6") }}
        </li>
        <br />
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description4_7") }}
        </li>
      </ul>
      <br />
      <br />
      <strong>{{ $t("page_offer_detail.company_contract.subject5") }}</strong>
      <br />
      <br />
      <ul class="description">
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description5_1") }}
        </li>
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description5_2") }}
          <ul class="description">
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description5_2_a") }}
            </li>
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description5_2_b") }}
            </li>
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description5_2_c") }}
            </li>
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description5_2_d") }}
            </li>
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description5_2_e") }}
            </li>
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description5_2_f") }}
            </li>
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description5_2_g") }}
            </li>
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description5_2_h") }}
            </li>
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description5_2_i") }}
            </li>
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description5_2_j") }}
            </li>
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description5_2_k") }}
            </li>
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description5_2_l") }}
            </li>
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description5_2_m") }}
            </li>
            <br />
            <li class="list-unstyled">
              {{ $t("page_offer_detail.company_contract.description5_2_n") }}
            </li>
          </ul>
        </li>
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description5_3") }}
        </li>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description5_4") }}
        </li>
      </ul>
      <br />
      <br />
      <br />
      <strong>{{ $t("page_offer_detail.company_contract.subject6") }}</strong>
      <br />
      <ul class="description">
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description6_1") }}
        </li>
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description6_2") }}
        </li>
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description6_3") }}
        </li>
        <br />
        <li class="list-unstyled">
          {{
            $t("page_offer_detail.company_contract.description6_4", {
              termOfPayment: this.offer.termOfPayment
            })
          }}
        </li>
      </ul>
      <br />
      <br />
      <br />
      <strong>{{ $t("page_offer_detail.company_contract.subject7") }}</strong>
      <br />
      <br />
      <div>{{ $t("page_offer_detail.company_contract.description7_1") }}</div>
      <br />
      <br />
      <br />
      <strong>{{ $t("page_offer_detail.company_contract.subject8") }}</strong>
      <br />
      <br />
      <div>{{ $t("page_offer_detail.company_contract.description8_1") }}</div>
      <br />
      <div>{{ $t("page_offer_detail.company_contract.description8_2") }}</div>
      <br />
      <div>{{ $t("page_offer_detail.company_contract.description8_3") }}</div>
      <br />
      <br />
      <br />
      <strong>{{ $t("page_offer_detail.company_contract.subject9") }}</strong>
      <br />
      <br />
      <div class="description">
        {{ $t("page_offer_detail.company_contract.description9_1") }}
      </div>
      <br />
      <br />
      <br />
      <strong>{{ $t("page_offer_detail.company_contract.subject10") }}</strong>
      <br />
      <br />
      <ul class="description">
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description10_1") }}
        </li>
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description10_2") }}
        </li>
      </ul>
      <br />
      <br />
      <br />
      <strong>{{ $t("page_offer_detail.company_contract.subject11") }}</strong>
      <br />
      <br />
      <ul class="description">
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description11_1") }}
        </li>
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description11_2") }}
        </li>
      </ul>
      <br />
      <br />
      <br />
      <strong>{{ $t("page_offer_detail.company_contract.subject12") }}</strong>
      <br />
      <br />
      <ul class="description">
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description12_1") }}
        </li>
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description12_2") }}
        </li>
      </ul>
      <br />
      <br />
      <br />
      <strong>{{ $t("page_offer_detail.company_contract.subject13") }}</strong>
      <br />
      <br />
      <ul class="description">
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description13_1") }}
        </li>
      </ul>
      <br />
      <br />
      <br />
      <strong>{{ $t("page_offer_detail.company_contract.subject14") }}</strong>
      <br />
      <br />
      <div class="description">
        14.1 &nbsp;&nbsp;&nbsp;&nbsp;<strong>{{
          $t("page_offer_detail.company_contract.subject14_1")
        }}</strong>
      </div>
      <br />
      <div class="padding-40">
        {{ $t("page_offer_detail.company_contract.description14_1") }}
      </div>
      <br />
      <br />
      <strong>{{ $t("page_offer_detail.company_contract.subject15") }}</strong>
      <br />
      <br />
      <ul class="description">
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description15_1") }}
        </li>
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description15_2") }}
        </li>
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description15_3") }}
        </li>
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description15_4") }}
        </li>
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description15_5") }}
        </li>
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description15_6") }}
        </li>
      </ul>
      <br />
      <br />
      <br />
      <strong>{{ $t("page_offer_detail.company_contract.subject16") }}</strong>
      <br />
      <br />
      <ul class="description">
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description16_1") }}
        </li>
        <br />
        <li class="list-unstyled">
          {{ $t("page_offer_detail.company_contract.description16_2") }}
        </li>
      </ul>
      <br />
      <br />
      <br />
      <div>
        {{
          $t("page_offer_detail.company_contract.description_end", {
            jobOfferStartDate: this.offer.startDate
          })
        }}
      </div>
      <br />
      <br />
      <br />
      <div class="row">
        <div class="col-6">
          <!--Datum : MANAGERDATETIMESTAMP-->
          {{ $t("page_offer_detail.company_contract.date_stamp") }}&nbsp;:
          <template v-if="managerSign">
            {{ managerSign.signDate | dateTimeFormatter }}
          </template>
        </div>
        <br />
        <br />
        <div class="col-6">
          <!--Datum : HiringDATETIMESTAMP-->
          {{ $t("page_offer_detail.company_contract.date_stamp") }}&nbsp;:
          <template v-if="hiringSign">
            {{ hiringSign.signDate | dateTimeFormatter }}
          </template>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          {{ $t("page_offer_detail.company_contract.city") }} :
          {{ manager.city }}
        </div>
        <div class="col-6">
          {{ $t("page_offer_detail.company_contract.city") }} :
          {{ hiringManager.city }}
        </div>
      </div>
      <br />
      <br />
      <div class="row">
        <div class="col-6">
          {{ $t("page_offer_detail.company_contract.company_sign") }}:
          <br />
          <br />
          {{ company.name }}
        </div>
        <div class="col-6">
          {{ $t("page_offer_detail.company_contract.hiring_sign") }}:
          <br />
          <br />
          {{ hiringCompany.name | fullNameFormatter }}
        </div>
      </div>
      <br />
      <br />
      <div class="row">
        <div class="col-6">
          {{ $t("page_offer_detail.company_contract.sign_name") }}:
          <br />
          <br />
          {{ manager | fullNameFormatter }}
        </div>
        <div class="col-6">
          {{ $t("page_offer_detail.company_contract.sign_name") }}:
          <br />
          <br />
          {{ hiringManager | fullNameFormatter }}
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "CompanyContract",
  props: {
    offer: {
      default: {}
    },
    company: {
      default: {}
    },
    manager: {
      default: {}
    },
    worker: {
      default: {}
    },
    job: {
      default: {}
    },
    hiringCompany: {
      default: {}
    },
    hiringManager: {
      default: {}
    },
    modalOpen: {
      type: Boolean,
      default: false
    }
  },
  mounted() {},
  computed: {
    contract() {
      return this.offer.contractSigned;
    },
    managerSign() {
      return this.contract
        ? this.contract.find(sign => sign.role === "manager")
        : {};
    },
    hiringSign() {
      return this.contract
        ? this.contract.find(sign => sign.role === "manager")
        : {};
    },
    workerSign() {
      return this.contract
        ? this.contract.find(sign => sign.role === "worker")
        : {};
    },
    showModal: {
      get() {
        return this.modalOpen;
      },
      set(v) {
        this.$emit("update:modalOpen", v);
      }
    }
  }
};
</script>

<style scoped>
.title {
  width: 350px;
  display: inline-block;
}

.description {
  padding: 0 0 0 20px;
  margin: 0;
}
.padding-40 {
  padding: 0 0 0 40px;
  margin: 0;
}
</style>
