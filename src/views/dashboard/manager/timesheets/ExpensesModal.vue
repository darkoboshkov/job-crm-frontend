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
          : $t("page_timesheets.modal.add_expenses")
      }}
    </h2>

    <div class="py-3">
      <div class="row mb-3">
        <div class="col">
          <span class="color-blue mr-3"
            >{{ $t("page_timesheets.modal.hiring_manager") }}:</span
          >&nbsp;<b-input
            class="d-inline-block expense-input"
            v-model="model.hiringManager"
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
            :value="model.worker"
            disabled
          />
        </div>
      </div>
    </div>

    <div class="py-3">
      <div class="row mb-3">
        <div class="col">
          <span class="mr-3">{{ $t("page_timesheets.modal.date") }}:</span
          >&nbsp;
          <b-form-datepicker
            v-model="model.expenseData.date"
            :disabled="inputDisabled"
            class="d-inline-block expense-input"
            :date-format-options="dateStringOptions"
            today-button
            reset-button
            locale="nl"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <span class="mr-3">{{ $t("page_timesheets.modal.amount") }}:</span
          >&nbsp;
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
          <span class="mr-3">{{ $t("page_timesheets.modal.category") }}:</span
          >&nbsp;
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
              :value="
                model.expenseData.attachments &&
                  model.expenseData.attachments[0] &&
                  model.expenseData.attachments[0].name
              "
              :disabled="inputDisabled"
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
          <span class="mr-3">{{ $t("page_timesheets.modal.note") }}:</span>
          <b-textarea
            class="d-inline-block expense-input"
            placeholder="Add a note..."
            v-model="model.expenseData.commentDescription"
            :disabled="inputDisabled"
          />
        </div>
      </div>

      <div class="text-right">
        <template
          v-if="
            model.status === expenseStatus.NOT_SUBMITTED ||
              model.status === expenseStatus.DECLINED
          "
        >
          <button class="btn btn-blue" @click="saveExpenses">
            {{ $t("page_timesheets.modal.save_expenses") }}
          </button>
        </template>
        <template v-else-if="model.status === expenseStatus.SUBMITTED">
          <button class="btn btn-red" @click="approveExpenses">
            {{ $t("page_timesheets.modal.approve_expenses") }}
          </button>
          <button class="btn btn-secondary ml-3" @click="declineExpenses">
            {{ $t("page_timesheets.modal.decline_expenses") }}
          </button>
        </template>
        <template v-else-if="model.status === expenseStatus.APPROVED">
          <!-- nothing to show -->
        </template>
      </div>
    </div>
  </b-modal>
</template>

<script>
import workLogsApi from "@/services/api/worklogs";
import { expenseStatus } from "@/constants";

export default {
  name: "ExpensesModal",
  props: {
    modalOpen: {
      type: Boolean,
      default: false
    },
    rowData: {
      default: {}
    },
    mode: {
      default: "edit"
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
        this.model.status === expenseStatus.APPROVED ||
        this.model.status === expenseStatus.SUBMITTED
      );
    }
  },
  data() {
    return {
      model: {
        expenseData: {
          amount: "",
          date: "",
          attachments: [],
          commentDescription: "",
          category: "other"
        }
      },

      imageData: {},
      expenseStatus,
      companyId: this.$store.state.user.companyId
    };
  },
  mounted() {},
  methods: {
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
    approveExpenses() {
      workLogsApi
        .approve({
          ...this.model,
          companyId: this.companyId
        })
        .then(res => {
          this.$emit("refresh");
          this.showModal = false;
        });
    },
    declineExpenses() {
      workLogsApi
        .decline({
          ...this.model,
          companyId: this.companyId
        })
        .then(res => {
          this.$emit("refresh");
          this.showModal = false;
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
    }
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
