<template>
  <b-modal
    ref="modal-add-expenses"
    size="md"
    :hide-footer="true"
    :hide-header="true"
    centered
    modal-class="modal-add-expenses"
    v-model="showModal"
  >
    <h2 class="color-red p-4">
      {{
        mode === "edit"
          ? $t("page_timesheets.expenses")
          : $t("page_timesheets.add_expenses")
      }}
    </h2>

    <div class="py-3 p-4">
      <div class="row mb-3">
        <div class="col">
          <span class="color-blue mr-3"
            >{{ $t("page_timesheets.modal.hiring_manager") }}:</span
          >&nbsp;<b-input
            class="d-inline-block expense-input"
            v-model="hiringManagerFullName"
            disabled
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <span class="color-blue mr-3"
            >{{ $t("page_timesheets.modal.worker") }}:</span
          >&nbsp;<b-input
            class="d-inline-block expense-input"
            :value="workerFullName"
            disabled
          />
        </div>
      </div>
    </div>

    <div class="py-3 p-4">
      <div class="row mb-3">
        <div class="col">
          <span class="mr-3">{{ $t("page_timesheets.modal.date") }}:</span
          >&nbsp;
          <b-form-datepicker
            class="d-inline-block expense-input"
            v-model="model.expenseData.date"
            :disabled="inputDisabled"
            :date-format-options="dateStringOptions"
            today-button
            reset-button
            locale="nl"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <span class="mr-3">{{ $t("page_timesheets.modal.amount") }}:</span>
          <b-input
            class="d-inline-block expense-input"
            placeholder="€0.00"
            v-model="model.expenseData.amount"
            :disabled="inputDisabled"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <span class="mr-3">{{ $t("page_timesheets.modal.category") }}:</span>
          <b-form-group class="d-inline-block mb-0" :disabled="inputDisabled">
            <b-form-radio
              v-model="model.expenseData.category"
              name="some-radios"
              value="travel"
              class="d-inline-block big-red mr-2"
              >Travel</b-form-radio
            >
            <b-form-radio
              v-model="model.expenseData.category"
              name="some-radios"
              value="food"
              class="d-inline-block big-red mr-2"
              >Food</b-form-radio
            >
            <b-form-radio
              v-model="model.expenseData.category"
              name="some-radios"
              value="other"
              class="d-inline-block big-red"
              >Other</b-form-radio
            >
          </b-form-group>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <span class="mr-3"
            >{{ $t("page_timesheets.modal.upload_receipt") }}:</span
          >&nbsp;
          <input
            type="file"
            id="attachment"
            name="attachment"
            accept=".doc,.docx,.pdf"
            @change="onFileChange"
            class="d-none"
            placeholder="Choose file"
            :disabled="inputDisabled"
          />
          <div class="d-inline-block expense-input position-relative">
            <b-input
              placeholder="Choose file"
              :disabled="inputDisabled"
              :value="
                model.expenseData.attachments &&
                  model.expenseData.attachments[0] &&
                  model.expenseData.attachments[0].name
              "
            />
            <label class="position-absolute file-selector" for="attachment" />
            <i
              class="hiway-crm-icon icon-upload position-absolute"
              style="top: 11px;right: 11px;"
            />
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col align-items-baseline">
          <span class="mr-3">{{ $t("page_timesheets.modal.note") }}:</span
          >&nbsp;
          <b-textarea
            class="d-inline-block expense-input"
            placeholder="Add a note..."
            v-model="model.expenseData.commentDescription"
            :disabled="inputDisabled"
          />
        </div>
      </div>

      <div class="text-right">
        <button class="btn btn-blue" @click="createExpenses" v-if="addMode">
          {{ $t("page_timesheets.modal.save_expenses") }}
        </button>
        <button
          class="btn btn-red ml-3"
          @click="createAndSubmitExpenses"
          v-if="addMode"
        >
          {{ $t("page_timesheets.modal.send_expenses") }}
        </button>
        <template
          v-else-if="
            model.status === EXPENSE_STATE.NOT_SUBMITTED ||
              model.status === EXPENSE_STATE.DECLINED
          "
        >
          <button class="btn btn-blue" @click="saveExpenses">
            {{ $t("page_timesheets.modal.save_expenses") }}
          </button>
          <button class="btn btn-red ml-3" @click="submitExpenses">
            {{ $t("page_timesheets.modal.send_expenses") }}
          </button>
        </template>
        <template v-else-if="model.status === EXPENSE_STATE.SUBMITTED">
          <button class="btn btn-red" @click="adjustExpenses">
            {{ $t("page_timesheets.modal.adjust_expenses") }}
          </button>
        </template>
        <template v-else-if="model.status === EXPENSE_STATE.APPROVED">
          <!-- nothing to show -->
        </template>
      </div>
    </div>
  </b-modal>
</template>

<script>
import jobOffersApi from "@/services/api/joboffers";
import workLogsApi from "@/services/api/worklogs";
import { EXPENSE_STATE } from "@/constants";

export default {
  name: "ExpensesModal",
  props: {
    modalOpen: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    rowData: {
      default: function() {
        return {};
      }
    },
    mode: {
      default: function() {
        return "edit";
      }
    }
  },
  computed: {
    showModal: {
      get() {
        return this.modalOpen;
      },
      set(v) {
        this.$emit("update:modalOpen", v);
      }
    },
    addMode() {
      return this.mode === "add";
    },
    editMode() {
      return this.mode === "edit";
    },
    inputDisabled() {
      return (
        this.model.status === EXPENSE_STATE.APPROVED ||
        this.model.status === EXPENSE_STATE.SUBMITTED
      );
    }
  },
  data() {
    return {
      workerFullName: this.getFullName(this.$store.state.user),
      hiringManagerFullName: "",

      model: {
        expenseData: {
          amount: "",
          attachments: [],
          commentDescription: "",
          category: "other",
          date: ""
        }
      },

      imageData: {},
      EXPENSE_STATE,
      companyId: this.$store.state.user.companyId
    };
  },
  created() {
    this.getHiringManager();
  },
  methods: {
    getHiringManager() {
      jobOffersApi
        .getAllByWorker({
          companyId: this.companyId,
          filter: { and: [{ key: "status", value: "active", opt: "eq" }] }
        })
        .then(({ docs }) => {
          if (docs[0] && docs[0].hiringManager && docs[0].hiringManager[0]) {
            this.hiringManagerFullName = this.getFullName(
              docs[0].hiringManager[0]
            );
          }
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
          size: file.size.toString(),
          userId: this.$store.state.user._id
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

      workLogsApi.upload(data).then(res => {
        this.imageData.path = res.path;
        this.model.expenseData.attachments = [this.imageData];

        this.$store.dispatch("updateLoading", false);
      });
    },
    createExpenses() {
      workLogsApi
        .createExpense({
          ...this.model.expenseData,
          companyId: this.companyId
        })
        .then(res => {
          this.$emit("refresh");
          this.showModal = false;
        });
    },
    submitExpenses() {
      workLogsApi
        .send({
          ...this.model,
          companyId: this.companyId
        })
        .then(res => {
          this.$emit("refresh");
          this.showModal = false;
        });
    },
    createAndSubmitExpenses() {
      workLogsApi
        .createExpense({
          ...this.model.expenseData,
          companyId: this.companyId
        })
        .then(res => {
          this.$emit("refresh");
          this.model = res;

          workLogsApi
            .send({
              ...this.model,
              companyId: this.companyId
            })
            .then(res => {
              this.$emit("refresh");
              this.showModal = false;
            });
        });
    },
    saveExpenses() {
      workLogsApi
        .save({
          ...this.model,
          companyId: this.companyId
        })
        .then(res => {
          this.$emit("refresh");
          this.showModal = false;
        });
    },
    adjustExpenses() {
      workLogsApi
        .adjust({
          ...this.model,
          companyId: this.companyId
        })
        .then(res => {
          this.$emit("refresh");
          this.model = res;
        });
    }
  },
  mounted() {
    //
  },
  watch: {
    rowData() {
      this.model = this.rowData;
      if (this.model.expenseData.date) {
        this.model.expenseData.date = this.getISODateString(
          this.model.expenseData.date
        );
      }
    }
  }
};
</script>

<style scoped></style>
