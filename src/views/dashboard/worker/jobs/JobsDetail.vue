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
                  {{ $t("page_job_detail.form.payment_type") }}
                  <div class="pull-right">
                    <div>
                      {{ model.paymentType }}
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
                    Offer - {{ offer.worker | fullNameFormatter }}
                  </div>
                  <div class="flex-2">
                    {{ offer.createdAt | dateFormatter }}
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
              <div class="d-flex align-items-center">
                <h5 class="m-0 flex-1">{{ $t("page_job_detail.files") }}</h5>
                <!--                <input-->
                <!--                  type="file"-->
                <!--                  id="attachment"-->
                <!--                  class="d-none"-->
                <!--                  name="attachment"-->
                <!--                  accept=".doc,.docx,.pdf"-->
                <!--                  @change="onFileChange"-->
                <!--                />-->
                <!--                <label-->
                <!--                  for="attachment"-->
                <!--                  class="btn btn-blue m-0"-->
                <!--                  style="min-width:160px;"-->
                <!--                >-->
                <!--                  {{ $t("page_job_detail.button.upload") }}-->
                <!--                  <i class="hiway-crm-icon icon-upload"></i>-->
                <!--                </label>-->
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
                      <b-dropdown-item @click="viewFile(attachment)">
                        {{ $t("page_job_detail.view_file") }}
                      </b-dropdown-item>
                      <b-dropdown-item @click="downloadFile(attachment)">
                        {{ $t("page_job_detail.download_file") }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </span>
                  <span><i class="hiway-crm-icon icon-bin"></i></span>
                </div>
              </div>
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

export default {
  name: "JobsDetail",
  data() {
    return {
      model: {
        title: "",
        companyId: "",
        managerId: "",
        professionId: "",
        wage: null,
        hourlyWage: null,
        payRate: null,
        paymentType: 'EUR',
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
    downloadFile(attachment) {},
    fetchJobDetails() {
      jobsApi.get({ companyId: this.companyId, id: this.jobId }).then(res => {
        this.model = res;
        this.model.company = res.company[0];
        this.model.manager = res.manager[0];
        this.model.profession =
          res.profession && res.profession[0] ? res.profession[0] : null;
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
          this.jobOffers = res.docs;
          this.jobOffers.forEach(row => {
            row.worker = row.worker[0];
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

      jobsApi.upload(data).then(response => {
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

            this.attachments = res.attachments;
          });
      });
    }
  }
};
</script>
