<template>
  <div id="page_job_detail" class="dashboard-content">
    <div class="container-fluid">
      <a href="javascript:void(0)" class="back" @click.prevent="$router.go(-1)">
        <i class="hiway-crm-icon icon-angle-left mr-2" />
        <span>{{ $t("common.back") }}</span>
      </a>
      <b-row class="mt-5">
        <b-col md="12">
          <div class="job-detail-header">
            <div class="job-detail-header__photo">
              <img
                v-if="model.company && model.company.logo"
                :src="APP_URL + model.company.logo"
              />
            </div>
            <div class="job-detail-header__description">
              <div>
                <h2 class="fullName">{{ model.title }}</h2>
              </div>
              <h3 class="position">
                {{ model.company && model.company.name }}
              </h3>
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row class="mt-1">
        <b-col md="6">
          <b-card class="mt-4">
            <template v-slot:header>
              <h5 class="m-0">{{ $t("page_job_detail.form.description") }}</h5>
            </template>
            <div>
              {{ model.description }}
            </div>
          </b-card>

          <!--<b-card class="mt-3">-->
          <!--<template v-slot:header>-->
          <!--<h5 class="m-0">-->
          <!--{{ $t("page_job_detail.form.questions") }}-->
          <!--</h5>-->
          <!--</template>-->
          <!--<ul class="custom-list">-->
          <!--<li-->
          <!--v-for="(question, idx) in model.questions"-->
          <!--:key="idx"-->
          <!--class="d-flex justify-content-between align-items-center"-->
          <!--&gt;-->
          <!--{{ idx + 1 }}-->
          <!--<div>-->
          <!--{{ question }}-->
          <!--</div>-->
          <!--</li>-->
          <!--</ul>-->
          <!--</b-card>-->
        </b-col>

        <b-col md="6">
          <b-card class="mt-4">
            <template v-slot:header>
              <h5 class="m-0">
                {{ $t("page_job_detail.form.specifications") }}
              </h5>
            </template>
            <div>
              <ul class="custom-list">
                <li>
                  {{ $t("page_job_detail.form.company") }}
                  <div class="pull-right">
                    <span>{{ model.company && model.company.name }}</span>
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.manager") }}
                  <div class="pull-right">
                    <span>{{ userName }}</span>
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.wage") }}
                  <div class="pull-right">
                    <div>
                      {{ model.wage }}
                    </div>
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.start_date") }}
                  <div class="pull-right">
                    <div>
                      {{ model.startDate | dateFormatter }}
                    </div>
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.end_date") }}
                  <div class="pull-right">
                    <div>
                      {{ model.endDate | dateFormatter }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </b-card>

          <b-row>
            <b-col md="6">
              <b-card class="mt-4">
                <div class="d-flex">
                  <img
                    src="@/assets/image/icon/mail-red.svg"
                    style="width:31px"
                    class="mr-3"
                  />
                  <span>{{ user.email }}</span>
                </div>
              </b-card>
            </b-col>

            <b-col md="6" class="mt-4">
              <b-card>
                <div class="d-flex">
                  <img
                    src="@/assets/image/icon/phone-red.svg"
                    style="width: 22px"
                    class="mr-3"
                  />
                  <span>{{ user.phone }}</span>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col md="12">
          <b-card>
            <template v-slot:header>
              <div class="d-flex">
                <h5 class="m-0 flex-1">
                  {{ $t("page_job_detail.job_offers") }}
                </h5>
              </div>
            </template>
            <div>
              <ul class="custom-list">
                <li class="d-flex" v-for="offer in jobOffers" :key="offer._id">
                  <div class="flex-3">
                    Offer - {{ offer.worker.firstName }}
                    {{ offer.worker.lastName }}
                  </div>
                  <div class="flex-2">
                    {{ offer.createdAt }}
                  </div>
                  <div class="flex-1">
                    {{ offer.status }}
                  </div>
                </li>
              </ul>
            </div>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col md="12">
          <b-card>
            <template v-slot:header>
              <div class="d-flex">
                <h5 class="m-0 flex-1">{{ $t("page_job_detail.files") }}</h5>
              </div>
            </template>
            <div>
              <ul class="custom-list">
                <li class="d-flex">
                  <div class="flex-3">
                    Kruidvat General Practice Document.pdf
                  </div>
                  <div class="flex-2">
                    Geupload op 23 juli 2019 om 15:09
                  </div>
                  <div class="flex-1">
                    2,3mb
                  </div>
                  <div>
                    <i class="hiway-crm-icon icon-more-vertical mr-2" />
                    <i class="hiway-crm-icon icon-bin" />
                  </div>
                </li>
                <li class="d-flex">
                  <div class="flex-3">
                    Kruidvat Benefits Policy.docx
                  </div>
                  <div class="flex-2">
                    Geupload op 23 juli 2019 om 15:09
                  </div>
                  <div class="flex-1">
                    2,3mb
                  </div>
                  <div>
                    <i class="hiway-crm-icon icon-more-vertical mr-2" />
                    <i class="hiway-crm-icon icon-bin" />
                  </div>
                </li>
              </ul>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import jobsApi from "@/services/api/jobs";
import joboffersApi from "@/services/api/joboffers";
import companiesApi from "@/services/api/companies";
import usersApi from "@/services/api/users";
import constantsApi from "@/services/api/constants";
import errorReader from "@/helpers/ErrorReader";
import { APP_URL } from "@/constants";
import dateFormatter from "../../../../helpers/DateFormatter";

export default {
  name: "JobsDetail",
  data() {
    return {
      APP_URL,
      model: {
        title: "",
        companyId: 0,
        managerId: 0,
        positionId: 0,
        wage: "",
        level: null,
        status: "",
        skillIds: [],
        description: "",
        questions: [],
        image: null,
        startDate: null,
        endDate: null,

        company: null,
        manager: null,
        position: null
      },
      companies: [],
      managers: [],
      state: [],
      error: "",
      jobId: "",
      jobOffers: []
    };
  },
  filters: {
    dateFormatter(string) {
      return dateFormatter(new Date(string));
    }
  },
  mounted() {
    this.jobId = this.$route.params.jobId;
    this.fetchJobDetails();
    this.fetchJobOffers();
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    userName() {
      return (
        this.$store.state.user.firstName + " " + this.$store.state.user.lastName
      );
    }
  },
  methods: {
    fetchJobDetails() {
      jobsApi
        .get({ companyId: this.user.companyId, id: this.jobId })
        .then(res => {
          this.model = res;
          this.model.company = res.company[0];
          this.model.manager = res.manager[0];
          this.model.position = res.position[0];
        });
    },
    fetchJobOffers() {
      joboffersApi
        .getAllByJobId({
          companyId: this.user.companyId,
          jobId: this.jobId,
          limit: 10
        })
        .then(res => {
          this.jobOffers = res.docs;
          this.jobOffers.forEach(row => {
            row.worker = row.worker[0];
            row.createdAt = dateFormatter(new Date(row.createdAt));
          });
        });
    }
  }
};
</script>
