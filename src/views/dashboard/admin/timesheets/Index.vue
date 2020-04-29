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
          :style="{ opacity: imageMode ? 1 : 0.261 }"
        />
        |
        <i
          class="hiway-crm-icon icon-ul pointer"
          @click="imageView(false)"
          :style="{ opacity: !imageMode ? 1 : 0.261 }"
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
                class="table-icon hiway-crm-icon icon-watch"
                style="background-color: var(--cobalt-blue)"
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
              <button
                class="btn btn-transparent"
                @click.stop="deleteTimeSheetConfirm(props)"
                v-if="
                  props.row.status !== TIME_SHEET_STATE.SUBMITTED &&
                    props.row.status !== TIME_SHEET_STATE.APPROVED
                "
              >
                <i class="hiway-crm-icon icon-bin" />
              </button>
            </div>
            <span v-else-if="props.column.field === 'status'">
              {{ props.row.status ? $t(`status.${props.row.status}`) : ""}}
            </span>
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
import { TIME_SHEET_STATE } from "@/constants";
import workLogApi from "@/services/api/workLog";
import TimeSheetsModal from "./TimeSheetsModal";
import ExpensesModal from "./ExpensesModal";

export default {
  name: "timesheets",
  components: {
    TableFilter,
    TimeSheetsModal,
    ExpensesModal
  },
  data() {
    return {
      imageMode: true,
      isLoading: true,
      totalRows: 0,
      paginationOptions: {
        enabled: true,
        perPage: 5
      },
      rows: [],
      serverParams: {
        page: 1,
        limit: 5,
        sort: "",
        order: ""
      },
      filterOptions: [],
      showTimeSheetsModal: false,
      showExpensesModal: false,
      selectedTimeSheetRow: {},
      selectedExpenseRow: {},
      expensesModalMode: "edit",
      TIME_SHEET_STATE,

      timesheetsCount: 0,
      expensesCount: 0
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

      return columns.concat([
        {
          label: this.$t("page_timesheets.table.week"),
          field: "week",
          name: "week"
        },
        {
          label: this.$t("page_timesheets.table.worker"),
          field: "worker",
          name: "worker"
        },
        {
          label: this.$t("page_timesheets.table.hand_in_date"),
          field: "submitDate",
          name: "hand_in_date"
        },
        {
          label: this.$t("page_timesheets.table.hours"),
          field: "hours",
          name: "hours"
        },
        {
          label: this.$t("page_timesheets.table.price"),
          field: "price",
          name: "price"
        },
        {
          label: this.$t("page_timesheets.table.hiring_manager"),
          field: "hiringManager",
          name: "hiring_manager"
        },
        {
          label: this.$t("page_timesheets.table.hiring_company"),
          field: "hiringCompany",
          name: "hiring_company"
        },
        {
          label: this.$t("page_timesheets.table.status"),
          field: "status",
          name: "status"
        },
        {
          label: this.$t("page_timesheets.table.actions"),
          field: "actions",
          name: "actions"
        }
      ]);
    }
  },
  methods: {
    imageView(mode) {
      this.imageMode = !!mode;
    },
    getTimeSheets() {
      workLogApi.getAll(this.serverParams).then(({ docs, totalDocs }) => {
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
      workLogApi
        .getAll({
          ...this.serverParams,
          filter: {
            type: "timesheet"
          }
        })
        .then(({ docs, totalDocs }) => {
          this.timesheetsCount = totalDocs;
        });
    },
    getExpensesCount() {
      workLogApi
        .getAll({
          ...this.serverParams,
          filter: {
            type: "expense"
          }
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
    filter() {
      //
    },
    goToTimeSheet(props) {
      //
    },
    deleteWorkLog(props) {
      workLogApi
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
            subTitle: this.$t(
                "page_timesheets.modal.delete_success.sub_title"
            ),
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
