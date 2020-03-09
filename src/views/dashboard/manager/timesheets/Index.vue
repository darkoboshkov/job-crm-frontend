<template>
  <div id="page_timesheets" class="dashboard-content">
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
      <button class="btn btn-red">
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
          @on-cell-click="onCellClick"
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
                v-if="props.row.kind === 'hour'"
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
                @click="deleteTimesheetConfirm(props)"
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
  </div>
</template>

<script>
import TableFilter from "@/components/common/TableFilter";
import { APP_URL } from "@/constants";

export default {
  name: "timesheets",
  components: {
    TableFilter
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
        columnFilters: {},
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
          field: "week",
          name: "week"
        },
        {
          label: this.$t("page_timesheets.table.hand_in_date"),
          field: "hand_in_date",
          name: "hand_in_date"
        },
        {
          label: this.$t("page_timesheets.table.price"),
          field: "price",
          name: "price"
        },
        {
          label: this.$t("page_timesheets.table.employer"),
          field: "employer",
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
      ]
    };
  },
  mounted() {
    this.getTimesheets();
  },
  methods: {
    getTimesheets() {
      this.rows = [
        {
          kind: "hour",
          week: 51,
          hand_in_date: "Maandag 8 december 2",
          hours: "38",
          price: null,
          employer: "Kruidvat",
          status: "In afwachting"
        },
        {
          kind: "expense",
          week: 51,
          hand_in_date: "Maandag 8 december 2",
          hours: null,
          price: 238.77,
          employer: "Kruidvat",
          status: "In afwachting"
        },
        {
          kind: "hour",
          week: 51,
          hand_in_date: "Maandag 8 december 2",
          hours: "38",
          price: null,
          employer: "Kruidvat",
          status: "In afwachting"
        },
        {
          kind: "expense",
          week: 51,
          hand_in_date: "Maandag 8 december 2",
          hours: null,
          price: 238.77,
          employer: "Kruidvat",
          status: "In afwachting"
        },
        {
          kind: "hour",
          week: 51,
          hand_in_date: "Maandag 8 december 2",
          hours: "38",
          price: null,
          employer: "Kruidvat",
          status: "In afwachting"
        },
        {
          kind: "expense",
          week: 51,
          hand_in_date: "Maandag 8 december 2",
          hours: null,
          price: 238.77,
          employer: "Kruidvat",
          status: "In afwachting"
        },
        {
          kind: "hour",
          week: 51,
          hand_in_date: "Maandag 8 december 2",
          hours: "38",
          price: null,
          employer: "Kruidvat",
          status: "In afwachting"
        },
        {
          kind: "expense",
          week: 51,
          hand_in_date: "Maandag 8 december 2",
          hours: null,
          price: 238.77,
          employer: "Kruidvat",
          status: "In afwachting"
        }
      ];
    },
    onPageChange(e) {
      this.serverParams = Object.assign({}, this.serverParams, {
        page: e.currentPage
      });
      this.getCompanies();
    },
    onSortChange(e) {
      this.getCompanies();
    },
    onColumnFilter(e) {
      this.getCompanies();
    },
    onCellClick(params) {
      if (params.column.name !== "actions") {
        this.goToCompany(params);
      }
    },
    onPerPageChange(e) {
      this.serverParams = Object.assign({}, this.serverParams, {
        limit: e.currentPerPage
      });
      this.getCompanies();
    },
    filter() {
      //
    },
    deleteTimesheetConfirm() {},
    goToTimesheet() {
      //
    }
  }
};
</script>
