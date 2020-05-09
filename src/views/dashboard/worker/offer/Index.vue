<template>
  <div id="offers" class="dashboard-content">
    <h1 class="title">
      {{ $t("page_offers.title") }}
    </h1>
    <p class="sub-title">
      {{ $t("page_offers.sub_title", { offers: this.totalRows }) }}
    </p>
    <hr />
    <div class="d-flex justify-content-between">
      <table-filter
        class="candidate-filters"
        @table-filter="filter"
        :title="'Filter Options'"
        :options="filterOptions"
      />
    </div>
    <div class="offers-list mt-3">
      <vue-good-table
        mode="remote"
        @on-page-change="onPageChange"
        @on-per-page-change="onPerPageChange"
        @on-cell-click="onCellClick"
        :totalRows="totalRows"
        :rows="rows"
        :columns="columns"
        :pagination-options="paginationOptions"
        :search-options="{ enabled: false }"
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
              <b-dropdown-item href="#" @click="goToOffer(props)">
                {{ $t("page_offers.table.view_offer") }}
              </b-dropdown-item>
            </b-dropdown>
          </div>
          <div v-else-if="props.column.field === 'status'">
            {{ props.row.status ? $t(`status.${props.row.status}`) : "" }}
          </div>
          <div
            v-else-if="props.column.field === 'image'"
            class="d-flex align-items-center"
          >
            <div class="avatar-image mr-2">
              <img
                v-if="props.row.hiringCompany.logo"
                :src="props.row.hiringCompany.logo | appUrlFormatter"
              />
            </div>
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
import offersApi from "@/services/api/joboffers";
import TableFilter from "@/components/common/TableFilter";
import { workerOffersTable } from "@/constants";

export default {
  name: "OfferList",
  components: { TableFilter },
  data() {
    return {
      isLoading: true,
      columns: workerOffersTable.columns,
      filterOptions: workerOffersTable.filterOptions,
      paginationOptions: workerOffersTable.pagination.paginationOptions,
      serverParams: workerOffersTable.pagination.serverParams,
      rows: [],
      searchTerm: "",
      matched: false,
      totalRows: 0
    };
  },
  computed: {
    role() {
      return this.$store.state.user.role;
    },
    companyId() {
      return this.$store.state.user.companyId;
    }
  },
  mounted() {
    this.getActiveOffers();
  },
  methods: {
    onPerPageChange(e) {
      this.serverParams = Object.assign({}, this.serverParams, {
        limit: e.currentPerPage
      });
      this.getActiveOffers();
    },
    onPageChange(e) {
      this.serverParams = Object.assign({}, this.serverParams, {
        page: e.currentPage
      });
      this.getActiveOffers();
    },
    onCellClick(params) {
      if (params.column.name !== "actions") {
        this.goToOffer(params);
      }
    },
    goToOffer(props) {
      if (props.row.status === "open") {
        this.$store.dispatch("updateShowErrorModal", true);
        this.$store.dispatch("updateErrorModalContent", {
          title: this.$t("page_offers.modal.disallow.title"),
          subTitle: this.$t("page_offers.modal.disallow.sub_title"),
          button: ""
        });
        return false;
      }
      if (props && props.row) {
        this.$router.push(`/${this.role}/dashboard/joboffers/${props.row._id}`);
      }
    },
    getActiveOffers() {
      offersApi
        .getAllByWorker({
          ...this.serverParams,
          companyId: this.companyId
        })
        .then(res => {
          this.rows = res.docs?.map(row => {
            row.job = row.job ? row.job[0].title : "";
            row.image = row.job ? row.job[0].image : "";
            row.company = row.company[0];
            row.hiringCompany = row.hiringCompany[0];
            row.createdAt = this.getDateString(row.createdAt);
            row.manager = this.getFullName(row.manager[0]);
            return row;
          });
          this.totalRows = res.totalDocs;
        });
    },
    filter(v) {
      const filter = { or: [], and: [] };
      const title = v[0].value;
      const status = v[1].value;

      if (title) {
        filter.and.push({ key: "job.title", value: title, opt: "in" });
      }
      if (status) {
        filter.and.push({ key: "status", value: status, opt: "eq" });
      }
      this.serverParams = Object.assign({}, this.serverParams, { filter });
      this.getActiveOffers();
    }
  }
};
</script>
