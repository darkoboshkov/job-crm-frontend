<template>
  <div id="page_timesheets" class="dashboard-content">
    <h1 class="title">
      {{ $t("page_timesheets.title") }}
    </h1>
    <p class="sub-title">
      {{
        $t("page_timesheets.sub_title", {
          timesheetsCount: this.timesheetsCount,
          expensesCount: this.expensesCount
        })
      }}
    </p>
    <hr />
    <div class="row">
      <div class="col">
        <div class="d-flex justify-content-end">
          <button class="btn btn-red" @click="showAddExpenseModal">
            {{ $t("page_timesheets.add_expenses") }}
            <i class="hiway-crm-icon icon-euro ml-4"></i>
          </button>
        </div>
      </div>
    </div>
    <hr />
    <div class="d-flex justify-content-between">
      <table-filter
        class="companies-filters"
        @table-filter="filter"
        :title="'Filter Options'"
        :options="filterOptions"
      />
      <div class="view-switch">
        View:
        <i
          class="hiway-crm-icon icon-ol pointer"
          @click="imageView(true)"
          :style="{ opacity: imageMode ? 1 : 0.3 }"
        />
        |
        <i
          class="hiway-crm-icon icon-ul pointer"
          @click="imageView(false)"
          :style="{ opacity: !imageMode ? 1 : 0.3 }"
        />
      </div>
    </div>
    <div class="row">
      <div class="col timesheets-list mt-3">
        <vue-good-table
          mode="remote"
          @on-page-change="onPageChange"
          @on-sort-change="onSortChange"
          @on-column-filter="onColumnFilter"
          @on-row-click="onRowClick"
          @on-per-page-change="onPerPageChange"
          :totalRows="totalRows"
          :rows="rows"
          :columns="columns"
          :sort-options="{ enabled: false }"
          :pagination-options="paginationOptions"
          styleClass="custom-table"
        >
          <template slot="table-row" slot-scope="props">
            <div
              v-if="props.column.field === 'kind'"
              class="d-flex align-items-center"
            >
              <i
                v-if="props.row.type === 'timesheet'"
                class="table-icon hiway-crm-icon icon-watch color-cobalt"
              />
              <i v-else class="table-icon hiway-crm-icon icon-euro" />
            </div>
            <div v-else-if="props.column.field === 'actions'" class="d-flex">
              <b-dropdown
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
                offset="0"
                class="icon-dropdown m-2"
              >
                <template v-slot:button-content>
                  <i class="hiway-crm-icon icon-more-vertical color-black" />
                </template>
                <b-dropdown-item v-if="props.row.type === 'timesheet'" href="#">
                  {{ $t("page_timesheets.table.view_timesheet") }}
                </b-dropdown-item>
                <b-dropdown-item v-if="props.row.type === 'expense'" href="#">
                  {{ $t("page_timesheets.table.view_expense") }}
                </b-dropdown-item>
              </b-dropdown>
              <!-- eslint-next-line-disable -->
              <template
                v-if="
                  props.row.status !== timeSheetStatus.SUBMITTED &&
                    props.row.status !== timeSheetStatus.APPROVED
                "
              >
                <button
                  class="btn btn-transparent"
                  @click.stop="deleteTimeSheetConfirm(props)"
                >
                  <i class="hiway-crm-icon icon-bin" />
                </button>
              </template>
            </div>
            <div v-else-if="props.column.field === 'status'">
              {{ props.row.status ? $t(`status.${props.row.status}`) : "" }}
            </div>
            <span v-else-if="props.column.field === 'submitDate'">
              {{ props.formattedRow[props.column.field] | dateFormatter }}
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <time-sheets-modal
      :row-data.sync="selectedTimeSheetRow"
      :modal-open.sync="showTimeSheetsModal"
      @refresh="getTimeSheets()"
    />
    <expenses-modal
      :row-data.sync="selectedExpenseRow"
      :modal-open.sync="showExpensesModal"
      :mode="expensesModalMode"
      @refresh="getTimeSheets()"
    />
  </div>
</template>

<script>
import TableFilter from "@/components/common/TableFilter";
import { timeSheetStatus, workerTimesheetsTable } from "@/constants";
import workLogsApi from "@/services/api/worklogs";
import TimeSheetsModal from "./components/TimeSheetsModal";
import ExpensesModal from "./components/ExpensesModal";

export default {
  name: "timesheets",
  components: {
    ExpensesModal,
    TableFilter,
    TimeSheetsModal
  },
  data() {
    return {
      imageMode: true,
      isLoading: true,
      totalRows: 0,
      paginationOptions: workerTimesheetsTable.pagination.paginationOptions,
      rows: [],
      serverParams: workerTimesheetsTable.pagination.serverParams,
      filterOptions: workerTimesheetsTable.filterOptions,
      showTimeSheetsModal: false,
      showExpensesModal: false,
      selectedTimeSheetRow: {},
      selectedExpenseRow: {},
      expensesModalMode: "edit",
      selectedRow: {},
      timeSheetStatus,

      timesheetsCount: 0,
      expensesCount: 0,
      companyId: this.$store.state.user.companyId
    };
  },
  mounted() {
    this.getTimeSheets();
    this.getTimeSheetsCount();
    this.getExpensesCount();
  },
  computed: {
    columns() {
      let columns = this.imageMode
        ? [
            {
              label: this.$t("page_timesheets.table.kind"),
              field: "kind",
              name: "kind"
            }
          ]
        : [];

      return columns.concat(workerTimesheetsTable.columns);
    }
  },
  methods: {
    imageView(mode) {
      this.imageMode = !!mode;
    },
    showAddExpenseModal() {
      this.selectedExpenseRow = {
        expenseData: {
          amount: "",
          attachments: [],
          commentDescription: "",
          category: "other"
        }
      };
      this.expensesModalMode = "add";
      this.showExpensesModal = true;
    },
    getTimeSheets() {
      workLogsApi
        .getByWorker({
          ...this.serverParams,
          companyId: this.companyId
        })
        .then(({ docs, totalDocs }) => {
          this.rows = docs?.map(row => {
            row.hiringManager = this.getFullName(row.hiringManager[0]);
            row.hiringCompany = row.hiringCompany[0].name;
            row.worker = this.getFullName(row.worker[0]);
            if (row.type === "timesheet") {
              row.hours = row.timeSheetData.totalHours.toString();
              row.week = row.timeSheetData.weekNumber;
            } else if (row.type === "expense") {
              row.price = row.expenseData.amount;
            }
            return row;
          });
          this.totalRows = totalDocs;
        });
    },
    getTimeSheetsCount() {
      workLogsApi
        .getByWorker({
          ...this.serverParams,
          filter: { and: [{ key: "type", value: "timesheet", opt: "eq" }] },
          companyId: this.companyId
        })
        .then(({ docs, totalDocs }) => {
          this.timesheetsCount = totalDocs;
        });
    },
    getExpensesCount() {
      workLogsApi
        .getByWorker({
          ...this.serverParams,
          filter: { and: [{ key: "type", value: "expense", opt: "eq" }] },
          companyId: this.companyId
        })
        .then(({ docs, totalDocs }) => {
          this.expensesCount = totalDocs;
        });
    },
    onRowClick(prop) {
      if (prop.row.type === "timesheet") {
        this.selectedTimeSheetRow = prop.row;
        this.showTimeSheetsModal = true;

        this.selectedExpenseRow = {
          expenseData: {
            date: "",
            amount: "",
            attachments: [],
            commentDescription: "",
            category: "other"
          }
        };
      }
      if (prop.row.type === "expense") {
        this.expensesModalMode = "edit";
        this.selectedExpenseRow = prop.row;
        this.showExpensesModal = true;
      }
    },
    onPageChange(e) {
      this.serverParams = Object.assign({}, this.serverParams, {
        page: e.currentPage
      });
      this.getTimeSheets();
    },
    onSortChange(e) {
      //
    },
    onColumnFilter(e) {
      //
    },
    onPerPageChange(e) {
      this.serverParams = Object.assign({}, this.serverParams, {
        limit: e.currentPerPage
      });
      this.getTimeSheets();
    },
    filter(v) {
      const filter = { or: [], and: [] };
      const kind = v[0].value;
      const week = Number(v[1].value);
      const status = v[2].value;

      if (kind) {
        filter.and.push({ key: "type", value: kind, opt: "eq" });
      }
      if (week) {
        filter.and.push({
          key: "timeSheetData.weekNumber",
          value: week,
          opt: "eq"
        });
      }
      if (status) {
        filter.and.push({ key: "status", value: status, opt: "eq" });
      }
      this.serverParams = Object.assign({}, this.serverParams, { filter });
      this.getTimeSheets();
    },
    goToTimeSheet(props) {
      //
    },
    deleteWorkLog(props) {
      workLogsApi
        .delete({
          ...props.row
        })
        .then(res => {
          this.getTimeSheets();
          this.$store.dispatch("updateShowSuccessModal", true);
          this.$store.dispatch("updateSuccessModalContent", {
            title: this.$t("page_timesheets.modal.delete_success.title", {
              type: "timesheet"
            }),
            subTitle: this.$t("page_timesheets.modal.delete_success.sub_title"),
            button: this.$t("page_timesheets.modal.delete_success.continue")
          });
        });
    },
    deleteTimeSheetConfirm(props) {
      this.$store.dispatch("updateShowErrorModal", true);
      this.$store.dispatch("updateErrorModalContent", {
        title: this.$t("page_timesheets.modal.delete_confirm.title", {
          type: "timesheet",
          method: "clear"
        }),
        subTitle: this.$t("page_timesheets.modal.delete_confirm.sub_title"),
        button: this.$t("page_timesheets.modal.delete_confirm.continue"),
        onButtonClick: () => {
          this.$store.dispatch("updateShowErrorModal", false);
          this.deleteWorkLog(props);
        }
      });
    }
  }
};
</script>
