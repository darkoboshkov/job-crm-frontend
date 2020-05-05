<template>
  <div id="joboffer_contract" class="p-3">
    <div class="text-center">
      <strong>{{ $t("page_offer_detail.contract.title") }}</strong>
    </div>
    <br />
    <div class="text-center">
      <strong>{{ $t("page_offer_detail.contract.sub_title") }}</strong>
    </div>
    <br />
    <div>
      <strong>{{ $t("page_offer_detail.contract.subject1") }}</strong>
      {{
        $t("page_offer_detail.contract.description1", {
          companyName: this.company.name,
          companyCity: this.company.city,
          companyStreet: this.company.street,
          companyHouseNumber: this.company.houseNumber,
          companyPostalCode: this.company.postalCode,
          honorificTitle: this.$t(`honorific.${this.manager.honorificTitle}`),
          manager: this.getFullName(manager)
        })
      }}
      <br />
      <br />
      <strong>{{ $t("page_offer_detail.contract.and") }}</strong>
      <br />
      <br />
      <strong>{{ $t("page_offer_detail.contract.subject2") }}</strong>
    </div>
    <div>
      <div style="width: 350px; display: inline-block;">
        {{ $t("page_offer_detail.contract.name") }}
      </div>
      : {{ worker | fullNameFormatter }}
    </div>
    <div>
      <div style="width: 350px; display: inline-block;">
        {{ $t("page_offer_detail.contract.address") }}
      </div>
      : {{ worker.street }} {{ worker.houseNumber }}
    </div>
    <div>
      <div style="width: 350px; display: inline-block;">
        {{ $t("page_offer_detail.contract.postal_code_city") }}
      </div>
      : {{ worker.postalCode }} {{ worker.city }}
    </div>
    <div>
      <div style="width: 350px; display: inline-block;">
        {{ $t("page_offer_detail.contract.social_security_number") }}
      </div>
      : {{ worker.socialSecurityNumber }}
    </div>
    <div>
      <div style="width: 350px; display: inline-block;">
        {{ $t("page_offer_detail.contract.birthday") }}
      </div>
      : {{ worker.birthday | dateFormatter }}
    </div>
    <div>
      <div style="width: 350px; display: inline-block;">
        {{ $t("page_offer_detail.contract.id_type") }}
      </div>
      : {{ worker.identificationType }}
    </div>
    <div>
      <div style="width: 350px; display: inline-block;">
        {{ $t("page_offer_detail.contract.id_expiration") }}
      </div>
      : {{ worker.identificationExpirationDate | dateFormatter }}
    </div>
    <br />
    <strong>{{ $t("page_offer_detail.contract.subject3") }}</strong>
    <br />
    <br />
    {{ $t("page_offer_detail.contract.description3") }}
    <br />
    <br />
    <div>
      <div style="width: 350px; display: inline-block;">
        {{ $t("page_offer_detail.contract.company_name") }}
      </div>
      : {{ company.name }}
    </div>
    <div>
      <div style="width: 350px; display: inline-block;">
        {{ $t("page_offer_detail.contract.address") }}
      </div>
      : {{ company.street }} {{ company.houseNumber }}
    </div>
    <div>
      <div style="width: 350px; display: inline-block;">
        {{ $t("page_offer_detail.contract.postal_code_city") }}
      </div>
      : {{ company.postalCode }} {{ company.city }}
    </div>
    <div>
      <div style="width: 350px; display: inline-block;">
        {{ $t("page_offer_detail.contract.manager") }}
      </div>
      : {{ manager | fullNameFormatter }}
    </div>
    <div>
      <div style="width: 350px; display: inline-block;">
        {{ $t("page_offer_detail.contract.telephone_number") }}
      </div>
      : {{ manager.phone }}
    </div>
    <div>
      <div style="width: 350px; display: inline-block;">
        {{ $t("page_offer_detail.contract.expected_start_date") }}
      </div>
      : {{ offer.startDate | dateFormatter }}
    </div>
    <div>
      <div style="width: 350px; display: inline-block;">
        {{ $t("page_offer_detail.contract.agreed_working_hours") }}
      </div>
      : {{ offer.hoursPerWeek }}
    </div>
    <br />

    <strong>{{ $t("page_offer_detail.contract.subject4") }}</strong>
    <div>{{ $t("page_offer_detail.contract.description4") }}</div>
    <br />

    <strong>{{ $t("page_offer_detail.contract.subject5") }}</strong>
    <div>{{ $t("page_offer_detail.contract.description5") }}</div>
    <br />

    <strong>{{ $t("page_offer_detail.contract.subject6") }}</strong>
    <div>{{ $t("page_offer_detail.contract.description6") }}</div>
    <br />

    <strong>{{ $t("page_offer_detail.contract.subject7") }}</strong>
    <div>{{ $t("page_offer_detail.contract.description7_1") }}</div>
    <ul style="padding: 0 0 0 20px; margin: 0;">
      <li style="list-style-type: none;">
        {{ $t("page_offer_detail.contract.description7_1_1") }}
      </li>
      <li style="list-style-type: none;">
        {{ $t("page_offer_detail.contract.description7_1_2") }}
      </li>
      <li style="list-style-type: none;">
        {{ $t("page_offer_detail.contract.description7_1_3") }}
      </li>
      <li style="list-style-type: none;">
        {{ $t("page_offer_detail.contract.description7_1_4") }}
      </li>
    </ul>
    <br />
    <div>
      {{ $t("page_offer_detail.contract.description7_2") }}
    </div>
    <br />

    <strong>{{ $t("page_offer_detail.contract.subject8") }}</strong>
    <div>{{ $t("page_offer_detail.contract.description8_1") }}</div>
    <br />
    <div>{{ $t("page_offer_detail.contract.description8_2") }}</div>
    <br />

    <strong>{{ $t("page_offer_detail.contract.subject9") }}</strong>
    <div>
      {{
        $t("page_offer_detail.contract.description9", {
          hoursPerWeek: this.offer.hoursPerWeek
        })
      }}
    </div>
    <br />

    <strong>{{ $t("page_offer_detail.contract.subject10") }}</strong>
    <div>
      {{
        $t("page_offer_detail.contract.description10", {
          jobTitle: this.job.title
        })
      }}
    </div>
    <br />

    <strong>{{ $t("page_offer_detail.contract.subject11") }}</strong>
    <ul style="padding: 0 0 0 20px; margin: 0;">
      <li style="list-style-type: decimal;">
        {{ $t("page_offer_detail.contract.description11_1") }}
        {{
          offer.CAO && offer.CAO[0] && offer.CAO[0].name
            ? offer.CAO[0].name
            : ""
        }}
      </li>
      <li style="list-style-type: decimal;">
        {{ $t("page_offer_detail.contract.description11_2") }} €
        {{ offer.hourlyWage }}
      </li>
      <li style="list-style-type: decimal;">
        {{ $t("page_offer_detail.contract.description11_3") }}
      </li>
      <li style="list-style-type: decimal;">
        {{ $t("page_offer_detail.contract.description11_4") }}
        €{{ offer.travelExpenses }} per kilometer
      </li>
      <li style="list-style-type: decimal;">
        {{ $t("page_offer_detail.contract.description11_5") }}
      </li>
      <li style="list-style-type: decimal;">
        {{ $t("page_offer_detail.contract.description11_6") }}
      </li>
    </ul>
    <br />
    <div>{{ $t("page_offer_detail.contract.description11_7") }}</div>
    <br />
    <div>{{ $t("page_offer_detail.contract.description11_8") }}</div>
    <br />
    <div>{{ $t("page_offer_detail.contract.description11_9") }}</div>
    <br />
    <div>{{ $t("page_offer_detail.contract.description11_10") }}</div>
    <br />
    <strong>{{ $t("page_offer_detail.contract.subject12") }}</strong>
    <div>{{ $t("page_offer_detail.contract.description12") }}</div>
    <br />
    <strong>{{ $t("page_offer_detail.contract.subject13") }}</strong>
    <ul style="padding: 0 0 0 20px; margin: 0;">
      <li style="list-style-type: none;">
        {{ $t("page_offer_detail.contract.description13_1") }}
      </li>
      <li style="list-style-type: none;">
        {{ $t("page_offer_detail.contract.description13_2") }}
      </li>
      <li style="list-style-type: none;">
        {{ $t("page_offer_detail.contract.description13_3") }}
      </li>
      <li style="list-style-type: none;">
        {{ $t("page_offer_detail.contract.description13_4") }}
      </li>
    </ul>
    <br />
    <strong>{{ $t("page_offer_detail.contract.subject14") }}</strong>
    <div>{{ $t("page_offer_detail.contract.description14") }}</div>
    <br />
    <strong>{{ $t("page_offer_detail.contract.subject15") }}</strong>
    <div>{{ $t("page_offer_detail.contract.description15") }}</div>
    <br />
    <strong>{{ $t("page_offer_detail.contract.subject16") }}</strong>
    <div>{{ $t("page_offer_detail.contract.description16") }}</div>
    <br />
    <strong>{{ $t("page_offer_detail.contract.subject17") }}</strong>
    <div>{{ $t("page_offer_detail.contract.description17") }}</div>
    <br />
    <strong>{{ $t("page_offer_detail.contract.subject18") }}</strong>
    <div>{{ $t("page_offer_detail.contract.description18") }}</div>
    <ul style="padding: 0 0 0 20px; margin: 0;">
      <li style="list-style-type: none;">
        {{ $t("page_offer_detail.contract.description18_1") }}
      </li>
      <li style="list-style-type: none;">
        {{ $t("page_offer_detail.contract.description18_2") }}
      </li>
      <li style="list-style-type: none;">
        {{ $t("page_offer_detail.contract.description18_3") }}
      </li>
      <li style="list-style-type: none;">
        {{ $t("page_offer_detail.contract.description18_4") }}
      </li>
      <li style="list-style-type: none;">
        {{ $t("page_offer_detail.contract.description18_5") }}
      </li>
      <li style="list-style-type: none;">
        {{ $t("page_offer_detail.contract.description18_6") }}
      </li>
      <li style="list-style-type: none;">
        {{ $t("page_offer_detail.contract.description18_7") }}
      </li>
      <li style="list-style-type: none;">
        {{ $t("page_offer_detail.contract.description18_8") }}
      </li>
    </ul>
    <br />
    <strong>{{ $t("page_offer_detail.contract.subject19") }}</strong>
    <div>{{ $t("page_offer_detail.contract.description19_1") }}</div>
    <br />
    <div>{{ $t("page_offer_detail.contract.description19_2") }}</div>
    <br />
    <strong>{{ $t("page_offer_detail.contract.subject20") }}</strong>
    <br />
    <div class="row">
      <div class="col-6">
        <!--Datum : MANAGERDATETIMESTAMP-->
        {{ $t("page_offer_detail.contract.sign_date") }}
        <template v-if="managerSign">
          {{ managerSign.signDate | dateTimeFormatter }}
        </template>
      </div>
      <div class="col-6">
        <!--Datum : WORKERDATETIMESTAMP-->
        {{ $t("page_offer_detail.contract.sign_date") }}
        <template v-if="workerSign">
          {{ workerSign.signDate | dateTimeFormatter }}
        </template>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        {{ $t("page_offer_detail.contract.city") }} : {{ manager.city }}
      </div>
      <div class="col-6">
        {{ $t("page_offer_detail.contract.city") }} : {{ worker.city }}
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        {{ $t("page_offer_detail.contract.company") }}: {{ company.name }}
      </div>
      <div class="col-6">
        {{ $t("page_offer_detail.contract.worker") }}:
        {{ worker | fullNameFormatter }}
      </div>
    </div>
    <div class="row">
      <div class="col-12">{{ $t("page_offer_detail.contract.for_this") }}:</div>
    </div>
    <div class="row">
      <div class="col-6">
        {{ $t(`honorific.${manager.honorificTitle}`) }}
        {{ manager | fullNameFormatter }}
      </div>
      <div class="col-6">
        {{ $t(`honorific.${worker.honorificTitle}`) }}
        {{ worker | fullNameFormatter }}
      </div>
    </div>
    <br />
    <div class="text-center">
      <strong>{{ $t("page_offer_detail.contract.subject21") }}</strong>
    </div>
    <br />
    <div>
      {{
        $t("page_offer_detail.contract.description21_1", {
          companyName: this.company.name
        })
      }}
    </div>
    <br />
    <div>
      {{
        $t("page_offer_detail.contract.description21_2", {
          companyName: this.company.name
        })
      }}
    </div>
    <br />
    <div>
      <strong>{{ $t("page_offer_detail.contract.subject22") }}</strong>
    </div>
    <div>
      {{
        $t("page_offer_detail.contract.description22", {
          companyName: this.company.name
        })
      }}
    </div>
    <br />
    <div>
      <strong>{{ $t("page_offer_detail.contract.subject23") }}</strong>
    </div>
    <div>
      {{
        $t("page_offer_detail.contract.description23", {
          companyName: this.company.name
        })
      }}
    </div>
    <br />
    <div>
      <strong>{{ $t("page_offer_detail.contract.subject24") }}</strong>
    </div>
    <div>{{ $t("page_offer_detail.contract.description24_1") }}</div>
    <div>{{ $t("page_offer_detail.contract.description24_2") }}</div>
    <div>{{ $t("page_offer_detail.contract.description24_3") }}</div>
    <div>{{ $t("page_offer_detail.contract.description24_4") }}</div>
    <br />
    <div>
      {{
        $t("page_offer_detail.contract.description24_5", {
          companyName: this.company.name
        })
      }}
    </div>
    <div>{{ $t("page_offer_detail.contract.description24_6") }}</div>
    <br />
    <div>{{ company.city }}, {{ offer.startDate | dateFormatter }}</div>
    <div>{{ $t("page_offer_detail.contract.for_approval") }},</div>
    <br />
    <br />
    {{ worker | fullNameFormatter }}
  </div>
</template>

<script>
export default {
  name: "Contract",
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
    }
  },
  computed: {
    contract() {
      return this.offer.contractSigned;
    },
    managerSign() {
      return this.contract
        ? this.contract.find(sign => sign.role === "manager")
        : {};
    },
    workerSign() {
      return this.contract
        ? this.contract.find(sign => sign.role === "worker")
        : {};
    }
  }
};
</script>

<style scoped></style>
