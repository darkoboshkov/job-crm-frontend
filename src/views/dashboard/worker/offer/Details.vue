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
            class="hiway-crm-icon icon-dot mr-2"
            :class="model.status === 'open' ? ' color-yellow' : 'color-blue'"
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
            class="btn mr-2"
            :class="signed ? 'btn-secondary' : 'btn-red'"
            @click="decline"
            style="min-width:160px;"
            :disabled="signed"
          >
            {{ $t("page_offer_detail.button.decline") }}
          </button>

          <button
            class="btn ml-2"
            :class="signed ? 'btn-secondary' : 'btn-blue'"
            @click="openSignContractModal"
            style="min-width:160px;"
            :disabled="signed"
          >
            {{ $t("page_offer_detail.button.sign") }}
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
            @click="openViewOffer = !openViewOffer"
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
          <div>{{ $t("page_offer_detail.form.cao") }}</div>
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
          <div>{{ $t("page_offer_detail.form.wage") }}</div>
          <div v-if="edit">
            <b-form-input v-model="model.wage" />
          </div>
          <div v-else class="text-right">
            {{ model.wage }}
          </div>
        </div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.hourly_wage") }}</div>
          <div v-if="edit">
            <b-form-input v-model="model.hourlyWage" />
          </div>
          <div v-else class="text-right">
            {{ model.hourlyWage }}
          </div>
        </div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.pay_rate") }}</div>
          <div v-if="edit">
            <b-form-input v-model="model.payRate" />
          </div>
          <div v-else class="text-right">
            {{ model.payRate }}
          </div>
        </div>
        <!--        <div class="item">-->
        <!--          <div>{{ $t("page_offer_detail.form.payment_type") }}</div>-->
        <!--          <div v-if="edit">-->
        <!--            <b-form-select v-model="model.paymentType" class="normal-size">-->
        <!--              <option-->
        <!--                v-for="(payment, index) in paymentType"-->
        <!--                :value="payment"-->
        <!--                :key="index"-->
        <!--              >-->
        <!--                {{ payment }}-->
        <!--              </option>-->
        <!--            </b-form-select>-->
        <!--          </div>-->
        <!--          <div v-else class="text-right">-->
        <!--            {{ model.paymentType }}-->
        <!--          </div>-->
        <!--        </div>-->
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
            <b-form-input v-model="model.travelExpenses" />
          </div>
          <div v-else class="text-right">
            {{ model.travelExpenses }}
          </div>
        </div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.travel_hours") }}</div>
          <div v-if="edit">
            <b-form-input v-model="model.travelHours" />
          </div>
          <div v-else class="text-right">
            {{ model.travelHours }}
          </div>
        </div>
        <div class="item">
          <div>{{ $t("page_offer_detail.form.other_expenses") }}</div>
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
        <span>{{ $t("page_offer_detail.files") }}</span>
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
        <div class="item" v-for="(attachment, idx) in attachments" :key="idx">
          <div>
            <img
              :src="
                (attachment.userId === worker._id
                  ? worker.image
                  : attachment.userId === manager._id
                  ? manager.image
                  : '') | appUrlFormatter
              "
              class="rounded-circle border mr-4"
              style="width:45px"
            />
            {{ attachment.name }}
          </div>
          <div>
            <span class="mr-5">
              {{ attachment.uploadedAt | dateTimeFormatter }}
            </span>
            <span class="mr-5">{{ attachment.size | fileSizeFormatter }}</span>
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
                >{{ option.label }}</option
              >
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
                >{{ option.label }}</option
              >
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
          {{ $t("page_offer_detail.modal.sign_contract.accept_term") }}
        </b-form-checkbox>
      </div>
      <div class="d-flex justify-content-around">
        <button
          class="btn btn-red"
          @click="openViewOffer = !openViewOffer"
          style="min-width:160px;"
        >
          {{ $t("page_offer_detail.modal.sign_contract.view_contract") }}
        </button>

        <button class="btn btn-blue" @click="sign" style="min-width:160px;">
          {{ $t("page_offer_detail.modal.sign_contract.sign_contract") }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import jobOfferApi from "@/services/api/joboffers";
import constantsApi from "@/services/api/constants";
import ViewJobOffer from "./ViewJobOffer";
import { serializeContractStatus } from "@/utils";

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
      return serializeContractStatus("manager", this.model.status);
    },
    workerState() {
      return serializeContractStatus("worker", this.model.status);
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
      paymentType: [],
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
    this.getPaymentType();
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
    getPaymentType() {
      return constantsApi.getAll().then(res => {
        this.paymentType = res.paymentType;
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
