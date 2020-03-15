<template>
    <b-modal
            ref="modal-add-hours"
            size="lg"
            :hide-footer="true"
            :hide-header="true"
            centered
            modal-class="modal-add-hours"
            v-model="showModal"
    >
        <h2 class="color-red py-4">Add Hours</h2>
        <b-card
            class="mb-2"
        >
            <div class="d-flex justify-content-between">
                <div class="d-inline-block">
                    <span class="color-blue mr3">Employer:</span>&nbsp;<b-input class="d-inline-block w-50" v-model="company.name" disabled />
                </div>
                <div class="d-inline-block">
                    <span class="color-blue mr3">Employee:</span>&nbsp;<b-input class="d-inline-block w-50" v-model="worker.name" />
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
                >
                    <b-dropdown-item
                            v-for="weekNumber in Array(52).fill().map((i, idx) => idx)"
                            :key="weekNumber"
                            @click="selectedWeekNumber = weekNumber"
                    >
                        Week {{ weekNumber }}
                    </b-dropdown-item>
                </b-dropdown>
            </div>
            <div>
                <div class="d-flex justify-content-between align-items-center" style="padding: 12px 20px; border-bottom: 1px solid #ececec;">
                    <div class="flex-1">Date</div>
                    <div style="width: 100px;">Hours</div>
                    <div style="width: 100px;">Hours</div>
                    <div style="width: 100px;">Percentage</div>
                    <div style="width: 80px;">Travel Expenses</div>
                    <div style="width: 100px;">Adjust travel expenses</div>
                </div>
                <div class="d-flex justify-content-between align-items-center" style="padding: 12px 20px;" v-for="d in daysOfSelectedWeek">
                    <div class="flex-1">{{d | dateFormatter}}</div>
                    <div style="width: 100px;"><b-input style="width: 60px;" /></div>
                    <div style="width: 100px;"><b-input style="width: 60px;" /></div>
                    <div style="width: 100px;"><b-input style="width: 60px;" /></div>
                    <div style="width: 80px;"><b-check switch size="lg" /></div>
                    <div class="d-flex align-items-center" style="width: 100px;"><b-input style="width: 60px; margin-right: 0.5rem;" />km</div>
                </div>
            </div>
        </b-card>

        <b-card
            class="mb-2"
        >
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-inline-block">
                    In week {{ selectedWeekNumber }} you worked a total of {{ totalHours }} hours.
                </div>
                <div class="d-inline-block">
                    <button class="btn btn-blue mr-2">Save hours</button>
                    <button class="btn btn-red">Send hours</button>
                </div>
            </div>
        </b-card>
    </b-modal>
</template>

<script>
  import companyApi from '@/services/api/companies';
  import dateFormatter from "@/helpers/DateFormatter";

  export default {
    name: "AddHoursModal",
    props: {
      modalOpen: {
        type: Boolean,
        default: function() {
          return false
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
      }
    },
    data() {
      return {
        company: {
          name: ''
        },
        worker: {
          name: ''
        },
        selectedWeekNumber: 1,
        daysOfSelectedWeek: [],
        totalHours: 0,
      }
    },
    methods: {
      getDaysOfSelectedWeek() {
        const firstDayOfSelectedWeek = new Date(new Date(this.year, 0, this.startOfSecondWeek).getTime() + (this.selectedWeekNumber - 2) * this.oneWeekTimeInterval);
        this.daysOfSelectedWeek = [firstDayOfSelectedWeek];
        let i = 6;
        while (i > 0) {
          this.daysOfSelectedWeek.push(new Date(firstDayOfSelectedWeek.getTime() + 24 * 60 * 60 * 1000 * (7 - i)));
          i--;
        }
      }
    },
    mounted() {
      this.selectedWeekNumber = 2 + Math.floor((new Date().getTime() - new Date(this.year, 0, this.startOfSecondWeek).getTime()) / this.oneWeekTimeInterval); // current week number
    },
    watch: {
      selectedWeekNumber() {
        this.getDaysOfSelectedWeek();
      }
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
