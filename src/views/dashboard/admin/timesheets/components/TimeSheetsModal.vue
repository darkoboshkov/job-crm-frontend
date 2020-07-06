<template>
  <b-modal
    ref="modal-time-sheets"
    size="xl"
    :hide-footer="true"
    :hide-header="true"
    centered
    modal-class="modal-timesheet"
    v-model="showModal"
  >
    <h2 class="color-red py-4">
      {{ $t("page_timesheets.modal.add_hours") }}
    </h2>
    <b-card class="mb-3 timesheet-contractors">
      <div class="d-flex justify-content-between">
        <div class="d-inline-block">
          <span class="color-blue mr-3">
            {{ $t("page_timesheets.modal.worker") }}:
          </span>
          <b-input class="d-inline-block width-175" :value="worker" disabled />
        </div>
        <div class="d-inline-block">
          <span class="color-blue mr-3">
            {{ $t("page_timesheets.modal.hiring_manager") }}:
          </span>
          <b-input
            class="d-inline-block width-175"
            :value="hiringManager"
            disabled
          />
        </div>
      </div>
    </b-card>

    <b-card no-body class="mb-3">
      <div class="timesheet-week">
        <span class="color-blue mr-3">
          Week:
        </span>
        <b-input
          class="d-inline-block width-175"
          :value="selectedWeekNumber"
          disabled
        />
        <span class="through">
          {{
            $t("page_timesheets.modal.through", {
              from:
                daysOfSelectedWeek[0] &&
                getDateString(daysOfSelectedWeek[0].date),
              to:
                daysOfSelectedWeek[6] &&
                getDateString(daysOfSelectedWeek[6].date)
            })
          }}
        </span>
      </div>
      <div class="custom-table">
        <div
          class="d-flex justify-content-between align-items-center table-header"
        >
          <div class="flex-1 fw-500">
            {{ $t("page_timesheets.modal.date") }}
          </div>
          <div>
            {{ $t("page_timesheets.modal.hours") }}
            <div class="text-small">
              {{ $t("page_timesheets.modal.normal_wage") }}
            </div>
          </div>
          <div>
            {{ $t("page_timesheets.modal.hours") }}
            <div class="text-small">
              {{ $t("page_timesheets.modal.adjusted_wage") }}
            </div>
          </div>
          <div>
            {{ $t("page_timesheets.modal.percentage") }}
            <div class="text-small">
              {{ $t("page_timesheets.modal.adjusted_wage") }}
            </div>
          </div>
          <div>
            {{ $t("page_timesheets.modal.travel_expenses") }}
          </div>
          <div>
            {{ $t("page_timesheets.modal.adjust_travel_expenses") }}
            <div class="text-small">
              {{ $t("page_timesheets.modal.fill_in_total_traveled_km") }}
            </div>
          </div>
        </div>
        <div class="table-body">
          <div
            class="d-flex justify-content-between align-items-center table-row"
            v-for="d in daysOfSelectedWeek"
            :key="d.date"
          >
            <div class="flex-1 d-flex align-items-center">
              {{ d.date | dateFormatter }}
            </div>
            <div>
              <b-input
                type="text"
                class="width-60"
                :disabled="inputDisabled"
                v-model="d.normalWageHours"
              />
            </div>
            <div>
              <b-input
                type="text"
                class="width-60"
                :disabled="inputDisabled"
                v-model="d.adjustedWageHours"
              />
            </div>
            <div>
              <b-input
                type="text"
                class="width-60"
                :disabled="inputDisabled"
                v-model="d.percentOfAdjustedWage"
              />
            </div>
            <div class="d-flex align-items-center">
              <b-check
                switch
                size="lg"
                :disabled="inputDisabled"
                v-model="d.isTravelExpense"
              />
            </div>
            <div>
              <b-input
                type="text"
                class="d-inline-block width-60 mr-0-5"
                :disabled="inputDisabled"
                v-model="d.distanceTraveled"
              />
              km
            </div>
          </div>
        </div>
        <div
          class="d-flex justify-content-between align-items-center table-footer"
        >
          <div class="flex-1 empress">
            Total
          </div>
          <div class="empress">{{ totalNormalWageHours }} hours</div>
          <div class="empress">{{ totalAdjustedWageHours }} hours</div>
          <div></div>
          <div></div>
          <div class="empress">{{ totalTraveledKm }} km</div>
        </div>
      </div>
    </b-card>

    <b-card class="mb-2">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-inline-block conclusion">
          {{ $t("page_timesheets.modal.worked_overview_1") }}
          <span class="empress">
            {{ $t("page_timesheets.modal.worked_overview_2") }}
            {{ selectedWeekNumber }}
          </span>
          {{ $t("page_timesheets.modal.worked_overview_3") }}
          <span class="empress">
            {{ totalHours }}
            {{ $t("page_timesheets.modal.worked_overview_4") }}
          </span>
          {{ $t("page_timesheets.modal.worked_overview_5") }}.
        </div>
        <div class="d-inline-block">
          <template
            v-if="
              timeSheetsData.status === timeSheetStatus.NOT_SUBMITTED ||
                timeSheetsData.status === timeSheetStatus.DECLINED
            "
          >
            <button class="btn btn-blue" @click="saveHours">
              {{ $t("page_timesheets.modal.save_hours") }}
            </button>
          </template>
          <template
            v-else-if="timeSheetsData.status === timeSheetStatus.SUBMITTED"
          >
            <button class="btn btn-red" @click="approveHours">
              {{ $t("page_timesheets.modal.approve_hours") }}
            </button>
            <button class="btn btn-secondary ml-3" @click="declineHours">
              {{ $t("page_timesheets.modal.decline_hours") }}
            </button>
          </template>
          <template
            v-else-if="timeSheetsData.status === timeSheetStatus.APPROVED"
          >
            <!-- nothing to show -->
          </template>
        </div>
      </div>
    </b-card>
  </b-modal>
</template>

<script>
import workLogsApi from "@/services/api/worklogs";
import { timeSheetStatus } from "@/constants";

export default {
  name: "TimeSheetsModal",
  props: {
    modalOpen: {
      type: Boolean,
      default: false
    },
    rowData: {
      default: {}
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
    timeSheetsData: {
      get() {
        return this.rowData;
      },
      set(v) {
        this.$emit("update:row-data", v);
      }
    },
    inputDisabled() {
      return (
        this.timeSheetsData.status === timeSheetStatus.APPROVED ||
        this.timeSheetsData.status === timeSheetStatus.SUBMITTED
      );
    },
    worker() {
      return this.timeSheetsData.worker;
    },
    hiringManager() {
      return this.timeSheetsData.hiringManager;
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
    },
    totalNormalWageHours() {
      return this.daysOfSelectedWeek.reduce(function(acc, day) {
        return acc + Number(day.normalWageHours);
      }, 0);
    },
    totalAdjustedWageHours() {
      return this.daysOfSelectedWeek.reduce(function(acc, day) {
        return acc + Number(day.adjustedWageHours);
      }, 0);
    },
    totalTraveledKm() {
      return this.daysOfSelectedWeek.reduce(function(acc, day) {
        return acc + Number(day.distanceTraveled);
      }, 0);
    },
    totalHours() {
      return this.daysOfSelectedWeek.reduce(function(acc, day) {
        return (
          acc + Number(day.normalWageHours) + Number(day.adjustedWageHours)
        );
      }, 0);
    }
  },
  data() {
    return {
      addMode: false,
      selectedWeekNumber: 1,
      daysOfSelectedWeek: [],
      timeSheetStatus
    };
  },
  methods: {
    saveHours() {
      workLogsApi
        .save({
          ...this.timeSheetsData
        })
        .then(res => {
          const { timeSheetData, status } = res;
          this.timeSheetsData = {
            ...this.timeSheetsData,
            timeSheetData: {
              ...this.timeSheetsData.timeSheetData,
              ...timeSheetData
            },
            status
          };
          this.$emit("refresh");
          this.showModal = false;
        });
    },
    approveHours() {
      const { _id } = this.timeSheetsData;
      const { companyId } = this.timeSheetsData;

      workLogsApi
        .approve({
          companyId,
          _id
        })
        .then(res => {
          const { timeSheetData, status } = res;
          this.timeSheetsData = {
            ...this.timeSheetsData,
            timeSheetData: {
              ...this.timeSheetsData.timeSheetData,
              ...timeSheetData
            },
            status
          };
          this.$emit("refresh");
        });
    },
    declineHours() {
      const { _id } = this.timeSheetsData;
      const { companyId } = this.timeSheetsData;

      workLogsApi
        .decline({
          companyId,
          _id
        })
        .then(res => {
          const { timeSheetData, status } = res;
          this.timeSheetsData = {
            ...this.timeSheetsData,
            timeSheetData: {
              ...this.timeSheetsData.timeSheetData,
              ...timeSheetData
            },
            status
          };
          this.$emit("refresh");
        });
    }
  },
  watch: {
    timeSheetsData(v) {
      this.daysOfSelectedWeek = this.timeSheetsData.timeSheetData.data;
      this.selectedWeekNumber = this.timeSheetsData.timeSheetData.weekNumber;
    }
  }
};
</script>

<style scoped />
