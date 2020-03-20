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
                <b-input
                  v-if="editJob"
                  v-model="model.title"
                  class="fullName"
                />
                <h2 v-else class="fullName">{{ model.title }}</h2>
              </div>
              <h3 class="profession mt-3">
                {{ model.company && model.company.name }}
              </h3>
            </div>
          </div>
          <div class="job-detail-edit">
            <a href="javascript:void(0);" @click.prevent="onEditJob">
              {{
                editJob
                  ? $t("page_job_detail.save")
                  : $t("page_job_detail.edit")
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
                  <div class="d-flex align-items-center">
                    <span class="flex-1">
                      {{ $t("page_job_detail.form.company") }}
                    </span>
                    <div>
                      <b-form-select
                        v-if="editJob"
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
                      <span v-else>{{
                        model.company && model.company.name
                      }}</span>
                    </div>
                  </div>
                </li>

                <li>
                  <div class="d-flex align-items-center">
                    <span class="flex-1">
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
                    </div>
                  </div>
                </li>

                <li>
                  <div class="d-flex align-items-center">
                    <span class="flex-1">
                      {{ $t("page_job_detail.form.wage") }}
                    </span>
                    <div class="pull-right">
                      <b-input v-if="editJob" v-model="model.wage" />
                      <div v-else>
                        {{ model.wage }}
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div class="d-flex align-items-center">
                    <span class="flex-1">
                      {{ $t("page_job_detail.form.start_date") }}
                    </span>
                    <div class="pull-right">
                      <b-input
                        type="date"
                        v-if="editJob"
                        v-model="model.startDate"
                      />
                      <div v-else>
                        {{ model.startDate | dateFormatter }}
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div class="d-flex align-items-center">
                    <span class="flex-1">
                      {{ $t("page_job_detail.form.end_date") }}
                    </span>
                    <div>
                      <b-input
                        type="date"
                        v-if="editJob"
                        v-model="model.endDate"
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
              <div class="d-flex">
                <h5 class="m-0 flex-1">
                  {{ $t("page_job_detail.job_offers") }}
                </h5>
                <div>
                  <div class="float-right">
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
                </div>
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
                  <div>
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
          <b-card>
            <template v-slot:header>
              <div class="d-flex align-items-center">
                <h5 class="m-0 flex-1">{{ $t("page_job_detail.files") }}</h5>
                <input
                  type="file"
                  id="attachment"
                  class="d-none"
                  name="attachment"
                  accept=".doc,.docx,.pdf"
                  :disabled="!editJob"
                  @change="onFileChange"
                />
                <label
                  for="attachment"
                  class="btn btn-blue m-0"
                  style="min-width:160px;"
                  :style="{ cursor: editJob ? 'pointer' : 'not-allowed' }"
                >
                  {{ $t("page_job_detail.button.upload") }}
                  <i class="hiway-crm-icon icon-upload"></i>
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
                    <span class="mr-5"
                      >{{ attachment.uploadedAt | dateTimeFormatter }}
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
  </div>
</template>

<script>
import jobsApi from "@/services/api/jobs";
import joboffersApi from "@/services/api/joboffers";
import companiesApi from "@/services/api/companies";
import usersApi from "@/services/api/users";
import errorReader from "@/helpers/ErrorReader";

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
        wage: "",
        status: "",
        skillIds: [],
        description: "",
        questions: [],
        image: null,
        startDate: null,
        endDate: null,
        company: null,
        manager: null,
        profession: null,
        attachments: []
      },
      companies: [],
      managers: [],
      state: [],
      error: "",
      companyId: "",
      jobId: "",
      jobOffers: [],
      imageData: {},
      selectedJobOfferId: null,
      selectedAttachmentId: null
    };
  },
  mounted() {
    this.companyId = this.$route.params.companyId;
    this.jobId = this.$route.params.jobId;
    this.getCompanies().then(() => {
      this.getManagers().then(() => {
        this.fetchJobDetails();
      });
    });
    this.fetchJobOffers();
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
    viewFile(attachment) {
      console.log(attachment);
    },
    downloadFile(attachment) {
      console.log(attachment);
    },
    getCompanies() {
      return companiesApi.getAll().then(res => {
        this.companies = [null].concat(res);
      });
    },
    getManagers() {
      return usersApi
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
    fetchJobDetails() {
      jobsApi.get({ companyId: this.companyId, id: this.jobId }).then(res => {
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
      this.model.companyId = this.model.company?._id;
      this.model.managerId = this.model.manager?._id;
      this.model.professionId = this.model.profession?._id;
      if (!this.model.endDate) {
        delete this.model.endDate;
      }
      if (!this.model.image) {
        delete this.model.image;
      }
      delete this.model.skillIds; // todo: support later

      jobsApi
        .update(this.model)
        .then(res => {
          this.$store.dispatch("updateShowSuccessModal", true);
          this.$store.dispatch("updateSuccessModalContent", {
            title: this.$t("page_job_detail.modal.update_success.title"),
            subTitle: this.$t("page_job_detail.modal.update_success.sub_title"),
            button: this.$t("page_job_detail.modal.update_success.continue")
          });
        })
        .catch(err => {
          let read = errorReader(err);
          this.error = read.param + " is " + read.msg.toLowerCase();

          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_job_detail.modal.update_error.title"),
            subTitle: this.error,
            button: this.$t("page_job_detail.modal.update_error.continue")
          });
        });
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
      return joboffersApi
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

            this.model.attachments = res.attachments;
          });
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
      return jobsApi
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
