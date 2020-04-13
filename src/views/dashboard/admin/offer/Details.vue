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
    <h1 class="title mt-5">
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
              <li>
                {{ $t("page_offer_detail.start_date") }}:
                {{ model.startDate | dateFormatter }}
              </li>
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
              <li>
                {{ $t("page_offer_detail.hourly_wage") }}:
                {{ model.hourlyWage }}
              </li>
              <li>
                {{ model.hoursPerWeek }}
                {{ $t("page_offer_detail.hours_per_week") }}
              </li>
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
            v-if="model.status === 'open'"
            class="hiway-crm-icon icon-dot mr-2 color-yellow"
            style="font-size: 0.3em;"
          />
          <i
            v-else-if="model.status === 'pending-worker'"
            class="hiway-crm-icon icon-dot mr-2 color-blue"
            style="font-size: 0.3em;"
          />
          <i
            v-else-if="model.status === 'active'"
            class="hiway-crm-icon icon-dot mr-2 color-green"
            style="font-size: 0.3em;"
          />
          <template v-if="model.status">
            {{ $t("page_offer_detail.offer_states." + model.status) }}
          </template>
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
                class="hiway-crm-icon icon-dot mr-2"
                :class="managerState.color"
                style="font-size: 0.3em;"
              />
              {{ managerState.text }}
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="avatar-image mr-2">
              <img v-if="worker.image" :src="worker.image | appUrlFormatter" />
            </div>
            <div>
              <i
                class="hiway-crm-icon icon-dot mr-2"
                :class="workerState.color"
                style="font-size: 0.3em;"
              />
              {{ workerState.text }}
            </div>
          </div>
        </div>
        <div>
          <button
            v-if="!edit"
            class="btn mr-2"
            :class="signed ? 'btn-secondary' : 'btn-red'"
            @click="adjust"
            :disabled="signed"
            style="min-width:160px;"
          >
            {{ $t("page_offer_detail.button.adjust") }}
          </button>

          <button
            v-if="edit"
            class="btn btn-blue ml-2"
            @click="openSignContractModal"
            style="min-width:160px;"
          >
            {{ $t("page_offer_detail.button.lock") }}
          </button>

          <button
            class="btn ml-2"
            :class="signed ? 'btn-red' : 'btn-secondary'"
            @click="exportContract"
            style="min-width:160px;"
            :disabled="!signed"
          >
            {{ $t("page_offer_detail.button.export_contract") }}
          </button>

          <button
            class="btn ml-2"
            :class="signed ? 'btn-blue' : 'btn-secondary'"
            @click="viewContract"
            :disabled="edit"
            style="min-width:160px;"
          >
            {{ $t("page_offer_detail.button.view_contract") }}
          </button>
        </div>
      </div>
    </div>

    <div class="card mt-4 contract-specifications">
      <div class="card-header">
        {{ $t("page_offer_detail.specifications") }}
      </div>
      <div class="card-body">
        <div class="item">
          <div>CAO</div>
          <div v-if="edit">
            <b-form-select
              class="normal-size"
              v-model="model.collectiveAgreement"
            >
              <option
                v-for="caoOption in caoOptions"
                :value="caoOption._id"
                :key="caoOption._id"
                >{{ caoOption.name }}
              </option>
            </b-form-select>
          </div>
          <div v-else class="text-right">{{ selectedCaoOption.name }}</div>
        </div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.wage") }}</div>
          <div v-if="edit">
            <b-form-input type="number" v-model="model.wage" />
          </div>
          <div v-else class="text-right">
            {{ model.wage }}
          </div>
        </div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.hourly_wage") }}</div>
          <div v-if="edit">
            <b-form-input type="number" v-model="model.hourlyWage" />
          </div>
          <div v-else class="text-right">
            {{ model.hourlyWage }}
          </div>
        </div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.pay_rate") }}</div>
          <div v-if="edit">
            <b-form-input type="number" v-model="model.payRate" />
          </div>
          <div v-else class="text-right">
            {{ model.payRate }}
          </div>
        </div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.hours_per_week") }}</div>
          <div v-if="edit">
            <b-form-input type="number" v-model="model.hoursPerWeek" />
          </div>
          <div v-else class="text-right">
            {{ model.hoursPerWeek }}
          </div>
        </div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.travel_expenses") }}</div>
          <div v-if="edit">
            <b-form-input type="number" v-model="model.travelExpenses" />
          </div>
          <div v-else class="text-right">
            {{ model.travelExpenses }}
          </div>
        </div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.one_way_distance") }}</div>
          <div v-if="edit">
            <b-form-input type="number" v-model="model.oneWayTravelExpenseDistance" />
          </div>
          <div v-else class="text-right">
            {{ model.oneWayTravelExpenseDistance }}
          </div>
        </div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.travel_hours") }}</div>
          <div v-if="edit">
            <b-form-input type="number" v-model="model.travelHours" />
          </div>
          <div v-else class="text-right">
            {{ model.travelHours }}
          </div>
        </div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.other_expenses") }}</div>
          <div v-if="edit">
            <b-form-input type="number" v-model="model.otherExpenses" />
          </div>
          <div v-else class="text-right">
            {{ model.otherExpenses }}
          </div>
        </div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.start_date") }}</div>
          <div v-if="edit">
            <b-form-input type="date" v-model="model.startDate" />
          </div>
          <div v-else class="text-right">
            {{ model.startDate }}
          </div>
        </div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.end_date") }}</div>
          <div v-if="edit">
            <b-form-input type="date" v-model="model.endDate" />
          </div>
          <div v-else class="text-right">
            {{ model.endDate }}
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-4 contract-files">
      <div class="card-header">
        <div>
          <span>{{ $t("page_offer_detail.files") }}</span>
          <span class="color-gray ml-2">(.doc,.docx,.pdf)</span>
        </div>
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
          {{ $t("page_offer_detail.button.upload") }}
          <i class="hiway-crm-icon icon-upload" />
        </label>
      </div>
      <div class="card-body">
        <ul class="custom-list">
          <li
            class="d-flex"
            v-for="(attachment, idx) in attachments"
            :key="idx"
          >
            <div class="flex-1">
              <img
                v-if="attachment.userId === worker._id"
                :src="worker.image | appUrlFormatter"
                class="rounded-circle border mr-4"
                style="width:45px"
              />
              <img
                v-else-if="attachment.userId === manager._id"
                :src="manager.image | appUrlFormatter"
                class="rounded-circle border mr-4"
                style="width:45px"
              />
              <img
                v-else-if="attachment.userId === hiringManager._id"
                :src="hiringManager.image | appUrlFormatter"
                class="rounded-circle border mr-4"
                style="width:45px"
              />
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
                    <i class="hiway-crm-icon icon-more-vertical color-black" />
                  </template>
                  <b-dropdown-item @click="downloadFile(attachment)">
                    {{ $t("page_offer_detail.download_file") }}
                  </b-dropdown-item>
                </b-dropdown>
              </span>
              <button
                class="btn btn-transparent"
                @click="confirmDelete(attachment)"
              >
                <i class="hiway-crm-icon icon-bin" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <b-modal
      ref="modal-view-contract"
      size="lg"
      :hide-footer="true"
      :hide-header="true"
      centered
      :modal-class="{ invisible: exportingContract }"
    >
      <Contract
        :offer="model"
        :company="company"
        :manager="manager"
        :worker="worker"
        :job="job"
      />
    </b-modal>
    <b-modal
      ref="modal-sign-contract"
      :hide-footer="true"
      :hide-header="true"
      centered
      modal-class="modal-sign-contract"
    >
      <div class="text-center">
        <h1 class="color-red">
          {{ $t("page_offer_detail.modal.sign_contract.title") }}
        </h1>
      </div>
      <div class="text-center mb-5">
        {{ $t("page_offer_detail.modal.sign_contract.manager_description") }}
      </div>
      <div class="mb-4">
        <b-form-checkbox
          v-model="agreement"
          name="checkbox-1"
          value="accepted"
          unchecked-value="not_accepted"
        >
          {{ $t("page_offer_detail.modal.sign_contract.accept_term") }}
        </b-form-checkbox>
      </div>
      <div class="d-flex justify-content-around">
        <button
          class="btn btn-red"
          @click="viewContract"
          style="min-width:160px;"
        >
          {{ $t("page_offer_detail.modal.sign_contract.view_contract") }}
        </button>

        <button
          class="btn btn-blue"
          @click="lockSignSend"
          style="min-width:160px;"
        >
          {{ $t("page_offer_detail.modal.sign_contract.sign_contract") }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import jobOfferApi from "@/services/api/joboffers";
import constantsApi from "@/services/api/constants";
import Contract from "./Contract";
import { serializeContractStatus, downloadFile, exportPDF } from "@/utils";

export default {
  name: "Details",
  components: {
    Contract: Contract
  },
  computed: {
    signed() {
      return (
        this.model.status === "active" || this.model.status === "completed"
      );
    },
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
      return serializeContractStatus("manager", this.model.status);
    },
    workerState() {
      return serializeContractStatus("worker", this.model.status);
    }
  },
  data() {
    return {
      exportingContract: false,
      companyId: this.$route.params.companyId,
      offerId: this.$route.params.offerId,
      model: {
        collectiveAgreement: "",
        wage: null,
        hourlyWage: null,
        payRate: null,
        travelExpenses: null,
        oneWayTravelExpenseDistance: null,
        travelHours: null,
        otherExpenses: null,
        startDate: null,
        endDate: null,
        status: null
      },
      company: {},
      job: {},
      manager: {},
      hiringManager: {},
      worker: {},
      caoOptions: [],
      imageData: {},
      attachments: [],
      paymentType: [],
      agreement: "not_accepted"
    };
  },
  mounted() {
    this.getOfferDetails();
    this.getCaoOptions();
    this.getPaymentType();
  },
  methods: {
    downloadFile(attachment) {
      jobOfferApi
        .downloadAttachment({
          companyId: this.companyId,
          id: this.offerId,
          attachmentId: attachment._id
        })
        .then(res => {
          downloadFile(res, attachment.name);
        });
    },
    getPaymentType() {
      constantsApi.getAll().then(res => {
        this.paymentType = res.paymentType;
      });
    },
    getCaoOptions() {
      jobOfferApi
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
    lockSignSend() {
      if (this.agreement !== "accepted") {
        this.$refs["modal-sign-contract"].hide();
        this.$store.dispatch("updateShowErrorModal", true);
        this.$store.dispatch("updateErrorModalContent", {
          title: this.$t("page_offer_detail.modal.accept_fail.title"),
          subTitle: this.$t("page_offer_detail.modal.accept_fail.sub_title"),
          button: this.$t("page_offer_detail.modal.accept_fail.continue")
        });
        return;
      }
      jobOfferApi
        .lock(this.model)
        .then(res => {
          this.getOfferDetails();
          this.$refs["modal-sign-contract"].hide();
          this.$store.dispatch("updateShowSuccessModal", true);
          this.$store.dispatch("updateSuccessModalContent", {
            title: this.$t("page_offer_detail.modal.sign_success.title"),
            subTitle: this.$t("page_offer_detail.modal.sign_success.sub_title"),
            button: this.$t("page_offer_detail.modal.sign_success.continue")
          });
        })
        .catch(e => {
          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_offer_detail.modal.lock_fail.title"),
            subTitle: this.$t("page_offer_detail.modal.lock_fail.sub_title"),
            button: this.$t("page_offer_detail.modal.lock_fail.continue")
          });
        });
    },
    adjust() {
      jobOfferApi
        .adjust(this.model)
        .then(res => {
          this.getOfferDetails();
        })
        .catch(e => {
          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_offer_detail.modal.adjust_fail.title"),
            subTitle: this.$t("page_offer_detail.modal.adjust_fail.sub_title"),
            button: this.$t("page_offer_detail.modal.adjust_fail.continue")
          });
        });
    },
    update() {
      jobOfferApi
        .update(this.model)
        .then(res => {
          this.getOfferDetails();
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
    viewContract() {
      this.$refs["modal-view-contract"].show();
    },
    exportContract() {
      this.exportingContract = true;
      this.$refs["modal-view-contract"].show();
      setTimeout(() => {
        exportPDF("joboffer_contract", "contract.pdf");
        this.$refs["modal-view-contract"].hide();
        this.exportingContract = false;
      }, 100);
    },
    getOfferDetails() {
      const { companyId, offerId } = this;

      jobOfferApi
        .get({ companyId, offerId })
        .then(res => {
          res.startDate = this.getISODateString(res.startDate);
          res.endDate = this.getISODateString(res.endDate);
          this.model = { ...this.model, ...res};
          this.job = res.job[0];
          this.worker = res.worker[0];
          this.manager = res.manager[0];
          this.hiringManager = res.hiringManager[0];
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

      jobOfferApi
        .upload(data)
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
              this.$store.dispatch("updateLoading", false);
              this.$store.dispatch("updateShowErrorModal", true);
              this.$store.dispatch("updateErrorModalContent", {
                title: this.$t("page_offer_detail.modal.attach_fail.title"),
                subTitle: this.$t(
                  "page_offer_detail.modal.attach_fail.sub_title"
                ),
                button: this.$t("page_offer_detail.modal.attach_fail.continue")
              });
            });
        })
        .catch(e => {
          this.$store.dispatch("updateLoading", false);
          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_offer_detail.modal.upload_fail.title"),
            subTitle: this.$t("page_offer_detail.modal.upload_fail.sub_title"),
            button: this.$t("page_offer_detail.modal.upload_fail.continue")
          });
        });
    },
    confirmDelete(attachment) {
      this.$store.dispatch("updateShowErrorModal", true);
      this.$store.dispatch("updateErrorModalContent", {
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
          this.$store.dispatch("updateShowErrorModal", false);
          this.getOfferDetails();
        });
    }
  }
};
</script>

<style scoped></style>
