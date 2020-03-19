<template>
  <div id="page_timesheets" class="dashboard-content">
    <h1 class="color-red">TimeSheets & Expenses</h1>
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
    <div class="row justify-content-end">
      <button class="btn btn-red" @click="showAddExpensesModal = true">
        Add expenses
        <i class="hiway-crm-icon icon-euro ml-4"></i>
      </button>
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
              ></i>
              <i v-else class="table-icon hiway-crm-icon icon-euro"></i>
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
                <b-dropdown-item href="#" @click="goToTimesheet(props)">
                  {{ $t("page_timesheets.table.view_timesheet") }}
                </b-dropdown-item>
              </b-dropdown>
              <button
                class="btn btn-transparent"
                @click.stop="deleteTimesheetConfirm(props)"
                v-if="props.row.status !== TIME_SHEET_STATE.SUBMITTED"
              >
                <i class="hiway-crm-icon icon-bin" />
              </button>
            </div>
            <span v-else-if="props.column.field === 'activeState'">
              {{
                props.formattedRow[props.column.field] ? "active" : "inactive"
              }}
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <time-sheets-modal
      :row-data.sync="selectedRow"
      :modal-open.sync="showTimeSheetsModal"
    />
<!--    <expenses-modal-->
<!--      :modal-open.sync="showAddExpensesModal"-->
<!--    />-->
  </div>
</template>

<script>
import TableFilter from "@/components/common/TableFilter";
import { APP_URL, TIME_SHEET_STATE } from "@/constants";
import workLogApi from "@/services/api/workLog";
import TimeSheetsModal from "./TimeSheetsModal";
// import ExpensesModal from "./ExpensesModal";

export default {
  name: "timesheets",
  components: {
    // ExpensesModal,
    TableFilter,
    TimeSheetsModal,
  },
  data() {
    return {
      APP_URL,
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
          field: "timeSheetData.weekNumber",
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
          label: this.$t("page_timesheets.table.employer"),
          field: this.hiringManager(),
          name: "employer"
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
      showAddExpensesModal: false,
      selectedRow: {},
      TIME_SHEET_STATE,
    };
  },
  mounted() {
    this.getTimeSheets();
  },
  methods: {
    getTimeSheets() {
      const { companyId } = this.$store.state.user;

      return workLogApi
              .getByCompany({
                ...this.serverParams,
                companyId,
              })
              .then(({ docs, totalDocs }) => {
                this.rows = docs;
                this.totalRows = totalDocs;
              });
    },
    summedHours() {
      return function(row) {
        return (row.type === 'timesheet' && row.timeSheetData.totalHours.toString()) || (row.type === 'expense' && row.expenseData.hoursWorked.toString());
      };
    },
    expensePrice() {
      return function(row) {
        return (row.type === 'timesheet' && ' ') || (row.type === 'expense' && row.expenseData.amount);
      };
    },
    hiringManager() {
      return function(row) {
        return (row.hiringManager && row.hiringManager[0]) ? (row.hiringManager[0].firstName + ' ' + row.hiringManager[0].lastName) : ''
      };
    },
    onRowClick(prop) {
      this.selectedRow = prop.row;
      if (prop.row.type === 'timesheet') {
        this.showTimeSheetsModal = true;
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
    deleteTimeSheetConfirm(props) {
      // todo: show delete confirmation modal
    },
    goToTimesheet() {
      //
    }
  }
};
</script>
