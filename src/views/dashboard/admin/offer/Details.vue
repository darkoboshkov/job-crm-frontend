<template>
  <div id="page_job_offer_details" class="dashboard-content">
    <a
      href="javascript:void(0)"
      class="back mb-3"
      @click.prevent="$router.go(-1)"
    >
      <i class="hiway-crm-icon icon-angle-left mr-2" />
      <span>{{ $t("common.back") }}</span>
    </a>
    <h1 class="title">
      {{ $t("page_offer_detail.title") }}
    </h1>
    <div class="mt-5 row">
      <div class="matching-list col-6">
        <div class="card matching-item">
          <div class="up d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <img
                v-if="company.logo"
                :src="APP_URL + company.logo"
                class="rounded-circle border mr-2"
                style="width:65px"
              />
              <div
                v-else
                class="avatar-placeholder mr-2"
                style="width:65px;height:65px;"
              ></div>
              <div>
                <div>
                  <strong>{{ job.title }}</strong>
                </div>
                <div>{{ company.name }}</div>
              </div>
            </div>
            <div class="icon-group">
              <div class="icon">
                <img src="@/assets/image/phone.svg" />
              </div>
              <div class="icon">
                <img src="@/assets/image/message.svg" />
              </div>
            </div>
          </div>
          <div class="down">
            <ul>
              <li>Detail 1</li>
              <li>Detail 2</li>
              <li>Detail 3</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-1 d-flex justify-content-center">
        <img src="@/assets/image/matching.svg" />
      </div>

      <div class="matching-list col-5">
        <div class="card matching-item">
          <div class="up d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <img
                v-if="worker.image"
                :src="APP_URL + worker.image"
                class="rounded-circle border mr-2"
                style="width:65px"
              />
              <div
                v-else
                class="avatar-placeholder mr-2"
                style="width:65px;height:65px;"
              ></div>
              <div>
                <div>
                  <strong>{{ worker.firstName }} {{ worker.lastName }}</strong>
                </div>
                <div>{{ worker.city }}, {{ worker.country }}</div>
              </div>
            </div>
            <div class="icon-group">
              <div class="icon">
                <img src="@/assets/image/phone.svg" />
              </div>
              <div class="icon">
                <img src="@/assets/image/message.svg" />
              </div>
            </div>
          </div>
          <div class="down">
            <ul>
              <li>Detail 1</li>
              <li>Detail 2</li>
              <li>Detail 3</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-header d-flex justify-content-between">
        <span>{{ $t("page_offer_detail.status_actions") }}</span>
        <span class="d-flex align-items-center contract-status">
          <i
            class="hiway-crm-icon icon-dot color-yellow mr-2"
            style="font-size: 0.3em;"
          ></i>
          {{ $t("page_offer_detail.offer_states." + model.status) }}
        </span>
      </div>
      <div class="card-body d-flex justify-content-between">
        <div>
          <div class="d-flex align-items-center mb-3">
            <img
              v-if="manager.image"
              :src="APP_URL + manager.image"
              class="rounded-circle border mr-4"
              style="width:45px"
            />
            <div
              v-else
              class="avatar-placeholder mr-2"
              style="width:45px;height:45px;"
            ></div>
            <div>
              <i
                class="hiway-crm-icon icon-dot color-yellow mr-2"
                style="font-size: 0.3em;"
              ></i>
              {{ managerState }}
            </div>
          </div>
          <div class="d-flex align-items-center">
            <img
              v-if="worker.image"
              :src="APP_URL + worker.image"
              class="rounded-circle border mr-4"
              style="width:45px"
            />
            <div
              v-else
              class="avatar-placeholder mr-2"
              style="width:45px;height:45px;"
            ></div>
            <div>
              <i
                class="hiway-crm-icon icon-dot color-blue mr-2"
                style="font-size: 0.3em;"
              ></i>
              {{ workerState }}
            </div>
          </div>
        </div>
        <div>
          <button
            v-if="!edit"
            class="btn btn-red mr-2"
            @click="adjust"
            style="min-width:160px;"
          >
            Adjust
          </button>

          <button
            v-if="edit"
            class="btn btn-blue ml-2"
            @click="lockSignSend"
            style="min-width:160px;"
          >
            Lock, Sign and Send
          </button>

          <button
            class="btn btn-secondary ml-2"
            @click="exportContract"
            style="min-width:160px;"
          >
            Export Contract
          </button>

          <button
            class="btn btn-secondary ml-2"
            @click="openViewOffer = !openViewOffer"
            :disabled="edit"
            style="min-width:160px;"
          >
            View Contract
          </button>
        </div>
      </div>
    </div>

    <div class="card mt-4 contract-specifications">
      <div class="card-header">
        Specifications
      </div>
      <div class="card-body">
        <div class="item">
          <div>CAO</div>
          <div v-if="edit">
            <b-form-select v-model="model.collectiveAgreement">
              <option
                v-for="caoOption in caoOptions"
                :value="caoOption._id"
                :key="caoOption._id"
                >{{ caoOption.name }}</option
              >
            </b-form-select>
          </div>
          <div v-else class="text-right">{{ selectedCaoOption.name }}</div>
        </div>
        <div class="item">
          <div>Hourly Wage</div>
          <div v-if="edit">
            <b-form-input v-model="model.hourlyWage" />
          </div>
          <div v-else class="text-right">
            {{ model.hourlyWage }}
          </div>
        </div>
        <div class="item">
          <div>Pay Rate</div>
          <div v-if="edit">
            <b-form-input v-model="model.payRate" />
          </div>
          <div v-else class="text-right">
            {{ model.payRate }}
          </div>
        </div>
        <div class="item">
          <div>Travel Expenses</div>
          <div v-if="edit">
            <b-form-input v-model="model.travelExpenses" />
          </div>
          <div v-else class="text-right">
            {{ model.travelExpenses }}
          </div>
        </div>
        <div class="item">
          <div>Travel Hours</div>
          <div v-if="edit">
            <b-form-input v-model="model.travelHours" />
          </div>
          <div v-else class="text-right">
            {{ model.travelHours }}
          </div>
        </div>
        <div class="item">
          <div>Other Expenses</div>
          <div v-if="edit">
            <b-form-input v-model="model.otherExpenses" />
          </div>
          <div v-else class="text-right">
            {{ model.otherExpenses }}
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-4 contract-files">
      <div class="card-header">
        <span>Files</span>
        <input
          type="file"
          id="attachment"
          name="attachment"
          accept=".doc,.docx,.pdf"
          @change="onFileChange"
        />
        <label
          for="attachment"
          class="btn btn-blue ml-2"
          style="min-width:160px;"
        >
          Upload
          <i class="hiway-crm-icon icon-upload"></i>
        </label>
      </div>
      <div class="card-body">
        <div class="item" v-for="(attachment, idx) in attachments" :key="idx">
          <div>
            <img
              :src="
                attachment.userId === worker._id
                  ? APP_URL + worker.image
                  : attachment.userId === manager._id
                  ? APP_URL + manager.image
                  : ''
              "
              class="rounded-circle border mr-4"
              style="width:45px"
            />
            {{ attachment.name }}
          </div>
          <div>
            <span class="mr-5"
              >{{ dateFormatter(new Date(attachment.uploadedAt)) }}
              {{ timeFormatter(new Date(attachment.uploadedAt)) }}</span
            >
            <span class="mr-5">{{ attachment.size }} B</span>
            <span class="mr-4"
              ><i class="hiway-crm-icon icon-more-vertical"></i
            ></span>
            <span><i class="hiway-crm-icon icon-bin" @click="confirmDelete(attachment)"></i></span>
          </div>
        </div>
      </div>
    </div>
    <view-offer
      :open="openViewOffer"
      :offer="model"
      :company="company"
      :manager="manager"
      :worker="worker"
    ></view-offer>
  </div>
</template>

<script>
import jobOfferApi from "@/services/api/joboffers";
import ViewJobOffer from "./ViewJobOffer";
import dateFormatter from "@/helpers/DateFormatter.js";
import timeFormatter from "@/helpers/TimeFormatter.js";
import { APP_URL } from "@/constants";

export default {
  name: "Details",
  components: {
    "view-offer": ViewJobOffer
  },
  computed: {
    edit() {
      return this.model.status === "open";
    },
    selectedCaoOption() {
      return (
        this.caoOptions.find(
          option => option._id === this.model.collectiveAgreement
        ) || {}
      );
    },
    managerState() {
      let managerState = "";

      switch (this.model.status) {
        case "open":
          managerState = "pending";
          break;
        case "pending-worker":
          managerState = "signed";
          break;
        case "active":
          managerState = "signed";
          break;
        case "completed":
          managerState = "completed";
          break;
      }

      return managerState;
    },
    workerState() {
      let workerState = "";
      switch (this.model.status) {
        case "open":
          workerState = "not able to see";
          break;
        case "pending-worker":
          workerState = "pending";
          break;
        case "active":
          workerState = "signed";
          break;
        case "completed":
          workerState = "completed";
          break;
      }

      return workerState;
    }
  },
  data() {
    return {
      APP_URL,
      companyId: this.$route.params.companyId,
      offerId: this.$route.params.offerId,

      model: {},
      company: {},
      job: {},
      manager: {},
      worker: {},
      openViewOffer: false,
      caoOptions: [],
      imageData: {},
      attachments: []
    };
  },
  mounted() {
    this.getOfferDetails();
    this.getCaoOptions();
  },
  methods: {
    dateFormatter,
    timeFormatter,
    getCaoOptions() {
      return jobOfferApi
        .getCaoOptions({
          companyId: this.companyId
        })
        .then(res => {
          this.caoOptions = res;
        });
    },
    lockSignSend() {
      return jobOfferApi
        .lock(this.model)
        .then(res => {
          this.model = res;
        })
        .catch(e => {
          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_detail_offer.modal.lock_fail.title"),
            subTitle: this.$t("page_detail_offer.modal.lock_fail.sub_title"),
            button: this.$t("page_detail_offer.modal.lock_fail.continue")
          });
        });
    },
    adjust() {
      return jobOfferApi
        .adjust(this.model)
        .then(res => {
          this.model = res;
        })
        .catch(e => {
          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_detail_offer.modal.adjust_fail.title"),
            subTitle: this.$t("page_detail_offer.modal.adjust_fail.sub_title"),
            button: this.$t("page_detail_offer.modal.adjust_fail.continue")
          });
        });
    },
    update() {
      return jobOfferApi
        .update(this.model)
        .then(res => {
          this.model = res;
          this.company = res.company[0];
          this.job = res.job[0];
          this.worker = res.worker[0];
          this.company = res.company[0];
          this.manager = res.manager[0];
          this.attachments = res.attachments;
        })
        .catch(e => {
          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_detail_offer.modal.update_fail.title"),
            subTitle: this.$t("page_detail_offer.modal.update_fail.sub_title"),
            button: this.$t("page_detail_offer.modal.update_fail.continue")
          });
        });
    },
    exportContract() {},
    getOfferDetails() {
      const { companyId, offerId } = this;

      return jobOfferApi
        .get({ companyId, offerId })
        .then(res => {
          this.model = res;
          this.company = res.company[0];
          this.job = res.job[0];
          this.worker = res.worker[0];
          this.company = res.company[0];
          this.manager = res.manager[0];
          this.attachments = res.attachments;
          this.contractSigned =
            res.contractSigned?.filter(contract => {
              return contract.userId === this.$store.state.user._id;
            })[0] || {};
          if (this.contractSigned) {
            this.model.autograph = this.contractSigned.autograph;
          }
          delete this.model.contractSigned;
        })
        .catch(e => {
          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_detail_offer.modal.get_fail.title"),
            subTitle: this.$t("page_detail_offer.modal.get_fail.sub_title"),
            button: this.$t("page_detail_offer.modal.get_fail.continue")
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

      jobOfferApi
        .upload(this.companyId, this.offerId, data)
        .then(response => {
          this.imageData.path = response.path;

          jobOfferApi
            .addAttachment(
              Object.assign(
                {
                  companyId: this.companyId,
                  _id: this.offerId
                },
                this.imageData
              )
            )
            .then(res => {
              this.$store.dispatch("updateLoading", false);

              this.getOfferDetails();
            })
            .catch(e => {
              this.$store.dispatch("updateShowErrorModal", true);
              this.$store.dispatch("updateErrorModalContent", {
                title: this.$t("page_detail_offer.modal.attach_fail.title"),
                subTitle: this.$t(
                  "page_detail_offer.modal.attach_fail.sub_title"
                ),
                button: this.$t("page_detail_offer.modal.attach_fail.continue")
              });
            });
        })
        .catch(e => {
          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_detail_offer.modal.upload_fail.title"),
            subTitle: this.$t("page_detail_offer.modal.upload_fail.sub_title"),
            button: this.$t("page_detail_offer.modal.upload_fail.continue")
          });
        });
    },
    confirmDelete(attachment) {
      this.$store.dispatch("updateShowSuccessModal", true);
      this.$store.dispatch("updateSuccessModalContent", {
        // title: this.$t("page_detail_offer.modal.confirm_delete.title"),
        // subTitle: this.$t("page_detail_offer.modal.confirm_delete.sub_title"),
        // button: this.$t("page_detail_offer.modal.confirm_delete.continue"),

        title: this.$t("Are you sure you want to delete?"),
        subTitle: this.$t("This file will be removed permanently."),
        button: this.$t("Delete"),
        onButtonClick: () => {
          this.deleteAttachment(attachment);
        }
      });
    },
    deleteAttachment(attachment) {
      jobOfferApi
        .deleteAttachment(
            {
              companyId: this.companyId,
              _id: this.offerId,
              attachmentId: attachment._id
            }
        )
        .then(res => {
          this.$store.dispatch("updateLoading", false);

          this.model = res;

          this.$store.dispatch("updateShowSuccessModal", true);
          this.$store.dispatch("updateSuccessModalContent", {
            // title: this.$t("page_detail_offer.modal.delete_success.title"),
            // subTitle: this.$t(
            //   "page_detail_offer.modal.delete_success.sub_title"
            // ),
            // button: this.$t("page_detail_offer.modal.delete_success.continue"),

            title: this.$t("Success"),
            subTitle: this.$t("The attachment is successfully removed!"),
            button: this.$t("Continue"),
            onButtonClick: () => { this.getOfferDetails(); }
          });
        });
    }
  }
};
</script>

<style scoped></style>
