<template>
  <div id="page_job_detail" class="dashboard-content">
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
              :src="model.company.logo | appUrlFormatter"
            />
          </div>
          <div class="job-detail-header__description">
            <div>
              <h2 class="fullName">{{ model.title }}</h2>
            </div>
            <h3 class="profession">
              {{ model.company && model.company.name }}
            </h3>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-row class="mt-1">
      <b-col md="6" class="mt-4">
        <b-card class="h-100">
          <template v-slot:header>
            <h5 class="m-0">{{ $t("page_job_detail.form.description") }}</h5>
          </template>
          <div>
            {{ model.description }}
          </div>
        </b-card>
      </b-col>

      <b-col md="6" class="mt-4">
        <b-card>
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
                {{ $t("page_job_detail.form.location") }}
                <div class="pull-right">
                  <div>{{ model.location }}</div>
                </div>
              </li>

              <li>
                {{ $t("page_job_detail.form.hours_per_week") }}
                <div class="pull-right">
                  <div>{{ model.hoursPerWeek }}</div>
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
                {{ $t("page_job_detail.form.hourly_wage") }}
                <div class="pull-right">
                  <div>
                    {{ model.hourlyWage }}
                  </div>
                </div>
              </li>

              <li>
                {{ $t("page_job_detail.form.rate") }}
                <div class="pull-right">
                  <div>
                    {{ model.payRate }}
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
                <span>
                  <a
                    v-if="model.manager"
                    :href="'mailto:' + model.manager.email"
                  >
                    {{ model.manager.email }}
                  </a>
                </span>
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
                <span>
                  {{ model.manager ? model.manager.phone : "" }}
                </span>
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
            <h5 class="m-0">
              {{ $t("page_job_detail.job_offers") }}
            </h5>
          </template>
          <div>
            <ul class="custom-list">
              <li class="d-flex color-gray">
                <div class="flex-3">
                  {{ $t("page_job_detail.form.worker") }}
                </div>
                <div class="flex-2">
                  {{ $t("page_job_detail.form.hiring_company") }}
                </div>
                <div class="flex-3">
                  {{ $t("page_job_detail.form.hiring_manager") }}
                </div>
                <div class="flex-1">
                  {{ $t("page_job_detail.form.wage") }}
                </div>
                <div class="flex-2">
                  {{ $t("page_job_detail.form.rate") }}
                </div>
                <div class="flex-2">
                  {{ $t("page_job_detail.form.status") }}
                </div>
                <div class="flex-2">
                  {{ $t("page_job_detail.form.start_date") }}
                </div>
                <div class="flex-2">
                  {{ $t("page_job_detail.form.end_date") }}
                </div>
              </li>
              <li class="d-flex" v-for="offer in jobOffers" :key="offer._id">
                <div class="flex-3">
                  {{ $t("page_job_detail.form.offer") }} -
                  {{ offer.worker | fullNameFormatter }}
                </div>
                <div class="flex-2">
                  {{ offer.hiringCompany.name }}
                </div>
                <div class="flex-3">
                  {{ offer.hiringManager | fullNameFormatter }}
                </div>
                <div class="flex-1">
                  {{ offer.wage }}
                </div>
                <div class="flex-2">
                  {{ offer.payRate }}
                </div>
                <div class="flex-2">
                  {{ offer.status ? $t(`status.${offer.status}`) : "" }}
                </div>
                <div class="flex-2">
                  {{ offer.startDate | dateFormatter }}
                </div>
                <div class="flex-2">
                  {{ offer.endDate | dateFormatter }}
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
            <div class="d-flex align-items-center">
              <h5 class="m-0 flex-1">{{ $t("page_job_detail.files") }}</h5>
            </div>
          </template>
          <div class="card-body">
            <div
              class="d-flex justify-content-between"
              v-for="(attachment, idx) in model.attachments"
              :key="idx"
            >
              <div>
                {{ attachment.name }}
              </div>
              <div>
                <span class="mr-5">
                  {{ attachment.uploadedAt | dateTimeFormatter }}
                </span>
                <span class="mr-5"
                  >{{ attachment.size | fileSizeFormatter }}
                </span>
                <span class="mr-4">
                  <b-dropdown
                    variant="link"
                    toggle-class="text-decoration-none"
                    no-caret
                    offset="0"
                    class="icon-dropdown mx-2"
                  >
                    <template v-slot:button-content>
                      <i
                        class="hiway-crm-icon icon-more-vertical color-black"
                      />
                    </template>
                    <b-dropdown-item @click="downloadFile(attachment)">
                      {{ $t("page_job_detail.download_file") }}
                    </b-dropdown-item>
                  </b-dropdown>
                </span>
                <span><i class="hiway-crm-icon icon-bin"/></span>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import jobsApi from "@/services/api/jobs";
import joboffersApi from "@/services/api/joboffers";
import { downloadFile } from "@/utils";

export default {
  name: "JobsDetail",
  data() {
    return {
      model: {
        title: "",
        companyId: "",
        managerId: "",
        professionId: "",
        hoursPerWeek: null,
        wage: null,
        hourlyWage: null,
        payRate: null,
        paymentType: "EUR",
        level: null,
        status: "",
        description: "",
        questions: [],
        image: null,
        startDate: null,
        endDate: null,
        company: null,
        manager: null,
        location: null,
        profession: null
      },
      companies: [],
      managers: [],
      state: [],
      error: "",
      companyId: "",
      jobId: "",
      jobOffers: [],
      imageData: {},
      attachments: []
    };
  },
  mounted() {
    this.companyId = this.$store.state.user.companyId;
    this.jobId = this.$route.params.jobId;
    this.fetchJobDetails();
    this.fetchJobOffers();
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    userName() {
      return this.getFullName(this.$store.state.user);
    }
  },
  methods: {
    viewFile(attachment) {},
    downloadFile(attachment) {
      jobsApi
        .downloadAttachment({
          companyId: this.companyId,
          id: this.jobId,
          attachmentId: attachment._id
        })
        .then(res => {
          downloadFile(res, attachment.name);
        });
    },
    fetchJobDetails() {
      jobsApi.get({ companyId: this.companyId, id: this.jobId }).then(res => {
        this.model = res;
        this.model.company = res.company[0];
        this.model.manager = res.manager[0];
        this.model.profession = res.profession ? res.profession[0]?.name : "";
      });
    },
    fetchJobOffers() {
      joboffersApi
        .getAllByJobId({
          companyId: this.companyId,
          jobId: this.jobId,
          limit: 10
        })
        .then(res => {
          this.jobOffers = res.docs?.map(row => {
            row.worker = row.worker[0];
            row.hiringCompany = row.hiringCompany[0];
            row.hiringManager = row.hiringManager[0];
            return row;
          });
        });
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }

      if (window.File && window.FileList && window.FileReader) {
        if (files.length !== 1) return;
        let file = files[0];

        this.imageData = {
          file: file,
          name: file.name,
          size: file.size.toString()
        };

        this.upload();
      } else {
        console.error("Your browser does not support File API");
      }
    },
    upload() {
      const data = new FormData();
      data.append("file", this.imageData.file);
      this.$store.dispatch("updateLoading", true);

      jobsApi
        .upload(data)
        .then(response => {
          this.imageData.path = response.path;
          jobsApi
            .addAttachment(
              Object.assign(
                {
                  companyId: this.companyId,
                  _id: this.jobId
                },
                this.imageData
              )
            )
            .then(res => {
              this.$store.dispatch("updateLoading", false);
              this.fetchJobDetails();
            })
            .catch(e => {
              this.$store.dispatch("updateLoading", false);
            });
        })
        .catch(e => {
          this.$store.dispatch("updateLoading", false);
        });
    }
  }
};
</script>
