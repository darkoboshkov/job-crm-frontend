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
    <h2 class="color-red py-4">Add Expenses</h2>

    <div class="py-3">
      <div class="row mb-3">
        <div class="col">
          <span class="color-blue mr-3">Employer:</span>&nbsp;<b-input
            class="d-inline-block w-50"
            v-model="company.name"
            disabled
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <span class="color-blue mr-3">Employee:</span>&nbsp;<b-input
            class="d-inline-block w-50"
            v-model="worker.name"
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
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <span class="mr-3">Amount:</span>&nbsp;<b-input
            class="d-inline-block w-50"
            placeholder="€0.00"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <span class="mr-3">Category:</span>&nbsp;
          <b-form-group class="d-inline-block">
            <b-form-radio
              v-model="category"
              name="some-radios"
              value="travel"
              class="d-inline-block big-red mr-2"
              >Travel</b-form-radio
            >
            <b-form-radio
              v-model="category"
              name="some-radios"
              value="food"
              class="d-inline-block big-red mr-2"
              >Food</b-form-radio
            >
            <b-form-radio
              v-model="category"
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
          <span class="mr-3">Upload receipt:</span>&nbsp;<b-input
            class="d-inline-block w-50"
            placeholder="Choose file"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <span class="mr-3">Note:</span>&nbsp;<b-textarea
            class="d-inline-block w-50"
            placeholder="Add a note..."
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
// import dateFormatter from "@/helpers/DateFormatter";

export default {
  name: "AddExpensesModal",
  props: {
    modalOpen: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
  },
  computed: {
    showModal: {
      get() {
        return this.modalOpen;
      },
      set(v) {
        console.log("set", v);
        this.$emit("update:modalOpen", v);
      }
    },
    year() {
      return new Date().getFullYear();
    },
    dayOfNewYearDay() {
      return new Date(this.year, 0, 1).getDay();
    },
    startOfSecondWeek() {
      return this.dayOfNewYearDay < 1 ? 1 : 8 - this.dayOfNewYearDay + 1; // new week start on Monday
    },
    oneWeekTimeInterval() {
      return (
        new Date(this.year, 0, 8).getTime() -
        new Date(this.year, 0, 1).getTime()
      );
    }
  },
  data() {
    return {
      company: {
        name: ""
      },
      worker: {
        name: ""
      },
      selectedWeekNumber: 1,
      daysOfSelectedWeek: [],
      totalHours: 0,
      category: ""
    };
  },
  methods: {
    getDaysOfSelectedWeek() {
      const firstDayOfSelectedWeek = new Date(
        new Date(this.year, 0, this.startOfSecondWeek).getTime() +
          (this.selectedWeekNumber - 2) * this.oneWeekTimeInterval
      );
      this.daysOfSelectedWeek = [firstDayOfSelectedWeek];
      let i = 6;
      while (i > 0) {
        this.daysOfSelectedWeek.push(
          new Date(
            firstDayOfSelectedWeek.getTime() + 24 * 60 * 60 * 1000 * (7 - i)
          )
        );
        i--;
      }
    },
    submitExpenses() {}
    // router.patch(
    //   '/:companyId/:id/submit',
    //   authMiddleware,
    //   companyRoleMiddleware(['owner', 'manager', 'worker']),
    //   trimRequest.all,
    //   validator.submitTimeSheet,
    //   controller.submitTimeSheet
    // )
  },
  mounted() {
    this.selectedWeekNumber =
      2 +
      Math.floor(
        (new Date().getTime() -
          new Date(this.year, 0, this.startOfSecondWeek).getTime()) /
          this.oneWeekTimeInterval
      ); // current week number

    // companyApi.getById({
    //   companyId: this.$store.state.user.companyId,
    // }).then(res => {
    //   this.company = res;
    // });

    // userApi.getCompanyWorkers({
    //   companyId: this.$store.state.user.companyId,
    //   pagination: 0,
    // }).then(res => {
    //   console.log('res', res);
    //   this.workers = res;
    // });
  },
  watch: {
    selectedWeekNumber() {
      this.getDaysOfSelectedWeek();
    }
  }
};
</script>

<style scoped></style>
