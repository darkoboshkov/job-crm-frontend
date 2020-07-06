<template>
  <div id="page_job_detail" class="dashboard-content">
    <a href="javascript:void(0)" class="back" @click.prevent="$router.go(-1)">
      <i class="hiway-crm-icon icon-angle-left mr-2" />
      <span>{{ $t("common.back") }}</span>
    </a>
    <b-row class="mt-5">
      <b-col md="12">
        <div class="job-detail-header">
          <div class="avatar-image size-112">
            <img
              v-if="model.company && model.company.logo"
              :src="model.company.logo | appUrlFormatter"
            />
          </div>
          <div class="job-detail-header__description">
            <div>
              <b-input v-if="editJob" v-model="model.title" class="fullName" />
              <h2 v-else class="fullName">{{ model.title }}</h2>
              <b-form-invalid-feedback class="d-block">
                {{ errors | errorFormatter("title") }}
              </b-form-invalid-feedback>
            </div>
            <h3 class="profession mt-3">
              {{ model.company && model.company.name }}
            </h3>
          </div>
        </div>
        <div class="job-detail-edit">
          <a href="javascript:void(0);" @click.prevent="onEditJob">
            {{
              editJob ? $t("page_job_detail.save") : $t("page_job_detail.edit")
            }}
          </a>
          <i class="hiway-crm-icon icon-pencil ml-2" />
        </div>
      </b-col>
    </b-row>

    <b-row class="mt-1">
      <b-col md="6" class="mt-4">
        <b-card class="h-100">
          <template v-slot:header>
            <h5 class="m-0">{{ $t("page_job_detail.form.description") }}</h5>
          </template>
          <b-textarea v-if="editJob" v-model="model.description" rows="5" />
          <div v-else>
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
                <div class="d-flex align-items-center justify-content-between">
                  <span>
                    {{ $t("page_job_detail.form.company") }}
                  </span>
                  <div>
                    <b-form-select
                      v-if="editJob"
                      v-model="model.company"
                      class="normal-size form-select"
                    >
                      <option
                        v-for="(company, index) in companies"
                        :value="company"
                        :key="index"
                      >
                        {{ company && company.name }}
                      </option>
                    </b-form-select>
                    <span v-else>
                      {{ model.company && model.company.name }}
                    </span>
                    <b-form-invalid-feedback class="d-block text-right">
                      {{ errors | errorFormatter("company") }}
                    </b-form-invalid-feedback>
                  </div>
                </div>
              </li>

              <li>
                <div class="d-flex align-items-center justify-content-between">
                  <span>
                    {{ $t("page_job_detail.form.manager") }}
                  </span>
                  <div>
                    <b-form-select
                      v-if="editJob"
                      v-model="model.manager"
                      class="normal-size"
                    >
                      <option
                        v-for="(manager, index) in filteredManagers"
                        :value="manager"
                        :key="index"
                      >
                        {{ manager | fullNameFormatter }}
                      </option>
                    </b-form-select>
                    <span v-else>
                      {{ model.manager | fullNameFormatter }}
                    </span>
                    <b-form-invalid-feedback class="d-block text-right">
                      {{ errors | errorFormatter("manager") }}
                    </b-form-invalid-feedback>
                  </div>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center justify-content-between">
                  <span>
                    {{ $t("page_job_detail.form.location") }}
                  </span>
                  <div>
                    <b-input v-if="editJob" v-model="model.location" />
                    <div v-else>
                      {{ model.location }}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center justify-content-between">
                  <span>
                    {{ $t("page_job_detail.form.hours_per_week") }}
                  </span>
                  <div>
                    <b-input
                      v-if="editJob"
                      type="number"
                      v-model="model.hoursPerWeek"
                    />
                    <div v-else>
                      {{ model.hoursPerWeek }}
                    </div>
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
                    <b-input
                      v-if="editJob"
                      type="number"
                      v-model="model.wage"
                    />
                    <div v-else>
                      {{ model.wage }}
                    </div>
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
                    <b-input
                      v-if="editJob"
                      type="number"
                      v-model="model.hourlyWage"
                    />
                    <div v-else>
                      {{ model.hourlyWage }}
                    </div>
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
                    <b-input
                      v-if="editJob"
                      type="number"
                      v-model="model.payRate"
                    />
                    <div v-else>
                      {{ model.payRate }}
                    </div>
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
                      v-if="editJob"
                      v-model="model.startDate"
                      :date-format-options="dateStringOptions"
                      today-button
                      reset-button
                      locale="nl"
                    />
                    <div v-else>
                      {{ model.startDate | dateFormatter }}
                    </div>
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
                      v-if="editJob"
                      v-model="model.endDate"
                      :date-format-options="dateStringOptions"
                      today-button
                      reset-button
                      locale="nl"
                    />
                    <div v-else>
                      {{ model.endDate | dateFormatter }}
                    </div>
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
                  class="mr-3 phone-red"
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
        <b-card body-class="p-0">
          <template v-slot:header>
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="m-0">
                {{ $t("page_job_detail.job_offers") }}
              </h5>
              <button
                class="btn btn-blue"
                @click.prevent="
                  $router.push({
                    name: 'admin-jobs-choose-candidate',
                    params: {
                      companyId: companyId,
                      jobId: jobId
                    }
                  })
                "
              >
                {{ $t("page_job_detail.button.create_new_job_offer") }}
                <i class="hiway-crm-icon icon-pencil ml-2" />
              </button>
            </div>
          </template>
          <div>
            <ul class="custom-list interaction">
              <li class="d-flex color-gray px-3">
                <div class="flex-3">
                  {{ $t("page_job_detail.form.worker") }}
                </div>
                <div class="flex-2">
                  {{ $t("page_job_detail.form.hiring_company") }}
                </div>
                <div class="flex-3">
                  {{ $t("page_job_detail.form.hiring_manager") }}
                </div>
                <div class="flex-2">
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
                <div class="flex-2"></div>
              </li>
              <li
                class="d-flex align-items-center px-3"
                v-for="offer in jobOffers"
                :key="offer._id"
              >
                <div class="flex-3" @click="goToOfferDetails(offer._id)">
                  {{ $t("page_job_detail.form.offer") }} -
                  {{ offer.worker | fullNameFormatter }}
                </div>
                <div class="flex-2" @click="goToOfferDetails(offer._id)">
                  {{ offer.hiringCompany.name }}
                </div>
                <div class="flex-3" @click="goToOfferDetails(offer._id)">
                  {{ offer.hiringManager | fullNameFormatter }}
                </div>
                <div class="flex-2" @click="goToOfferDetails(offer._id)">
                  {{ offer.wage }}
                </div>
                <div class="flex-2" @click="goToOfferDetails(offer._id)">
                  {{ offer.payRate }}
                </div>
                <div class="flex-2" @click="goToOfferDetails(offer._id)">
                  {{ offer.status ? $t(`status.${offer.status}`) : "" }}
                </div>
                <div class="flex-2" @click="goToOfferDetails(offer._id)">
                  {{ offer.startDate | dateFormatter }}
                </div>
                <div class="flex-2" @click="goToOfferDetails(offer._id)">
                  {{ offer.endDate | dateFormatter }}
                </div>
                <div class="flex-2 d-flex">
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
                    <b-dropdown-item @click="goToOfferDetails(offer._id)">
                      {{ $t("page_job_detail.view_offer") }}
                    </b-dropdown-item>
                  </b-dropdown>
                  <button
                    class="btn btn-transparent"
                    @click="showDeleteOfferModal(offer._id)"
                  >
                    <i class="hiway-crm-icon icon-bin" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-5">
      <b-col md="12">
        <b-card body-class="p-0">
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
          <div>
            <ul class="custom-list interaction">
              <li
                class="d-flex align-items-center justify-content-between px-3"
                v-for="(attachment, idx) in model.attachments"
                :key="idx"
              >
                <div @click="downloadFile(attachment)">
                  {{ attachment.name }}
                </div>
                <div>
                  <span class="mr-5" @click="downloadFile(attachment)"
                    >{{ attachment.uploadedAt | dateTimeFormatter }}
                  </span>
                  <span class="mr-5" @click="downloadFile(attachment)"
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
                  <button
                    class="btn btn-transparent"
                    @click="showDeleteAttachmentModal(attachment._id)"
                  >
                    <i class="hiway-crm-icon icon-bin" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import jobsApi from "@/services/api/jobs";
import jobOffersApi from "@/services/api/joboffers";
import companiesApi from "@/services/api/companies";
import usersApi from "@/services/api/users";
import constantsApi from "@/services/api/constants";
import { downloadFile } from "@/utils";

export default {
  name: "JobsDetail",
  data() {
    return {
      editJob: false,
      model: {
        title: "",
        companyId: "",
        managerId: "",
        professionId: "",
        wage: null,
        hoursPerWeek: null,
        hourlyWage: null,
        payRate: null,
        paymentType: "EUR",
        status: "",
        description: "",
        questions: [],
        image: null,
        startDate: null,
        endDate: null,
        company: null,
        manager: null,
        location: null,
        profession: null,
        attachments: []
      },
      companies: [],
      managers: [],
      state: [],
      paymentType: [],
      errors: null,
      companyId: this.$route.params.companyId,
      jobId: this.$route.params.jobId,
      jobOffers: [],
      imageData: {},
      selectedJobOfferId: null,
      selectedAttachmentId: null
    };
  },
  async mounted() {
    await this.getCompanies();
    await this.getManagers();
    await this.fetchJobDetails();
    this.fetchJobOffers();
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
    validate() {
      this.errors = [];
      if (!this.model.title) {
        this.errors.push({
          param: "title",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (!this.model.company) {
        this.errors.push({
          param: "company",
          msg: "THIS_FIELD_IS_REQUIRED"
        });
      }
      if (
        !this.model.manager ||
        this.filteredManagers.indexOf(this.model.manager) === -1
      ) {
        this.errors.push({
          param: "manager",
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
    async getCompanies() {
      return companiesApi.getAll().then(res => {
        this.companies = [null].concat(res);
      });
    },
    getPaymentType() {
      constantsApi.getAll().then(res => {
        this.paymentType = res.paymentType;
      });
    },
    async getManagers() {
      return usersApi
        .getAll({
          filter: { and: [{ key: "role", value: "manager", opt: "eq" }] },
          pagination: 0
        })
        .then(res => {
          this.managers = res.docs;
        });
    },
    async fetchJobDetails() {
      return jobsApi
        .get({ companyId: this.companyId, id: this.jobId })
        .then(res => {
          this.model = res;
          this.model.startDate = this.getISODateString(res.startDate);
          this.model.endDate = this.getISODateString(res.endDate);
          this.model.company = this.companies.find(
            company => company && company._id === res.company[0]._id
          );
          this.model.manager = this.managers.find(
            manager => manager && manager._id === res.manager[0]._id
          );
        });
    },
    fetchJobOffers() {
      jobOffersApi
        .getAllByJobId({
          companyId: this.companyId,
          jobId: this.jobId,
          pagination: 0
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
    onEditJob() {
      this.editJob = !this.editJob;
      if (!this.editJob) {
        this.updateJob();
      }
    },
    goToOfferDetails(id) {
      this.$router.push({
        name: "admin-offer-details",
        params: {
          companyId: this.companyId,
          offerId: id
        }
      });
    },
    updateJob() {
      if (this.validate()) {
        this.model.companyId = this.model.company?._id;
        this.model.managerId = this.model.manager?._id;
        this.model.professionId = this.model.profession?._id;
        if (!this.model.endDate) {
          delete this.model.endDate;
        }
        if (!this.model.image) {
          delete this.model.image;
        }

        jobsApi
          .update(this.model)
          .then(res => {
            this.$store.dispatch("updateShowSuccessModal", true);
            this.$store.dispatch("updateSuccessModalContent", {
              title: this.$t("page_job_detail.modal.update_success.title"),
              subTitle: this.$t(
                "page_job_detail.modal.update_success.sub_title"
              ),
              button: this.$t("page_job_detail.modal.update_success.continue")
            });
            this.editJob = false;
          })
          .catch(error => {
            this.errors = error.response.data.errors.msg;

            this.$store.dispatch("updateShowErrorModal", true);
            this.$store.dispatch("updateErrorModalContent", {
              title: this.$t("page_job_detail.modal.update_error.title"),
              button: this.$t("page_job_detail.modal.update_error.continue")
            });
          });
      } else {
        this.editJob = true;
      }
    },
    showDeleteOfferModal(offerId) {
      this.$store.dispatch("updateShowErrorModal", true);
      this.$store.dispatch("updateErrorModalContent", {
        title: this.$t("page_job_detail.modal.confirm_delete.title"),
        subTitle: this.$t("page_job_detail.modal.confirm_delete.sub_title"),
        button: this.$t("page_job_detail.modal.confirm_delete.continue"),
        onButtonClick: () => {
          this.deleteJobOffer();
        }
      });
      this.selectedJobOfferId = offerId;
    },
    deleteJobOffer() {
      jobOffersApi
        .delete({
          companyId: this.companyId,
          _id: this.selectedJobOfferId
        })
        .then(res => {
          this.$store.dispatch("updateShowErrorModal", false);
          this.fetchJobOffers();
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
    },
    showDeleteAttachmentModal(attachmentId) {
      this.$store.dispatch("updateShowErrorModal", true);
      this.$store.dispatch("updateErrorModalContent", {
        title: this.$t("page_job_detail.modal.confirm_delete.title"),
        subTitle: this.$t(
          "page_job_detail.modal.confirm_delete_attach.sub_title"
        ),
        button: this.$t("page_job_detail.modal.confirm_delete_attach.continue"),
        onButtonClick: () => {
          this.deleteAttachment();
        }
      });
      this.selectedAttachmentId = attachmentId;
    },
    deleteAttachment() {
      jobsApi
        .deleteAttachment({
          companyId: this.companyId,
          _id: this.jobId,
          attachmentId: this.selectedAttachmentId
        })
        .then(res => {
          this.$store.dispatch("updateShowErrorModal", false);
          this.fetchJobDetails();
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
.form-select {
  margin-top: -8px;
}
</style>
