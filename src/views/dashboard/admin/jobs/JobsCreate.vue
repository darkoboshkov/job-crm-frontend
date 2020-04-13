<template>
  <div id="page_job_create" class="dashboard-content">
    <div class="container-fluid">
      <a href="javascript:void(0)" class="back" @click.prevent="$router.go(-1)">
        <i class="hiway-crm-icon icon-angle-left mr-2" />
        <span>{{ $t("common.back") }}</span>
      </a>
      <b-row class="mt-5">
        <b-col md="12">
          <div class="job-create-header">
            <div class="job-create-header__photo">
              <img
                v-if="model.company && model.company.logo"
                :src="model.company.logo | appUrlFormatter"
              />
            </div>
            <div class="job-create-header__description">
              <b-input
                class="fullName mb-3"
                v-model="model.title"
                placeholder="Add job title"
              />
              <h3 class="profession">{{ userName }}</h3>
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
            <b-textarea
              v-model="model.description"
              rows="5"
              placeholder="Please add your job description here."
            />
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
                    <b-form-select
                      v-model="model.company"
                      class="normal-size"
                      style="margin-top:-8px"
                    >
                      <option
                        v-for="(company, index) in companies"
                        :value="company"
                        :key="index"
                      >
                        {{ company && company.name }}
                      </option>
                    </b-form-select>
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.manager") }}
                  <div class="pull-right">
                    <b-form-select
                      v-model="model.manager"
                      class="normal-size"
                      style="margin-top:-8px"
                    >
                      <option
                        v-for="(manager, index) in filteredManagers"
                        :value="manager"
                        :key="index"
                      >
                        {{ manager | fullNameFormatter }}
                      </option>
                    </b-form-select>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <span class="flex-1">
                      {{ $t("page_job_detail.form.location") }}
                    </span>
                    <div>
                      <b-input v-model="model.location" />
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <span class="flex-1">
                      {{ $t("page_job_detail.form.hours_per_week") }}
                    </span>
                    <div>
                      <b-input type="number" v-model="model.hoursPerWeek" />
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <span class="flex-1">
                      {{ $t("page_job_detail.form.wage") }}
                    </span>
                    <div>
                      <b-input type="number" v-model="model.wage" />
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <span class="flex-1">
                      {{ $t("page_job_detail.form.hourly_wage") }}
                    </span>
                    <div>
                      <b-input type="number" v-model="model.hourlyWage" />
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <span class="flex-1">
                      {{ $t("page_job_detail.form.rate") }}
                    </span>
                    <div>
                      <b-input type="number" v-model="model.payRate" />
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex align-items-center">
                    <span class="flex-1">
                      {{ $t("page_job_detail.form.start_date") }}
                    </span>
                    <div>
                      <b-input type="date" v-model="model.startDate" />
                    </div>
                  </div>
                </li>

                <li>
                  <div class="d-flex align-items-center">
                    <span class="flex-1">
                      {{ $t("page_job_detail.form.end_date") }}
                    </span>
                    <div>
                      <b-input type="date" v-model="model.endDate" />
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
                  <span>{{ model.manager && model.manager.email }}</span>
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
                  <span>{{ model.manager && model.manager.phone }}</span>
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
              <div class="d-flex align-items-center">
                <h5 class="m-0 flex-1">
                  <span>{{ $t("page_job_detail.files") }}</span>
                  <span class="color-gray ml-2">(.doc,.docx,.pdf)</span>
                </h5>
                <input
                  type="file"
                  id="attachment"
                  class="d-none"
                  name="attachment"
                  accept=".doc,.docx,.pdf"
                  @change="onFileChange"
                />
                <label
                  for="attachment"
                  class="btn btn-blue m-0"
                  style="min-width:160px;"
                >
                  {{ $t("page_job_detail.button.upload") }}
                  <i class="hiway-crm-icon icon-upload" />
                </label>
              </div>
            </template>
            <div class="card-body">
              <ul class="custom-list">
                <li
                  class="d-flex"
                  v-for="(attachment, idx) in model.attachments"
                  :key="idx"
                >
                  <div class="flex-1">
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
                      <i class="hiway-crm-icon icon-more-vertical" />
                    </span>
                    <span class="pointer"
                      ><i
                        class="hiway-crm-icon icon-bin"
                        @click="deleteFile(model.attachments, idx)"
                    /></span>
                  </div>
                </li>
              </ul>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <div class="text-right">
        <button class="btn btn-red mt-3 text-right" @click="createJob">
          {{ $t("page_job_detail.button.create") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import jobsApi from "@/services/api/jobs";
import companiesApi from "@/services/api/companies";
import usersApi from "@/services/api/users";
import constantsApi from "@/services/api/constants";
import errorReader from "@/helpers/ErrorReader";

export default {
  name: "JobsCreate",
  data() {
    return {
      model: {
        title: "",
        companyId: "",
        managerId: "",
        wage: null,
        hoursPerWeek: null,
        hourlyWage: null,
        payRate: null,
        paymentType: "EUR",
        status: "available",
        skillIds: [],
        description: "",
        questions: [],
        image: null,
        startDate: this.getISODateString(new Date()),
        endDate: this.getISODateString(new Date()),
        company: null,
        manager: null,
        location: null,
        profession: null,
        attachments: []
      },
      companies: [],
      managers: [],
      levels: [],
      state: [],
      paymentType: [],
      error: "",
      imageData: {}
    };
  },
  mounted() {
    this.getCompanies();
    this.getManagers();
    this.getPaymentType();
  },
  computed: {
    userName() {
      return this.getFullName(this.$store.state.user);
    },
    filteredManagers() {
      return [null].concat(
        this.managers.filter(
          manager => manager.companyId === this.model.company?._id
        )
      );
    }
  },
  methods: {
    deleteFile(attachments, idx) {
      attachments.splice(idx, 1);
    },
    getPaymentType() {
      constantsApi.getAll().then(res => {
        this.paymentType = res.paymentType;
        this.model.paymentType = this.paymentType[0];
      });
    },
    getCompanies() {
      companiesApi.getAll().then(res => {
        this.companies = [null].concat(res);
      });
    },
    getManagers() {
      usersApi
        .getAll({
          filter: {
            role: "manager"
          },
          pagination: 0
        })
        .then(res => {
          this.managers = res.docs;
        });
    },
    createJob() {
      this.model.companyId = this.model.company?._id;
      this.model.managerId = this.model.manager?._id;
      if (!this.model.endDate) {
        delete this.model.endDate;
      }
      if (!this.model.image) {
        delete this.model.image;
      }

      jobsApi
        .create(this.model)
        .then(res => {
          this.model = res;
          this.$store.dispatch("updateShowSuccessModal", true);
          this.$store.dispatch("updateSuccessModalContent", {
            title: this.$t("page_job_detail.modal.create_success.title"),
            subTitle: this.$t("page_job_detail.modal.create_success.sub_title"),
            button: this.$t("page_job_detail.modal.create_success.continue")
          });
          this.$router.push({ name: "admin-jobs" });
        })
        .catch(err => {
          let read = errorReader(err);
          this.error = read.param + " is " + read.msg.toLowerCase();

          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_job_detail.modal.create_error.title"),
            subTitle: this.$t("page_job_detail.modal.create_error.sub_title"),
            button: this.$t("page_job_detail.modal.create_error.continue")
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

      jobsApi.upload(data).then(res => {
        this.imageData.path = res.path;
        this.imageData.uploadedAt = new Date();
        this.model.attachments.push(this.imageData);
        this.$store.dispatch("updateLoading", false);
      });
    }
  }
};
</script>
