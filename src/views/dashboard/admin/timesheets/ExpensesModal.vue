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
      {{ mode === "edit" ? "Expenses" : "Add Expenses" }}
    </h2>

    <div class="py-3">
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

    <div class="py-3">
      <div class="row mb-3">
        <div class="col">
          <span class="mr-3">Date:</span>&nbsp;<b-input
            class="d-inline-block expense-input"
            type="date"
            v-model="model.expenseData.date"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <span class="mr-3">Amount:</span>&nbsp;<b-input
            class="d-inline-block expense-input"
            placeholder="€0.00"
            v-model="model.expenseData.amount"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <span class="mr-3">Category:</span>&nbsp;
          <b-form-group class="d-inline-block mb-0">
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
          <span class="mr-3">Upload receipt:</span>&nbsp;<input
            type="file"
            id="attachment"
            name="attachment"
            accept=".doc,.docx,.pdf"
            @change="onFileChange"
            class="d-none"
            placeholder="Choose file"
          />
          <i
                  class="hiway-crm-icon icon-ul pointer" />
          <div class="d-inline-block expense-input position-relative">
            <b-input
              placeholder="Choose file"
              :value="
                model.expenseData.attachments &&
                  model.expenseData.attachments[0] &&
                  model.expenseData.attachments[0].name
              "
            />
            <label
              class="position-absolute file-selector"
              for="attachment"
            />
            <i class="hiway-crm-icon icon-upload position-absolute" style="top: 11px;right: 11px;"/>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col align-items-baseline">
          <span class="mr-3">Note:</span>&nbsp;<b-textarea
            class="d-inline-block expense-input"
            placeholder="Add a note..."
            v-model="model.expenseData.commentDescription"
          />
        </div>
      </div>

      <div class="text-right">
        <template
                v-if="
            model.status === EXPENSE_STATE.NOT_SUBMITTED ||
              model.status === EXPENSE_STATE.DECLINED
          "
        >
          <button class="btn btn-blue" @click="saveExpenses">
            {{ $t("page_timesheets.modal.save_hours") }}
          </button>
        </template>
        <template v-else-if="model.status === EXPENSE_STATE.SUBMITTED">
          <button class="btn btn-red" @click="approveExpenses">
            {{ $t("page_timesheets.modal.approve_hours") }}
          </button>
          <button class="btn btn-secondary ml-3" @click="declineExpenses">
            {{ $t("page_timesheets.modal.decline_hours") }}
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
import workLogApi from "@/services/api/workLog";
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
    }
  },
  data() {
    return {
      workerFullName: "",
      hiringManagerFullName: "",

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
      EXPENSE_STATE
    };
  },
  methods: {
    saveExpenses() {
      const { companyId } = this.model;

      workLogApi
        .save({
          ...this.model,
          companyId
        })
        .then(res => {
          this.$emit("refresh");
          this.showModal = false;
        });
    },
    approveExpenses() {
      const { companyId } = this.model;

      workLogApi
        .approve({
          ...this.model,
          companyId
        })
        .then(res => {
          this.$emit("refresh");
          this.showModal = false;
        });
    },
    declineExpenses() {
      const { companyId } = this.model;

      workLogApi
        .decline({
          ...this.model,
          companyId
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

      workLogApi.upload(data).then(response => {
        this.imageData.path = response.path;
        this.model.expenseData.attachments = [this.imageData];

        this.$store.dispatch("updateLoading", false);
      });
    }
  },
  mounted() {
    //
  },
  watch: {
    rowData() {
      this.model = this.rowData;
      this.workerFullName =
        this.rowData.worker && this.rowData.worker[0]
          ? this.getFullName(this.rowData.worker[0])
          : "";
      this.hiringManagerFullName =
        this.rowData.hiringManager && this.rowData.hiringManager[0]
          ? this.getFullName(this.rowData.hiringManager[0])
          : "";
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
