<template>
    <b-modal
            ref="modal-time-sheets"
            size="lg"
            :hide-footer="true"
            :hide-header="true"
            centered
            modal-class="modal-add-hours"
            v-model="showModal"
    >
        <h2 class="color-red py-4">
            {{ $t("page_timesheets.modal.add_hours") }}
        </h2>
        <b-card
            class="mb-2"
        >
            <div class="d-flex justify-content-between">
                <div class="d-inline-block">
                    <span class="color-blue mr3">
                        {{ $t("page_timesheets.modal.employer") }}:
                    </span>
                    &nbsp;<b-input class="d-inline-block" style="width: 175px;" :value="employer" disabled />
                </div>
                <div class="d-inline-block">
                    <span class="color-blue mr3">
                        {{ $t("page_timesheets.modal.employee") }}:
                    </span>
                    &nbsp;<b-input class="d-inline-block" style="width: 175px;" :value="employee" disabled />
                </div>
            </div>
        </b-card>

        <b-card
            no-body
            class="mb-2"
        >
            <div style="padding: 20px; border-bottom: 1px solid #ececec;">
                <b-dropdown
                    :text="`Week ${selectedWeekNumber}`"
                    variant="transparent"
                    menu-class="week-number-menu"
                    toggle-class="week-number-toggle"
                    v-model="selectedWeekNumber"
                    :disabled="inputDisabled"
                >
                    <b-dropdown-item
                            v-for="weekNumber in Array(52).fill().map((i, idx) => idx)"
                            :key="weekNumber"
                            @click="selectedWeekNumber = weekNumber"
                    >
                        {{ $t("page_timesheets.modal.week") }} {{ weekNumber }}
                    </b-dropdown-item>
                </b-dropdown>
            </div>
            <div>
                <div class="d-flex justify-content-between align-items-center" style="padding: 12px 20px; border-bottom: 1px solid #ececec;">
                    <div class="flex-1">{{ $t("page_timesheets.modal.date") }}</div>
                    <div style="width: 100px;">{{ $t("page_timesheets.modal.hours") }}</div>
                    <div style="width: 100px;">{{ $t("page_timesheets.modal.hours") }}</div>
                    <div style="width: 100px;">{{ $t("page_timesheets.modal.percentage") }}</div>
                    <div style="width: 80px;">{{ $t("page_timesheets.modal.travel_expenses") }}</div>
                    <div style="width: 100px;">{{ $t("page_timesheets.modal.adjust_travel_expenses") }}</div>
                </div>
                <div class="d-flex justify-content-between align-items-center" style="padding: 12px 20px;" v-for="d in daysOfSelectedWeek">
                    <div class="flex-1">{{d.date | dateFormatter}}</div>
                    <div style="width: 100px;"><b-input style="width: 60px;" :disabled="inputDisabled" v-model="d.normalWageHours" /></div>
                    <div style="width: 100px;"><b-input style="width: 60px;" :disabled="inputDisabled" v-model="d.adjustedWageHours" /></div>
                    <div style="width: 100px;"><b-input style="width: 60px;" :disabled="inputDisabled" v-model="d.percentOfAdjustedWage" /></div>
                    <div style="width: 80px;"><b-check switch size="lg" :disabled="inputDisabled" v-model="d.isTravelExpense" /></div>
                    <div class="d-flex align-items-center" style="width: 100px;"><b-input style="width: 60px; margin-right: 0.5rem;" :disabled="inputDisabled" v-model="d.distanceTraveled" />km</div>
                </div>
            </div>
        </b-card>

        <b-card
            class="mb-2"
        >
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-inline-block">
                    {{ $t("page_timesheets.modal.worked_total_hours", { selectedWeekNumber: this.selectedWeekNumber, totalHours: this.totalHours }) }}
                </div>
                <div class="d-inline-block">
                    <template v-if="timeSheetsData.status === TIME_SHEET_STATE.NOT_SUBMITTED || timeSheetsData.status === TIME_SHEET_STATE.DECLINED">
                        <button class="btn btn-red" @click="saveHours">
                            {{ $t("page_timesheets.modal.save_hours") }}
                        </button>
                    </template>
                    <template v-else-if="timeSheetsData.status === TIME_SHEET_STATE.SUBMITTED">
                        <button class="btn btn-red" @click="approveHours">
                            {{ $t("page_timesheets.modal.approve_hours") }}
                        </button>
                        <button class="btn btn-secondary ml-3" @click="declineHours">
                            {{ $t("page_timesheets.modal.decline_hours") }}
                        </button>
                    </template>
                    <template v-else-if="timeSheetsData.status === TIME_SHEET_STATE.APPROVED">
                        <!-- nothing to show -->
                    </template>
                </div>
            </div>
        </b-card>
    </b-modal>
</template>

<script>
  import workLogApi from '@/services/api/workLog';
  import dateFormatter from "@/helpers/DateFormatter";
  import { TIME_SHEET_STATE } from '@/constants';

  export default {
    name: "TimeSheetsModal",
    props: {
      modalOpen: {
        type: Boolean,
        default: function() {
          return false
        }
      },
      rowData: {
        default: function() {
          return {}
        }
      }
    },
    computed: {
      showModal: {
        get() {
          return this.modalOpen;
        },
        set(v) {
          this.$emit('update:modalOpen', v);
        }
      },
      timeSheetsData: {
        get() {
          return this.rowData;
        },
        set(v) {
          this.$emit('update:row-data', v);
        },
      },
      inputDisabled() {
        return this.timeSheetsData.status === TIME_SHEET_STATE.APPROVED;
      },
      employer() {
        if (
          this.timeSheetsData.worker
          && this.timeSheetsData.worker[0]
          && this.timeSheetsData.worker[0].firstName
          && this.timeSheetsData.worker[0].lastName
        ) {
          return `${this.timeSheetsData.worker[0].firstName} ${this.timeSheetsData.worker[0].lastName}`
        }

        return '';
      },
      employee() {
        if (
          this.timeSheetsData.hiringManager
          && this.timeSheetsData.hiringManager[0]
          && this.timeSheetsData.hiringManager[0].firstName
          && this.timeSheetsData.hiringManager[0].lastName
        ) {
          return `${this.timeSheetsData.hiringManager[0].firstName} ${this.timeSheetsData.hiringManager[0].lastName}`
        }

        return '';
      },
      year() {
        return new Date().getFullYear();
      },
      dayOfNewYearDay() {
        return new Date(this.year, 0, 1).getDay();
      },
      startOfSecondWeek() {
        return this.dayOfNewYearDay < 1 ? 1 : (8 - this.dayOfNewYearDay + 1); // new week start on Monday
      },
      oneWeekTimeInterval() {
        return new Date(this.year, 0, 8).getTime() - new Date(this.year, 0, 1).getTime();
      },
      totalNormalWageHours() {
        return this.daysOfSelectedWeek.reduce(function(acc, day) {
          return acc + day.normalWageHours;
        }, 0);
      },
      totalAdjustedWageHours() {
        return this.daysOfSelectedWeek.reduce(function(acc, day) {
          return acc + day.adjustedWageHours;
        }, 0);
      },
      totalHours() {
        return this.totalNormalWageHours + this.totalAdjustedWageHours;
      },
    },
    data() {
      return {
        addMode: false,
        selectedWeekNumber: 1,
        daysOfSelectedWeek: [],
        TIME_SHEET_STATE
      }
    },
    methods: {
      getDaysOfSelectedWeek() {
        const firstDayOfSelectedWeek = new Date(new Date(this.year, 0, this.startOfSecondWeek).getTime() + (this.selectedWeekNumber - 2) * this.oneWeekTimeInterval);
        this.daysOfSelectedWeek = [{
          date: firstDayOfSelectedWeek.toDateString(),
          normalWageHours: 0,
          adjustedWageHours: 0,
          percentOfAdjustedWage: 0,
          isTravelExpense: false,
          distanceTraveled: 0,
        }];
        let i = 6;
        while (i > 0) {
          this.daysOfSelectedWeek.push(
            {
              date: (new Date(firstDayOfSelectedWeek.getTime() + 24 * 60 * 60 * 1000 * (7 - i))).toDateString(),
              normalWageHours: 0,
              adjustedWageHours: 0,
              percentOfAdjustedWage: 0,
              isTravelExpense: false,
              distanceTraveled: 0,
            });
          i--;
        }
      },
      saveHours() {
        const { companyId, _id } = this.timeSheetsData;

        workLogApi.save({
          companyId,
          _id
        }).then(res => {
          const { timeSheetData, status } = res;
          this.timeSheetsData = {
            ...this.timeSheetsData,
            timeSheetData: {
              ...this.timeSheetsData.timeSheetData,
              ...timeSheetData
            },
            status,
          };
        });
      },
      approveHours() {
        const { companyId, _id } = this.timeSheetsData;

        workLogApi.approve({
          companyId,
          _id
        }).then(res => {
          const { timeSheetData, status } = res;
          this.timeSheetsData = {
            ...this.timeSheetsData,
            timeSheetData: {
              ...this.timeSheetsData.timeSheetData,
              ...timeSheetData
            },
            status,
          };
        });
      },
      declineHours() {
        const { companyId, _id } = this.timeSheetsData;

        workLogApi.decline({
          companyId,
          _id
        }).then(res => {
          const { timeSheetData, status } = res;
          this.timeSheetsData = {
            ...this.timeSheetsData,
            timeSheetData: {
              ...this.timeSheetsData.timeSheetData,
              ...timeSheetData
            },
            status,
          };
        });
      }
    },
    mounted() {
      this.selectedWeekNumber = 2 + Math.floor((new Date().getTime() - new Date(this.year, 0, this.startOfSecondWeek).getTime()) / this.oneWeekTimeInterval); // current week number
    },
    watch: {
      selectedWeekNumber() {
        // this.getDaysOfSelectedWeek();
      },
      'timeSheetsData.timeSheetData.data'(weekDays) {
        this.selectedWeekNumber = 2 + Math.floor((new Date(weekDays[0].date).getTime() - new Date(this.year, 0, this.startOfSecondWeek).getTime()) / this.oneWeekTimeInterval); // current week number
        this.daysOfSelectedWeek = weekDays;
      },
    },
    filters: {
      dateFormatter(string) {
        return dateFormatter(new Date(string));
      },
    }
  }
</script>

<style scoped>

</style>
