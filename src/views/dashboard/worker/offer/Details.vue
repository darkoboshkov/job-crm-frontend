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
              <div class="avatar-image mr-2" style="width:65px;height:65px;">
                <img
                  v-if="company.logo"
                  :src="company.logo | appUrlFormatter"
                />
              </div>
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
              <li>Start Date: {{ model.startDate | dateFormatter }}</li>
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
              <div class="avatar-image mr-2" style="width:65px;height:65px;">
                <img
                  v-if="worker.image"
                  :src="worker.image | appUrlFormatter"
                />
              </div>
              <div>
                <div>
                  <strong>{{ worker | fullNameFormatter }}</strong>
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
              <li>Hourly Wage: {{ model.hourlyWage }}</li>
              <li>40 Hours per week</li>
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
          />
          {{
            model.status
              ? $t("page_offer_detail.offer_states." + model.status)
              : ""
          }}
        </span>
      </div>
      <div class="card-body d-flex justify-content-between">
        <div>
          <div class="d-flex align-items-center mb-3">
            <div class="avatar-image mr-2">
              <img
                v-if="manager.image"
                :src="manager.image | appUrlFormatter"
              />
            </div>
            <div>
              <i
                class="hiway-crm-icon icon-dot color-yellow mr-2"
                style="font-size: 0.3em;"
              />
              {{ managerState }}
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="avatar-image mr-2">
              <img v-if="worker.image" :src="worker.image | appUrlFormatter" />
            </div>
            <div>
              <i
                class="hiway-crm-icon icon-dot color-blue mr-2"
                style="font-size: 0.3em;"
              />
              {{ workerState }}
            </div>
          </div>
        </div>
        <div>
          <button
            class="btn mr-2"
            :class="signed ? 'btn-secondary' : 'btn-red'"
            @click="decline"
            style="min-width:160px;"
            :disabled="signed"
          >
            Decline
          </button>

          <button
            class="btn ml-2"
            :class="signed ? 'btn-secondary' : 'btn-blue'"
            @click="openSignContractModal"
            style="min-width:160px;"
            :disabled="signed"
          >
            Sign
          </button>

          <button
            class="btn ml-2"
            :class="signed ? 'btn-red' : 'btn-secondary'"
            @click="exportContract"
            style="min-width:160px;"
            :disabled="!signed"
          >
            Export Contract
          </button>

          <button
            class="btn ml-2"
            :class="signed ? 'btn-blue' : 'btn-secondary'"
            @click="openViewOffer = !openViewOffer"
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
          <i class="hiway-crm-icon icon-upload" />
        </label>
      </div>
      <div class="card-body">
        <div class="item" v-for="(attachment, idx) in attachments" :key="idx">
          <div>
            <img
              :src="
                (attachment.userId === worker._id
                  ? worker.image
                  : attachment.userId === manager._id
                  ? manager.image
                  : '') | dateFormatter
              "
              class="rounded-circle border mr-4"
              style="width:45px"
            />
            {{ attachment.name }}
          </div>
          <div>
            <span class="mr-5"
              >{{ attachment.uploadedAt | dateFormatter }}
              {{ attachment.uploadedAt | timeFormatter }}</span
            >
            <span class="mr-5">{{ attachment.size }} B</span>
            <span class="mr-4"
              ><i class="hiway-crm-icon icon-more-vertical" />
            </span>
            <span
              ><i
                v-if="attachment.userId === user._id"
                class="hiway-crm-icon icon-bin"
                @click="confirmDelete(attachment)"
            /></span>
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
    />

    <b-modal
      ref="modal-sign-contract"
      :hide-footer="true"
      :hide-header="true"
      centered
      modal-class="modal-sign-contract"
    >
      <div class="text-center">
        <h1 class="color-red">Sign Contract</h1>
      </div>
      <div class="text-center mb-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra
        libero vitae sapien euismod, quis vestibulum ligula mollis. Sed luctus,
        nisi at malesuada lacinia, diam diam consequat augue, a efficitur risus
        lorem in neque.
      </div>
      <div class="mb-5">
        <div class="sign-item">
          <div>
            Payment interval
          </div>
          <div>
            <b-form-select v-model="model.paymentInterval">
              <option
                v-for="option in paymentIntervalOptions"
                :value="option.value"
                :key="option.value"
                >{{ option.label }}</option
              >
            </b-form-select>
          </div>
        </div>
        <div class="sign-item">
          <div>
            Discount on taxes
          </div>
          <div>
            <b-form-select v-model="model.discountOnTaxes">
              <option
                v-for="option in discountOnTaxesOptions"
                :value="option.value"
                :key="option.value"
                >{{ option.label }}</option
              >
            </b-form-select>
          </div>
        </div>
        <div class="sign-item">
          <div>
            Worker earlier as Flexworker
          </div>
          <div>
            <b-form-select v-model="model.workedEarlierAsFlexWorker">
              <option
                v-for="option in workedEarlierAsFlexWorkerOptions"
                :value="option.value"
                :key="option.value"
                >{{ option.label }}</option
              >
            </b-form-select>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <b-form-checkbox
          v-model="agreement"
          name="checkbox-1"
          value="accepted"
          unchecked-value="not_accepted"
        >
          I hereby acknowledge and agree that I’ve read and agreed to the terms
          in this contract. I understand that by clicking on the “Sign” button
          below I digitally sign and bind myself to this contract.
        </b-form-checkbox>
      </div>
      <div class="d-flex justify-content-around">
        <button
          class="btn btn-red"
          @click="openViewOffer = !openViewOffer"
          style="min-width:160px;"
        >
          View Contract
        </button>

        <button class="btn btn-blue" @click="sign" style="min-width:160px;">
          Sign Contract
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import jobOfferApi from "@/services/api/joboffers";
import ViewJobOffer from "./ViewJobOffer";

export default {
  name: "Details",
  components: {
    "view-offer": ViewJobOffer
  },
  computed: {
    edit() {
      return this.model.status === "pending-worker";
    },
    user() {
      return this.$store.state.user;
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
    },
    signed() {
      return this.model.status === "active";
    }
  },
  data() {
    return {
      companyId: this.$store.state.user.companyId,
      offerId: this.$route.params.offerId,

      model: {},
      company: {},
      job: {},
      manager: {},
      worker: {},
      openViewOffer: false,
      caoOptions: [],
      imageData: {},
      attachments: [],
      agreement: "not_accepted",
      paymentIntervalOptions: [
        {
          label: "Week",
          value: "each-week"
        },
        {
          label: "4 weeks",
          value: "each-4-weeks"
        },
        {
          label: "Month",
          value: "each-month"
        }
      ],
      discountOnTaxesOptions: [
        {
          label: "Yes",
          value: "yes"
        },
        {
          label: "No",
          value: "no"
        }
      ],
      workedEarlierAsFlexWorkerOptions: [
        {
          label: "No",
          value: "no"
        },
        {
          label: "Yes, in construction",
          value: "in-construction"
        },
        {
          label: "Yes, not in construction",
          value: "not-in-construction"
        }
      ]
    };
  },
  mounted() {
    this.getOfferDetails();
    this.getCaoOptions();
  },
  methods: {
    getCaoOptions() {
      return jobOfferApi
        .getCaoOptions({
          companyId: this.companyId
        })
        .then(res => {
          this.caoOptions = res;
        });
    },
    openSignContractModal() {
      this.$refs["modal-sign-contract"].show();
    },
    sign() {
      if (this.agreement !== "accepted") {
        this.$store.dispatch("updateShowErrorModal", true);
        this.$store.dispatch("updateErrorModalContent", {
          title: this.$t("page_offer_detail.modal.accept_fail.title"),
          subTitle: this.$t("page_offer_detail.modal.accept_fail.sub_title"),
          button: this.$t("page_offer_detail.modal.accept_fail.continue")
        });
        return;
      }
      return jobOfferApi.sign(this.model).then(res => {
        this.model = res;
        this.$refs["modal-sign-contract"].hide();
        this.$store.dispatch("updateShowSuccessModal", true);
        this.$store
          .dispatch("updateSuccessModalContent", {
            title: this.$t("page_offer_detail.modal.sign_success.title"),
            subTitle: this.$t("page_offer_detail.modal.sign_success.sub_title"),
            button: this.$t("page_offer_detail.modal.sign_success.continue")
          })
          .catch(e => {
            this.$store.dispatch("updateShowErrorModal", true);
            this.$store.dispatch("updateErrorModalContent", {
              title: this.$t("page_offer_detail.modal.sign_fail.title"),
              subTitle: this.$t("page_offer_detail.modal.sign_fail.sub_title"),
              button: this.$t("page_offer_detail.modal.sign_fail.continue")
            });
          });
      });
    },
    decline() {
      return jobOfferApi
        .decline(this.model)
        .then(res => {
          this.model = res;
        })
        .catch(e => {
          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_offer_detail.modal.decline_fail.title"),
            subTitle: this.$t("page_offer_detail.modal.decline_fail.sub_title"),
            button: this.$t("page_offer_detail.modal.decline_fail.continue")
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
          this.manager = res.manager[0];
          this.attachments = res.attachments;
        })
        .catch(e => {
          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_offer_detail.modal.update_fail.title"),
            subTitle: this.$t("page_offer_detail.modal.update_fail.sub_title"),
            button: this.$t("page_offer_detail.modal.update_fail.continue")
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
          this.manager = res.manager[0];
          this.attachments = res.attachments;
        })
        .catch(e => {
          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_offer_detail.modal.get_fail.title"),
            subTitle: this.$t("page_offer_detail.modal.get_fail.sub_title"),
            button: this.$t("page_offer_detail.modal.get_fail.continue")
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

      jobOfferApi.upload(data).then(response => {
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
              title: this.$t("page_offer_detail.modal.attach_fail.title"),
              subTitle: this.$t(
                "page_offer_detail.modal.attach_fail.sub_title"
              ),
              button: this.$t("page_offer_detail.modal.attach_fail.continue")
            });
          })
          .catch(e => {
            this.$store.dispatch("updateShowErrorModal", true);
            this.$store.dispatch("updateErrorModalContent", {
              title: this.$t("page_offer_detail.modal.upload_fail.title"),
              subTitle: this.$t(
                "page_offer_detail.modal.upload_fail.sub_title"
              ),
              button: this.$t("page_offer_detail.modal.upload_fail.continue")
            });
          });
      });
    },
    confirmDelete(attachment) {
      this.$store.dispatch("updateShowSuccessModal", true);
      this.$store.dispatch("updateSuccessModalContent", {
        title: this.$t("page_offer_detail.modal.confirm_delete.title"),
        subTitle: this.$t("page_offer_detail.modal.confirm_delete.sub_title"),
        button: this.$t("page_offer_detail.modal.confirm_delete.continue"),
        onButtonClick: () => {
          this.deleteAttachment(attachment);
        }
      });
    },
    deleteAttachment(attachment) {
      jobOfferApi
        .deleteAttachment({
          companyId: this.companyId,
          _id: this.offerId,
          attachmentId: attachment._id
        })
        .then(res => {
          this.$store.dispatch("updateLoading", false);

          this.$store.dispatch("updateShowSuccessModal", true);
          this.$store.dispatch("updateSuccessModalContent", {
            title: this.$t("page_offer_detail.modal.delete_success.title"),
            subTitle: this.$t(
              "page_offer_detail.modal.delete_success.sub_title"
            ),
            button: this.$t("page_offer_detail.modal.delete_success.continue"),
            onButtonClick: () => {
              this.getOfferDetails();
            }
          });
        });
    }
  },
  watch: {
    "model.status"(value) {
      if (value === "open") {
        this.$router.replace("/");
      }
    }
  }
};
</script>

<style scoped></style>
