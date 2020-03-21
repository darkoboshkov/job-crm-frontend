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
            class="d-inline-block w-50"
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
            class="d-inline-block w-50"
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
            class="d-inline-block w-50"
            type="date"
            v-model="model.expenseData.date"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <span class="mr-3">Amount:</span>&nbsp;<b-input
            class="d-inline-block w-50"
            placeholder="€0.00"
            v-model="model.expenseData.amount"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <span class="mr-3">Category:</span>&nbsp;
          <b-form-group class="d-inline-block">
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
          <div class="d-inline-block w-50 position-relative">
            <b-input
              placeholder="Choose file"
              :value="
                model.expenseData.attachments[0] &&
                  model.expenseData.attachments[0].name
              "
            />
            <label
              class="position-absolute file-selector"
              for="attachment"
            ></label>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col align-items-baseline">
          <span class="mr-3">Note:</span>&nbsp;<b-textarea
            class="d-inline-block w-50"
            placeholder="Add a note..."
            v-model="model.expenseData.commentDescription"
          />
        </div>
      </div>
    </div>

    <b-card class="mb-2">
      <div class="text-right">
        <button class="btn btn-red" @click="submitExpenses">
          Send Expenses
        </button>
      </div>
    </b-card>
  </b-modal>
</template>

<script>
import companyApi from "@/services/api/companies";
import userApi from "@/services/api/users";
import jobOfferApi from "@/services/api/joboffers";
import workLogApi from "@/services/api/workLog";

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
      workers: []
    };
  },
  created() {
    this.getHiringManager();
  },
  methods: {
    getHiringManager() {
      jobOfferApi
        .getAllByWorker({
          companyId: this.$store.state.user.companyId,
          filter: {
            status: "active"
          }
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

      workLogApi.upload(data).then(response => {
        this.imageData.path = response.path;
        this.model.expenseData.attachments = [this.imageData];

        this.$store.dispatch("updateLoading", false);
      });
    },
    submitExpenses() {
      const { companyId } = this.$store.state.user;

      workLogApi
        .createExpense({
          ...this.model.expenseData,
          companyId
        })
        .then(res => {
          this.$emit("refresh");
          this.showModal = false;
        });
    }
  },
  mounted() {
    //
  },
  watch: {
    rowData() {
      this.model = this.rowData;
      this.model.expenseData.date = this.getISODateString(
        this.model.expenseData.date
      );
    }
  }
};
</script>

<style scoped></style>
