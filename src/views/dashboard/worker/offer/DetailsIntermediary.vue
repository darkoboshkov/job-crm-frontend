<template>
  <div id="page_job_offer_details" class="dashboard-content">
    <a
      href="javascript:void(0)"
      class="back mb-3"
      @click.prevent="$router.go(-2)"
    >
      <i class="hiway-crm-icon icon-angle-left mr-2" />
      <span>{{ $t("common.back") }}</span>
    </a>
    <h1 class="title mt-5">
      {{ $t("page_offer_detail.title") }}
    </h1>
    <div class="mt-5 row">
      <div class="matching-list col-4">
        <b-card class="matching-item" body-class="p-0">
          <div class="up d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <div class="avatar-image size-65 mr-2">
                <img
                  v-if="hiringCompany.logo"
                  :src="hiringCompany.logo | appUrlFormatter"
                />
              </div>
              <div>
                <div>
                  <strong>{{ job.title }}</strong>
                </div>
                <div>{{ hiringCompany.name }}</div>
              </div>
            </div>
            <div class="icon-group">
              <div class="icon cursor-copy">
                <img
                  src="@/assets/image/phone.svg"
                  @click="copyPhoneNumToClipboard(hiringCompany.phone)"
                />
              </div>
              <div class="icon">
                <a :href="'mailto:' + hiringCompany.email">
                  <img src="@/assets/image/message.svg" />
                </a>
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
        </b-card>
      </div>
      <div class="col-4 matching-list">
        <div class="row">
          <div class="col-2 d-flex justify-content-center">
            <img src="@/assets/image/matching.svg" />
          </div>

          <div class="matching-list col-8">
            <b-card class="matching-item" body-class="p-0">
              <div class="up d-flex justify-content-between">
                <div class="d-flex align-items-center">
                  <div class="avatar-image size-65 mr-2">
                    <img
                      v-if="company.logo"
                      :src="company.logo | appUrlFormatter"
                    />
                  </div>
                  <div>
                    <div>
                      <strong>{{ company.name }}</strong>
                    </div>
                    <div>{{ $t("page_offer_detail.intermediary") }}</div>
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
            </b-card>
          </div>

          <div class="col-2 d-flex justify-content-center">
            <img src="@/assets/image/matching.svg" />
          </div>
        </div>
      </div>

      <div class="matching-list col-4">
        <b-card class="matching-item" body-class="p-0">
          <div class="up d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <div class="avatar-image size-65 mr-2">
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
              <div class="icon cursor-copy">
                <img
                  src="@/assets/image/phone.svg"
                  @click="copyPhoneNumToClipboard(worker.phone)"
                />
              </div>
              <div class="icon">
                <a :href="'mailto:' + worker.email">
                  <img src="@/assets/image/message.svg" />
                </a>
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
        </b-card>
      </div>
    </div>

    <b-card class="mt-4">
      <template v-slot:header>
        <div class="d-flex align-items-center justify-content-between">
          <span>{{ $t("page_offer_detail.status_actions") }}</span>
          <span class="d-flex align-items-center contract-status">
            <i
              v-if="contractStatus === 'open'"
              class="hiway-crm-icon icon-dot mr-2 color-yellow font-size-3"
            />
            <i
              v-else-if="contractStatus === 'pending'"
              class="hiway-crm-icon icon-dot mr-2 color-blue font-size-3"
            />
            <i
              v-else-if="contractStatus === 'active'"
              class="hiway-crm-icon icon-dot mr-2 color-green font-size-3"
            />
            <i
              v-else-if="contractStatus === 'failed'"
              class="hiway-crm-icon icon-dot mr-2 color-black font-size-3"
            />
            <template v-if="contractStatus">
              {{ $t("status." + contractStatus) }}
            </template>
          </span>
        </div>
      </template>
      <div class="d-flex justify-content-between">
        <div>
          <div class="d-flex align-items-center mb-3">
            <div class="avatar-image mr-2">
              <img v-if="company.logo" :src="company.logo | appUrlFormatter" />
            </div>
            <div>
              <i
                class="hiway-crm-icon icon-dot mr-2 font-size-3"
                :class="managerState.color"
              />
              {{ managerState.text }}
            </div>
          </div>
          <div class="d-flex align-items-center mb-3">
            <div class="avatar-image mr-2">
              <img
                v-if="hiringCompany.logo"
                :src="hiringCompany.logo | appUrlFormatter"
              />
            </div>
            <div>
              <i
                class="hiway-crm-icon icon-dot mr-2 font-size-3"
                :class="hiringManagerState.color"
              />
              {{ hiringManagerState.text }}
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="avatar-image mr-2">
              <img v-if="worker.image" :src="worker.image | appUrlFormatter" />
            </div>
            <div>
              <i
                class="hiway-crm-icon icon-dot mr-2 font-size-3"
                :class="workerState.color"
              />
              {{ workerState.text }}
            </div>
          </div>
        </div>
        <div>
          <button
            class="btn mr-2 min-width-160"
            :class="signed ? 'btn-secondary' : 'btn-red'"
            @click="decline"
            :disabled="signed"
          >
            {{ $t("page_offer_detail.button.decline") }}
          </button>

          <button
            class="btn ml-2 min-width-160"
            :class="signed ? 'btn-secondary' : 'btn-blue'"
            @click="openSignContractModal"
            :disabled="signed"
          >
            {{ $t("page_offer_detail.button.sign") }}
          </button>

          <button
            class="btn ml-2 min-width-160"
            :class="signed ? 'btn-red' : 'btn-secondary'"
            @click="exportContract"
            :disabled="!signed"
          >
            {{ $t("page_offer_detail.button.export_contract") }}
          </button>

          <button
            class="btn ml-2 min-width-160"
            :class="signed ? 'btn-blue' : 'btn-secondary'"
            @click="contractModal = true"
          >
            {{ $t("page_offer_detail.button.view_contract") }}
          </button>
        </div>
      </div>
    </b-card>

    <b-card class="mt-4 contract-specifications">
      <template v-slot:header>
        <div>{{ $t("page_offer_detail.specifications") }}</div>
      </template>
      <div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.cao") }}</div>
          <div v-if="edit">
            <b-form-select v-model="model.collectiveAgreement">
              <option
                v-for="caoOption in caoOptions"
                :value="caoOption._id"
                :key="caoOption._id"
              >
                {{ caoOption.name }}
              </option>
            </b-form-select>
          </div>
          <div v-else class="text-right">{{ selectedCaoOption.name }}</div>
        </div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.wage") }}</div>
          <div v-if="edit">
            <b-form-input v-model="model.wage" />
          </div>
          <div v-else type="number" class="text-right">
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
            <b-form-input
              type="number"
              v-model="model.oneWayTravelExpenseDistance"
            />
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
            <b-form-datepicker
              v-model="model.startDate"
              :date-format-options="dateStringOptions"
              today-button
              reset-button
              locale="nl"
            />
          </div>
          <div v-else class="text-right">
            {{ model.startDate | dateFormatter }}
          </div>
        </div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.end_date") }}</div>
          <div v-if="edit">
            <b-form-datepicker
              v-model="model.endDate"
              :date-format-options="dateStringOptions"
              today-button
              reset-button
              locale="nl"
            />
          </div>
          <div v-else class="text-right">
            {{ model.endDate | dateFormatter }}
          </div>
        </div>
      </div>
    </b-card>

    <b-card class="mt-4 contract-files" body-class="p-0">
      <template v-slot:header>
        <div class="d-flex align-items-center justify-content-between">
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
          <label for="attachment" class="btn btn-blue ml-2 min-width-160">
            {{ $t("page_offer_detail.button.upload") }}
            <i class="hiway-crm-icon icon-upload" />
          </label>
        </div>
      </template>
      <div>
        <ul class="custom-list interaction">
          <li
            class="d-flex align-items-center justify-content-between px-3"
            v-for="(attachment, idx) in attachments"
            :key="idx"
          >
            <div @click="downloadFile(attachment)" class="flex-1">
              <img
                v-if="attachment.userId === worker._id && worker.image"
                :src="worker.image | appUrlFormatter"
                class="rounded-circle border mr-4"
              />
              <img
                v-else-if="attachment.userId === manager._id && manager.image"
                :src="manager.image | appUrlFormatter"
                class="rounded-circle border mr-4"
              />
              <img
                v-else-if="
                  attachment.userId === hiringManager._id && hiringManager.image
                "
                :src="hiringManager.image | appUrlFormatter"
                class="rounded-circle border mr-4"
              />
              {{ attachment.name }}
            </div>
            <div>
              <span class="mr-5" @click="downloadFile(attachment)">
                {{ attachment.uploadedAt | dateTimeFormatter }}
              </span>
              <span class="mr-5" @click="downloadFile(attachment)">
                {{ attachment.size | fileSizeFormatter }}
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
              <span>
                <i
                  v-if="attachment.userId === user._id"
                  class="hiway-crm-icon icon-bin"
                  @click="confirmDelete(attachment)"
                />
              </span>
            </div>
          </li>
        </ul>
      </div>
    </b-card>
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
        {{ $t("page_offer_detail.modal.sign_contract.description") }}
      </div>
      <div class="mb-5">
        <div class="sign-item">
          <div>
            {{ $t("page_offer_detail.modal.sign_contract.payment_interval") }}
          </div>
          <div>
            <b-form-select v-model="model.paymentInterval">
              <option
                v-for="option in paymentIntervalOptions"
                :value="option.value"
                :key="option.value"
              >
                {{ option.label }}
              </option>
            </b-form-select>
          </div>
        </div>
        <div class="sign-item">
          <div>
            {{ $t("page_offer_detail.modal.sign_contract.discount_on_taxes") }}
          </div>
          <div>
            <b-form-select v-model="model.discountOnTaxes">
              <option
                v-for="option in discountOnTaxesOptions"
                :value="option.value"
                :key="option.value"
              >
                {{ option.label }}
              </option>
            </b-form-select>
          </div>
        </div>
        <div class="sign-item">
          <div>
            {{
              $t(
                "page_offer_detail.modal.sign_contract.work_earlier_as_flexworker"
              )
            }}
          </div>
          <div>
            <b-form-select v-model="model.workedEarlierAsFlexWorker">
              <option
                v-for="option in workedEarlierAsFlexWorkerOptions"
                :value="option.value"
                :key="option.value"
              >
                {{ option.label }}
              </option>
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
          {{ $t("page_offer_detail.modal.sign_contract.accept_term") }}
        </b-form-checkbox>
      </div>
      <div class="d-flex justify-content-around">
        <button class="btn btn-red min-width-160" @click="contractModal = true">
          {{ $t("page_offer_detail.modal.sign_contract.view_contract") }}
        </button>

        <button class="btn btn-blue min-width-160" @click="sign">
          {{ $t("page_offer_detail.modal.sign_contract.sign_contract") }}
        </button>
      </div>
    </b-modal>
    <contract-modal
      :offer="model"
      :company="company"
      :manager="manager"
      :hiringCompany="hiringCompany"
      :hiringManager="hiringManager"
      :worker="worker"
      :job="job"
      :modal-open.sync="contractModal"
    />
  </div>
</template>

<script>
import jobOffersApi from "@/services/api/joboffers";
import constantsApi from "@/services/api/constants";
import ContractModal from "./components/ContractModal";
import {
  serializeContractStatus,
  downloadFile,
  copyToClipboard
} from "@/utils";
import {
  paymentIntervalOptions,
  discountOnTaxesOptions,
  workedEarlierAsFlexWorkerOptions
} from "@/constants";

export default {
  name: "Details",
  components: {
    ContractModal
  },
  data() {
    return {
      companyId: this.$store.state.user.companyId,
      offerId: this.$route.params.offerId,
      user: this.$store.state.user,
      model: {
        collectiveAgreement: "",
        wage: 0,
        hourlyWage: 0,
        payRate: 0,
        travelExpenses: 0,
        oneWayTravelExpenseDistance: 0,
        travelHours: 0,
        otherExpenses: 0,
        startDate: null,
        endDate: null,
        status: null,
        intermediaryStatus: null,
        paymentInterval: "",
        discountOnTaxes: "",
        workedEarlierAsFlexWorker: ""
      },
      contractStatus: null,
      company: {},
      job: {},
      manager: {},
      hiringManager: {},
      hiringCompany: {},
      worker: {},
      caoOptions: [],
      imageData: {},
      attachments: [],
      offerContract: null,
      agreement: "not_accepted",
      paymentType: [],
      contractModal: false,
      paymentIntervalOptions,
      discountOnTaxesOptions,
      workedEarlierAsFlexWorkerOptions
    };
  },
  computed: {
    edit() {
      return false;
    },
    selectedCaoOption() {
      return (
        this.caoOptions.find(
          option => option._id === this.model.collectiveAgreement
        ) || {}
      );
    },
    managerState() {
      return serializeContractStatus("manager", this.contractStatus);
    },
    workerState() {
      return serializeContractStatus("worker", this.model.status);
    },
    hiringManagerState() {
      return serializeContractStatus(
        "hiringManager",
        this.model.intermediaryStatus
      );
    },
    signed() {
      return (
        this.model.status === "active" ||
        this.model.status === "completed" ||
        this.model.status === "failed"
      );
    }
  },
  mounted() {
    this.getOfferDetails();
    this.getCaoOptions();
    this.getPaymentType();
  },
  methods: {
    downloadFile(attachment) {
      jobOffersApi
        .downloadAttachment({
          companyId: this.companyId,
          id: this.offerId,
          attachmentId: attachment._id
        })
        .then(res => {
          downloadFile(res, attachment.name);
        });
    },
    getCaoOptions() {
      jobOffersApi
        .getCaoOptions({
          companyId: this.companyId
        })
        .then(res => {
          this.caoOptions = res;
        });
    },
    getPaymentType() {
      constantsApi.getAll().then(res => {
        this.paymentType = res.paymentType;
      });
    },
    openSignContractModal() {
      this.$refs["modal-sign-contract"].show();
    },
    sign() {
      this.$refs["modal-sign-contract"].hide();
      if (this.agreement !== "accepted") {
        this.$store.dispatch("updateShowErrorModal", true);
        this.$store.dispatch("updateErrorModalContent", {
          title: this.$t("page_offer_detail.modal.accept_fail.title"),
          subTitle: this.$t("page_offer_detail.modal.accept_fail.sub_title"),
          button: this.$t("page_offer_detail.modal.accept_fail.continue")
        });
        return;
      }
      jobOffersApi
        .sign(this.model)
        .then(res => {
          this.getOfferDetails();
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
            title: this.$t("page_offer_detail.modal.sign_fail.title"),
            subTitle: this.$t("page_offer_detail.modal.sign_fail.sub_title"),
            button: this.$t("page_offer_detail.modal.sign_fail.continue")
          });
        });
    },
    decline() {
      jobOffersApi
        .decline(this.model)
        .then(res => {
          this.getOfferDetails();
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
    exportContract() {
      jobOffersApi
        .downloadWorkerContract({
          companyId: this.companyId,
          id: this.offerId,
          offerName: this.offerContract.name
        })
        .then(res => {
          downloadFile(res, this.offerContract.name);
        });
    },
    getOfferDetails() {
      const { companyId, offerId } = this;

      jobOffersApi
        .get({ companyId, offerId })
        .then(res => {
          res.startDate = this.getISODateString(res.startDate);
          res.endDate = this.getISODateString(res.endDate);
          this.model = { ...this.model, ...res };
          this.contractStatus = this.getContractStatus(
            this.model.status,
            this.model.intermediaryStatus
          );

          if (this.contractStatus === "active" && res.contractData) {
            this.job = res.contractData.job;
            this.company = res.contractData.company;
            this.worker = res.contractData.worker;
            this.manager = res.contractData.manager;
            this.hiringManager = res.contractData.hiringManager;
            this.hiringCompany = res.contractData.hiringCompany;
          } else {
            this.job = res.job[0];
            this.company = res.company[0];
            this.worker = res.worker[0];
            this.manager = res.manager[0];
            this.hiringManager = res.hiringManager[0];
            this.hiringCompany = res.hiringCompany[0];
          }
          this.attachments = res.attachments;
          this.offerContract = res.contractData?.workerContractDoc;
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

      jobOffersApi
        .upload(data)
        .then(response => {
          this.imageData.path = response.path;
          jobOffersApi
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
      jobOffersApi
        .deleteAttachment({
          companyId: this.companyId,
          _id: this.offerId,
          attachmentId: attachment._id
        })
        .then(res => {
          this.$store.dispatch("updateShowErrorModal", false);
          this.getOfferDetails();
        });
    },
    copyPhoneNumToClipboard(phone) {
      copyToClipboard(phone, `Successfully copied the phone number ${phone}`);
    }
  },
  watch: {
    "model.status"(value) {
      if (value === "open") {
        this.$router.push({ name: "worker-offers" });
      }
    }
  }
};
</script>

<style scoped>
.rounded-circle {
  width: 45px;
}
</style>
