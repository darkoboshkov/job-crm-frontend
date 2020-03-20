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
                  <span
                    ><a :href="'mailto:' + user.email">{{
                      user.email
                    }}</a></span
                  >
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
                <div>
                  <div class="float-right">
                    <button
                      class="btn btn-blue"
                      @click.prevent="
                        $router.push({
                          name: 'manager-jobs-choose-candidate',
                          params: {
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
                    <span class="mr-5">{{ attachment.size | fileSizeFormatter }} </span>
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
    viewFile(attachment) {
      //
    },
    downloadFile(attachment) {
      //
    },
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
    onEditJob() {
      this.editJob = !this.editJob;
      if (!this.editJob) {
        this.updateJob();
      }
    },
    goToOfferDetails(id) {
      this.$router.push({
        name: "manager-offer-details",
        params: {
          companyId: this.companyId,
          offerId: id
        }
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
