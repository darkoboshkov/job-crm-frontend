<template>
  <div id="page_companies" class="dashboard-content">
    <div class="d-flex justify-content-between align-items-end">
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
        ></i>
        |
        <i
          class="hiway-crm-icon icon-ul pointer"
          @click="imageView(false)"
          :style="{ opacity: !imageMode ? 1 : 0.261 }"
        ></i>
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
        :pagination-options="paginationOptions"
        :isLoading.sync="isLoading"
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
              <b-dropdown-item href="#" @click="goToCompany(props)">{{
                $t("page_companies.table.view_company")
              }}</b-dropdown-item>
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
            <img
              src="@/assets/image/company-flooop-logo.png"
              class="rounded-circle border mr-2"
              style="width:32px;"
            />
          </div>
          <span v-else-if="props.column.field === 'activeState'">
            {{ props.formattedRow[props.column.field] ? "active" : "inactive"}}
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </div>
    <b-modal
      ref="modal-alert"
      :hide-footer="true"
      :hide-header="true"
      centered
      modal-class="modal-alert"
    >
      <div class="text-center">
        <img class="success-image" src="@/assets/image/icon/alert.svg" />
        <p class="alert-title color-blue">
          {{ $t("page_companies.modal.company_delete.title") }}
        </p>
        <p class="alert-sub-title">
          {{ $t("page_companies.modal.company_delete.sub_title") }}
        </p>
        <button class="btn btn-blue" @click="deleteCompany">
          {{ $t("page_companies.modal.company_delete.continue") }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import TableFilter from "@/components/common/TableFilter";
  import companyApi from "@/services/api/companies";

export default {
  name: "CompanyList",
  components: { TableFilter },
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
      filterOptions: [
        {
          title: this.$t("page_companies.filter.name"),
          type: "text",
          value: ""
        },
        {
          title: this.$t("page_companies.filter.email"),
          type: "text",
          value: ""
        },
        {
          title: this.$t("page_companies.filter.status"),
          type: "checkbox",
          value: "",
          options: [
            {
              label: this.$t("page_companies.filter.active"),
              checked: false
            },
            {
              label: this.$t("page_companies.filter.inactive"),
              checked: false
            }
          ]
        },
        {
          title: this.$t("page_companies.filter.city"),
          type: "text",
          value: ""
        }
      ],
      serverParams: {
        columnFilters: {},
        page: 1,
        limit: 5,
        sort: "",
        order: ""
      },
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

      return columns.concat([
        {
          label: this.$t("page_companies.table.name"),
          field: "name",
          name: "name"
        },
        {
          label: this.$t("page_companies.table.owner"),
          field: "email",
          name: "email"
        },
        {
          label: this.$t("page_companies.table.kvk"),
          field: "kvkNumber",
          name: "kvk"
        },
        {
          label: this.$t("page_companies.table.since"),
          field: this.formattedDateTime(),
          name: "createdAt"
        },
        {
          label: this.$t("page_companies.table.status"),
          field: "activeState",
          name: "activeState"
        },
        {
          label: this.$t("page_companies.table.actions"),
          field: "actions",
          name: "actions"
        }
      ]);
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
    formattedDateTime() {
      return function(row) {
        const dateStringOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        };

        return new Date(row["createdAt"]).toLocaleDateString(
          "nl-NL",
          dateStringOptions
        );
      };
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
    onCellClick(params) {},
    onPerPageChange(e) {
      this.serverParams = Object.assign({}, this.serverParams, {
        limit: e.currentPerPage
      });
      this.getCompanies();
    },
    filter(v) {
      console.log('filter', v);
    },
    goToCompany(props) {
      if (props && props.row) {
        this.$router.push(`/${this.role}/dashboard/companies/${props.row._id}`);
      }
    },
    deleteCompanyConfirm(props) {
      this.$refs["modal-alert"].show();
      this.idToDelete = props?.row?._id;
    },
    deleteCompany() {
      this.$refs["modal-alert"].hide();
      companyApi
        .delete({
          companyId: this.idToDelete
        })
        .then(() => {
          this.getCompanies();
        });
    },
    getCompanies() {
      return companyApi.get(this.serverParams).then(res => {
        this.totalRows = res.totalDocs;
        this.rows = res.docs;
      });
    }
  }
};
</script>

<style scoped></style>
