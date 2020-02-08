<template>
  <div id="page_companies" class="dashboard-content">
    <div class="d-flex justify-content-between align-items-end">
      <h1 class="title">
        {{ $t("COMPANIES") }}
      </h1>
      <button class="btn btn-red circle large" style="width:50px">
        <i class="hiway-crm-icon icon-add" />
      </button>
    </div>
    <p class="sub-title">We have found {{ totalRows }} companies</p>
    <div class="companies-list mt-3">
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
        :pagination-options="paginationOptions"
        styleClass="custom-table"
      >
        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field === 'actions'" class="d-flex">
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
              <b-dropdown-item href="#" @click="goToCompany(props)"
              >{{ $t("VIEW_COMPANY") }}</b-dropdown-item
              >
            </b-dropdown>
            <button class="btn btn-transparent">
              <i class="hiway-crm-icon icon-bin" />
            </button>
          </div>
          <div
            v-else-if="props.column.field === 'image'"
            class="d-flex align-items-center"
          >
            <img
              src="@/assets/image/company-flooop-logo.png"
              class="rounded-circle border mr-2"
              style="width:32px;"
            />
          </div>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import companyApi from "@/services/api/companies";

export default {
  name: "CompanyList",
  data() {
    return {
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
      columns: [
        { label: "Image", field: "image", name: "image" },
        { label: "Name", field: "name", name: "name" },
        { label: "Email", field: "email", name: "email" },
        { label: "Created At", field: "createdAt", name: "createdAt" },
        { label: "Status", field: "activeState", name: "activeState" },
        { label: "Actions", field: "actions", name: "actions" }
      ]
    };
  },
  mounted() {
    this.getCompanies();
  },
  methods: {
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
    onCellClick(params) {},
    onPerPageChange(e) {
      this.serverParams = Object.assign({}, this.serverParams, {
        limit: e.currentPerPage
      });
      this.getCompanies();
    },
    filter(v) {},
    goToCompany(props) {},
    createCompany() {},
    deleteCompany() {},
    getCompanies() {
      return companyApi
        .getAll(this.serverParams)
        .then(res => {
          this.totalRows = res.totalDocs;
          this.rows = res.docs;
        });
    }
  }
};
</script>

<style scoped></style>
