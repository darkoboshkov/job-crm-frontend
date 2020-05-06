<template>
  <div id="page_companies" class="dashboard-content">
    <div class="d-flex justify-content-between align-items-start">
      <h1 class="title">
        {{ $t("page_companies.title") }}
      </h1>
      <router-link to="/admin/dashboard/companies/create">
        <button class="btn btn-red circle large" style="width:50px">
          <i class="hiway-crm-icon icon-add" />
        </button>
      </router-link>
    </div>
    <p class="sub-title">
      {{ $t("page_companies.sub_title", { companies: this.totalRows }) }}
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
        :sort-options="{ enabled: false }"
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
              <b-dropdown-item href="#" @click="goToCompany(props)">
                {{ $t("page_companies.table.view_company") }}
              </b-dropdown-item>
            </b-dropdown>
            <button
              class="btn btn-transparent"
              @click="deleteCompanyConfirm(props)"
            >
              <i class="hiway-crm-icon icon-bin" />
            </button>
          </div>
          <div
            v-else-if="props.column.field === 'image'"
            class="d-flex align-items-center"
          >
            <div class="avatar-image mr-2">
              <img
                v-if="props.row.logo"
                :src="props.row.logo | appUrlFormatter"
              />
            </div>
          </div>
          <span v-else-if="props.column.field === 'activeState'">
            {{
              props.formattedRow[props.column.field]
                ? $t("status.active")
                : $t("status.inactive")
            }}
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import TableFilter from "@/components/common/TableFilter";
import companyApi from "@/services/api/companies";
import { companiesTable } from "@/constants";

export default {
  name: "CompanyList",
  components: { TableFilter },
  data() {
    return {
      imageMode: true,
      isLoading: true,
      totalRows: 0,
      rows: [],
      filterOptions: companiesTable.filterOptions,
      serverParams: companiesTable.pagination.serverParams,
      paginationOptions: companiesTable.pagination.paginationOptions,
      idToDelete: 0
    };
  },
  computed: {
    columns() {
      let columns = this.imageMode
        ? [
            {
              label: this.$t("page_companies.table.image"),
              field: "image",
              name: "image",
              tdClass: "link"
            }
          ]
        : [];

      return columns.concat(companiesTable.columns);
    },
    role() {
      return this.$store.state.user.role;
    }
  },
  mounted() {
    this.getCompanies();
  },
  methods: {
    imageView(mode) {
      this.imageMode = !!mode;
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
    filter(v) {
      console.log("filter", v);
    },
    goToCompany(props) {
      if (props && props.row) {
        this.$router.push(`/${this.role}/dashboard/companies/${props.row._id}`);
      }
    },
    deleteCompanyConfirm(props) {
      this.$store.dispatch("updateShowErrorModal", true);
      this.$store.dispatch("updateErrorModalContent", {
        title: this.$t("page_companies.modal.company_delete.title"),
        subTitle: this.$t("page_companies.modal.company_delete.sub_title"),
        button: this.$t("page_companies.modal.company_delete.continue"),
        onButtonClick: () => {
          this.deleteCompany();
        }
      });

      this.idToDelete = props?.row?._id;
    },
    deleteCompany() {
      companyApi
        .delete({
          companyId: this.idToDelete
        })
        .then(() => {
          this.$store.dispatch("updateShowErrorModal", false);
          this.getCompanies();
        });
    },
    getCompanies() {
      companyApi.get(this.serverParams).then(res => {
        this.totalRows = res.totalDocs;
        this.rows = res.docs?.map(row => {
          row.createdAt = this.getDateString(row["createdAt"]);
          return row;
        });
      });
    }
  }
};
</script>

<style scoped></style>
