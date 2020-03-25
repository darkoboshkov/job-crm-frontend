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
    <b-card class="mb-3">
      <div class="d-flex justify-content-between">
        <div class="d-inline-block">
          <span class="color-blue mr-3">
            {{ $t("page_timesheets.modal.worker") }}:
          </span>
          &nbsp;<b-input
            class="d-inline-block"
            style="width: 175px;"
            :value="worker"
            disabled
          />
        </div>
        <div class="d-inline-block">
          <span class="color-blue mr-3">
            {{ $t("page_timesheets.modal.hiring_manager") }}:
          </span>
          &nbsp;<b-input
            class="d-inline-block"
            style="width: 175px;"
            :value="hiringManager"
            disabled
          />
        </div>
      </div>
    </b-card>

    <b-card no-body class="mb-3">
      <div style="padding: 20px; border-bottom: 1px solid #ececec;">
        <span class="color-blue mr-3">
          Week:
        </span>
        <b-input
          class="d-inline-block"
          style="width: 175px;"
          :value="selectedWeekNumber"
          disabled
        />
        <!--        <b-dropdown-->
        <!--          :text="`Week ${selectedWeekNumber}`"-->
        <!--          variant="transparent"-->
        <!--          menu-class="week-number-menu"-->
        <!--          toggle-class="week-number-toggle"-->
        <!--          v-model="selectedWeekNumber"-->
        <!--          disabled-->
        <!--        >-->
        <!--          <b-dropdown-item-->
        <!--            v-for="weekNumber in Array(52)-->
        <!--              .fill()-->
        <!--              .map((i, idx) => idx)"-->
        <!--            :key="weekNumber"-->
        <!--            @click="selectedWeekNumber = weekNumber"-->
        <!--          >-->
        <!--            {{ $t("page_timesheets.modal.week") }} {{ weekNumber }}-->
        <!--          </b-dropdown-item>-->
        <!--        </b-dropdown>-->

        <span class="through">
          {{
            $t("page_timesheets.modal.through", {
              from:
                daysOfSelectedWeek[0] &&
                getISODateString(daysOfSelectedWeek[0].date),
              to:
                daysOfSelectedWeek[6] &&
                getISODateString(daysOfSelectedWeek[6].date)
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
            <div class="flex-1">{{ d.date | dateFormatter }}</div>
            <div>
              <b-input
                type="text"
                style="width: 60px;"
                :disabled="inputDisabled"
                v-model="d.normalWageHours"
              />
            </div>
            <div>
              <b-input
                type="text"
                style="width: 60px;"
                :disabled="inputDisabled"
                v-model="d.adjustedWageHours"
              />
            </div>
            <div>
              <b-input
                type="text"
                style="width: 60px;"
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
                class="d-inline-block"
                style="width: 60px; margin-right: 0.5rem;"
                :disabled="inputDisabled"
                v-model="d.distanceTraveled"
              />km
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

    <b-card class="mb-3 timesheet-contractors">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-inline-block conclusion">
          {{ $t("page_timesheets.modal.worked_overview_1") }}
          <span class="empress"
            >{{ $t("page_timesheets.modal.worked_overview_2") }}
            {{ selectedWeekNumber }}</span
          >
          {{ $t("page_timesheets.modal.worked_overview_3") }}
          <span class="empress"
            >{{ totalHours }}
            {{ $t("page_timesheets.modal.worked_overview_4") }}</span
          >
          {{ $t("page_timesheets.modal.worked_overview_5") }}.
        </div>
        <div class="d-inline-block">
          <template
            v-if="
              timeSheetsData.status === TIME_SHEET_STATE.NOT_SUBMITTED ||
                timeSheetsData.status === TIME_SHEET_STATE.DECLINED
            "
          >
            <button class="btn btn-blue" @click="saveHours">
              {{ $t("page_timesheets.modal.save_hours") }}
            </button>
            <button class="btn btn-red ml-3" @click="sendHours">
              {{ $t("page_timesheets.modal.send_hours") }}
            </button>
          </template>
          <template
            v-else-if="timeSheetsData.status === TIME_SHEET_STATE.SUBMITTED"
          >
            <button class="btn btn-red" @click="adjustHours">
              {{ $t("page_timesheets.modal.adjust_hours") }}
            </button>
          </template>
          <template
            v-else-if="timeSheetsData.status === TIME_SHEET_STATE.APPROVED"
          >
            <!-- nothing to show -->
          </template>
        </div>
      </div>
    </b-card>
  </b-modal>
</template>

<script>
import workLogApi from "@/services/api/workLog";
import { TIME_SHEET_STATE } from "@/constants";

export default {
  name: "TimeSheetsModal",
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
        this.$emit("update:rowData", v);
      }
    },
    inputDisabled() {
      return (
        this.timeSheetsData.status === TIME_SHEET_STATE.APPROVED ||
        this.timeSheetsData.status === TIME_SHEET_STATE.SUBMITTED
      );
    },
    worker() {
      if (this.timeSheetsData.worker && this.timeSheetsData.worker[0]) {
        return this.getFullName(this.timeSheetsData.worker[0]);
      }

      return "";
    },
    hiringManager() {
      if (
        this.timeSheetsData.hiringManager &&
        this.timeSheetsData.hiringManager[0]
      ) {
        return this.getFullName(this.timeSheetsData.hiringManager[0]);
      }

      return "";
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
      TIME_SHEET_STATE
    };
  },
  methods: {
    adjustHours() {
      const { _id } = this.timeSheetsData;
      const { companyId } = this.$store.state.user;

      workLogApi
        .adjust({
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
    saveHours() {
      const { companyId } = this.$store.state.user;

      workLogApi
        .save({
          ...this.timeSheetsData,
          companyId
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
    sendHours() {
      const { companyId } = this.$store.state.user;

      workLogApi
        .send({
          ...this.timeSheetsData,
          companyId
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
  mounted() {
    //
  },
  watch: {
    timeSheetsData(v) {
      this.daysOfSelectedWeek = this.timeSheetsData.timeSheetData.data;
      this.selectedWeekNumber = this.timeSheetsData.timeSheetData.weekNumber;
    }
  }
};
</script>

<style scoped></style>
