<template>
  <div id="page_timesheets" class="dashboard-content">
    <h1 class="color-red">
      {{ $t("page_timesheets.title") }}
    </h1>
    <p class="sub-title">
      {{ $t("page_timesheets.sub_title", { timesheetsCount: this.timesheetsCount, expensesCount: this.expensesCount }) }}
    </p>
    <div class="container-fluid">
      <!--      <div class="row">-->
      <!--        <div class="col-md-3 d-flex">-->
      <!--          <b-card-->
      <!--            title="Worked Hours this month"-->
      <!--            tag="article"-->
      <!--            style="max-width: 20rem;"-->
      <!--            class="mb-2"-->
      <!--          >-->
      <!--            <b-card-text>-->
      <!--              <i class="card-icon hiway-crm-icon icon-watch"></i>-->
      <!--              <span class="card-value">156</span>-->
      <!--            </b-card-text>-->
      <!--          </b-card>-->
      <!--        </div>-->
      <!--        <div class="col-md-3 d-flex">-->
      <!--          <b-card-->
      <!--            title="Approved Hours this month"-->
      <!--            tag="article"-->
      <!--            style="max-width: 20rem;"-->
      <!--            class="mb-2"-->
      <!--          >-->
      <!--            <b-card-text>-->
      <!--              <i class="card-icon hiway-crm-icon icon-list"></i>-->
      <!--              <span class="card-value">123</span>-->
      <!--            </b-card-text>-->
      <!--          </b-card>-->
      <!--        </div>-->
      <!--        <div class="col-md-3 d-flex">-->
      <!--          <b-card-->
      <!--            title="Hours to be approved"-->
      <!--            tag="article"-->
      <!--            style="max-width: 20rem;"-->
      <!--            class="mb-2"-->
      <!--          >-->
      <!--            <b-card-text>-->
      <!--              <i class="card-icon hiway-crm-icon icon-hourglass"></i>-->
      <!--              <span class="card-value">33</span>-->
      <!--            </b-card-text>-->
      <!--          </b-card>-->
      <!--        </div>-->
      <!--        <div class="col-md-3 d-flex">-->
      <!--          <b-card-->
      <!--            title="Total Expenses this month"-->
      <!--            tag="article"-->
      <!--            style="max-width: 20rem;"-->
      <!--            class="mb-2"-->
      <!--          >-->
      <!--            <b-card-text>-->
      <!--              <i class="card-icon hiway-crm-icon icon-euro"></i>-->
      <!--              <span class="card-value">€2350.36</span>-->
      <!--            </b-card-text>-->
      <!--          </b-card>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <table-filter
      class="companies-filters"
      @table-filter="filter"
      :title="'Filter Options'"
      :options="filterOptions"
    />
    <div class="row">
      <div class="timesheets-list mt-3">
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
                <b-dropdown-item
                        v-if="props.row.type === 'timesheet'"
                        href="#"
                >
                  {{ $t("page_timesheets.table.view_timesheet") }}
                </b-dropdown-item>
                <b-dropdown-item
                        v-if="props.row.type === 'expense'"
                        href="#"
                >
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
            <span v-else-if="props.column.field === 'activeState'">
              {{
                props.formattedRow[props.column.field] ? "active" : "inactive"
              }}
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
    ExpensesModal,
    TableFilter,
    TimeSheetsModal
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
      filterOptions: [
        // {
        //   title: this.$t("page_companies.filter.name"),
        //   type: "text",
        //   value: ""
        // },
        // {
        //   title: this.$t("page_companies.filter.email"),
        //   type: "text",
        //   value: ""
        // },
        // {
        //   title: this.$t("page_companies.filter.status"),
        //   type: "checkbox",
        //   value: "",
        //   options: [
        //     {
        //       label: this.$t("page_companies.filter.active"),
        //       checked: false
        //     },
        //     {
        //       label: this.$t("page_companies.filter.inactive"),
        //       checked: false
        //     }
        //   ]
        // },
        // {
        //   title: this.$t("page_companies.filter.city"),
        //   type: "text",
        //   value: ""
        // }
      ],
      columns: [
        {
          label: this.$t("page_timesheets.table.kind"),
          field: "kind",
          name: "kind"
        },
        {
          label: this.$t("page_timesheets.table.week"),
          field: this.timeSheetWeek(),
          name: "week"
        },
        {
          label: this.$t("page_timesheets.table.hand_in_date"),
          field: "submitDate",
          name: "hand_in_date"
        },
        {
          label: this.$t("page_timesheets.table.hours"),
          field: this.summedHours(),
          name: "hours"
        },
        {
          label: this.$t("page_timesheets.table.price"),
          field: this.expensePrice(),
          name: "price"
        },
        {
          label: this.$t("page_timesheets.table.hiring_manager"),
          field: this.hiringManager(),
          name: "hiring_manager"
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
      ],
      showTimeSheetsModal: false,
      showExpensesModal: false,
      selectedTimeSheetRow: {},
      selectedExpenseRow: {},
      expensesModalMode: "edit",
      selectedRow: {},
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
  methods: {
    getTimeSheets() {
      const { companyId } = this.$store.state.user;
      return workLogApi
        .getByCompany({
          ...this.serverParams,
          companyId
        })
        .then(({ docs, totalDocs }) => {
          this.rows = docs;
          this.totalRows = totalDocs;
        });
    },
    getTimeSheetsCount() {
      const {companyId} = this.$store.state.user;

      return workLogApi
        .getByCompany({
          ...this.serverParams,
          filter: {
            type: 'timesheet'
          },
          companyId
        })
        .then(({docs, totalDocs}) => {
          this.timesheetsCount = totalDocs;
        });
    },
    getExpensesCount() {
      const { companyId } = this.$store.state.user;

      return workLogApi
        .getByCompany({
          ...this.serverParams,
          filter: {
            type: 'expense'
          },
          companyId
        })
        .then(({ docs, totalDocs }) => {
          this.expensesCount = totalDocs;
        });
    },
    timeSheetWeek() {
      return row => {
        if (row && row.type === "timesheet") {
          return row.timeSheetData.weekNumber;
        }

        return "";
      };
    },
    summedHours() {
      return row => {
        if (row && row.type === "timesheet") {
          return row.timeSheetData.totalHours.toString();
        }

        return "";
      };
    },
    expensePrice() {
      return row => {
        if (row && row.type === "expense") {
          return row.expenseData.amount;
        }
        return "";
      };
    },
    hiringManager() {
      return row => {
        if (row.hiringManager && row.hiringManager[0]) {
          return this.getFullName(row.hiringManager[0]);
        }
        return "";
      };
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
      return workLogApi
        .delete({
          ...props.row
        })
        .then(res => {
          this.getTimeSheets();
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
          this.deleteWorkLog(props).then(() => {
            this.$store.dispatch("updateShowErrorModal", false);
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
        }
      });
    }
  }
};
</script>
