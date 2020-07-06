<template>
  <div id="page_job_create" class="dashboard-content">
    <a href="javascript:void(0)" class="back" @click.prevent="$router.go(-1)">
      <i class="hiway-crm-icon icon-angle-left mr-2" />
      <span>{{ $t("common.back") }}</span>
    </a>
    <b-row class="mt-5">
      <b-col md="12">
        <div class="job-create-header">
          <div class="avatar-image size-112">
            <img
              v-if="model.company && model.company.logo"
              :src="model.company.logo | appUrlFormatter"
            />
          </div>
          <div class="job-create-header__description">
            <div class="d-flex flex-column mb-3">
              <b-input
                class="fullName"
                v-model="model.title"
                placeholder="Add job title"
              />
              <b-form-invalid-feedback class="d-block">
                {{ errors | errorFormatter("title") }}
              </b-form-invalid-feedback>
            </div>
            <h3 class="profession mt-3">{{ userName }}</h3>
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
                <div class="d-flex align-items-center justify-content-between">
                  <span>
                    {{ $t("page_job_detail.form.location") }}
                  </span>
                  <div>
                    <b-input v-model="model.location" />
                  </div>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center justify-content-between">
                  <span>
                    {{ $t("page_job_detail.form.hours_per_week") }}
                  </span>
                  <div>
                    <b-input type="number" v-model="model.hoursPerWeek" />
                    <b-form-invalid-feedback class="d-block text-right">
                      {{ errors | errorFormatter("hoursPerWeek") }}
                    </b-form-invalid-feedback>
                  </div>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center justify-content-between">
                  <span>
                    {{ $t("page_job_detail.form.wage") }}
                  </span>
                  <div>
                    <b-input type="number" v-model="model.wage" />
                    <b-form-invalid-feedback class="d-block text-right">
                      {{ errors | errorFormatter("wage") }}
                    </b-form-invalid-feedback>
                  </div>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center justify-content-between">
                  <span>
                    {{ $t("page_job_detail.form.hourly_wage") }}
                  </span>
                  <div>
                    <b-input type="number" v-model="model.hourlyWage" />
                    <b-form-invalid-feedback class="d-block text-right">
                      {{ errors | errorFormatter("hourlyWage") }}
                    </b-form-invalid-feedback>
                  </div>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center justify-content-between">
                  <span>
                    {{ $t("page_job_detail.form.rate") }}
                  </span>
                  <div>
                    <b-input type="number" v-model="model.payRate" />
                    <b-form-invalid-feedback class="d-block text-right">
                      {{ errors | errorFormatter("payRate") }}
                    </b-form-invalid-feedback>
                  </div>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center justify-content-between">
                  <span>
                    {{ $t("page_job_detail.form.start_date") }}
                  </span>
                  <div>
                    <b-form-datepicker
                      v-model="model.startDate"
                      :date-format-options="dateStringOptions"
                      today-button
                      reset-button
                      locale="nl"
                    />
                  </div>
                </div>
              </li>

              <li>
                <div class="d-flex align-items-center justify-content-between">
                  <span>
                    {{ $t("page_job_detail.form.end_date") }}
                  </span>
                  <div>
                    <b-form-datepicker
                      v-model="model.endDate"
                      :date-format-options="dateStringOptions"
                      today-button
                      reset-button
                      locale="nl"
                    />
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
                  class="mr-3 mail-red"
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
                  class="mr-3 phone-red"
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
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="m-0">
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
              <label for="attachment" class="btn btn-blue m-0 min-width-160">
                {{ $t("page_job_detail.button.upload") }}
                <i class="hiway-crm-icon icon-upload" />
              </label>
            </div>
          </template>
          <div class="card-body">
            <ul class="custom-list">
              <li
                class="d-flex align-items-center justify-content-between"
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
                  <span class="mr-5">
                    {{ attachment.size | fileSizeFormatter }}
                  </span>
                  <span class="mr-4">
                    <i class="hiway-crm-icon icon-more-vertical" />
                  </span>
                  <span class="pointer">
                    <i
                      class="hiway-crm-icon icon-bin"
                      @click="deleteFile(model.attachments, idx)"
                    />
                  </span>
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
</template>

<script>
import jobsApi from "@/services/api/jobs";
import companiesApi from "@/services/api/companies";
import constantsApi from "@/services/api/constants";

export default {
  name: "JobsCreate",
  data() {
    return {
      model: {
        title: "",
        companyId: "",
        managerId: "",
        hoursPerWeek: null,
        wage: null,
        hourlyWage: null,
        payRate: null,
        paymentType: "EUR",
        status: "available",
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
      levels: [],
      paymentType: [],
      state: [],
      errors: null,
      user: this.$store.state.user,
      userName: this.getFullName(this.$store.state.user)
    };
  },
  mounted() {
    this.getCompany();
    this.getPaymentType();
  },
  methods: {
    validate() {
      this.errors = [];
      if (!this.model.title) {
        this.errors.push({
          param: "title",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!parseFloat(this.model.hoursPerWeek)) {
        this.errors.push({
          param: "hoursPerWeek",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!parseFloat(this.model.wage)) {
        this.errors.push({
          param: "wage",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!parseFloat(this.model.hourlyWage)) {
        this.errors.push({
          param: "hourlyWage",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!parseFloat(this.model.payRate)) {
        this.errors.push({
          param: "payRate",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      return this.errors.length === 0;
    },
    deleteFile(attachments, idx) {
      attachments.splice(idx, 1);
    },
    getPaymentType() {
      constantsApi.getAll().then(res => {
        this.paymentType = res.paymentType;
        this.model.paymentType = this.paymentType[0];
      });
    },
    getCompany() {
      companiesApi
        .getById({
          companyId: this.user.companyId
        })
        .then(res => {
          this.model.company = res;
        });
    },
    createJob() {
      if (this.validate()) {
        this.model.companyId = this.user.companyId;
        this.model.managerId = this.user._id;
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
              subTitle: this.$t(
                "page_job_detail.modal.create_success.sub_title"
              ),
              button: this.$t("page_job_detail.modal.create_success.continue")
            });
            this.$router.push({ name: "manager-jobs" });
          })
          .catch(error => {
            this.$store.dispatch("updateShowErrorModal", true);
            this.$store.dispatch("updateErrorModalContent", {
              title: this.$t("page_job_detail.modal.create_error.title"),
              subTitle: this.$t("page_job_detail.modal.create_error.sub_title"),
              button: this.$t("page_job_detail.modal.create_error.continue")
            });
          });
      }
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

<style scoped>
.mail-red {
  width: 31px;
}
.phone-red {
  width: 22px;
}
</style>
