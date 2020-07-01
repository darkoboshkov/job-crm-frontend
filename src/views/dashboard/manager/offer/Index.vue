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
              <!-- eslint-disable -->
							<img v-if="props.row.contractType === 'company' && props.row.hiringCompany.logo"
									 :src="props.row.hiringCompany.logo | appUrlFormatter"
							/>
							<img v-if="props.row.contractType === 'worker' && props.row.workerImage"
									 :src="props.row.workerImage | appUrlFormatter"
							/>
							<!-- eslint-enable -->
            </div>
          </div>
          <span v-else-if="props.column.field === 'contractType'">
            {{ $t(`contract.${props.row.contractType}`) }}
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
import jobOffersApi from "@/services/api/joboffers";
import companiesApi from "@/services/api/companies";
import { offersTable } from "@/constants";

export default {
  name: "OfferList",
  components: { TableFilter },
  data() {
    return {
      isLoading: true,
      rows: [],
      companies: [],
      searchTerm: "",
      matched: false,
      totalRows: 0,
      filterOptions: offersTable.filterOptions,
      paginationOptions: offersTable.pagination.paginationOptions,
      serverParams: offersTable.pagination.serverParams,
      imageMode: true
    };
  },
  computed: {
    role() {
      return this.$store.state.user.role;
    },
    companyId() {
      return this.$store.state.user.companyId;
    },
    columns() {
      let columns = this.imageMode
        ? [
            {
              label: this.$t("page_offers.table.image"),
              field: "image",
              name: "image"
            }
          ]
        : [];

      return columns.concat(offersTable.columns);
    }
  },
  mounted() {
    this.getActiveOffers();
    this.getCompanies();
  },
  methods: {
    imageView(mode) {
      this.imageMode = !!mode;
    },
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
      if (props && props.row) {
        /* eslint-disable */
        if (props.row.companyId === props.row.hiringCompanyId && this.companyId === props.row.companyId) {
          this.$router.push(`/${this.role}/dashboard/joboffers/${props.row._id}`);
        }
        if (props.row.companyId !== props.row.hiringCompanyId && this.companyId === props.row.companyId) {
          this.$router.push(`/${this.role}/dashboard/joboffers/${props.row._id}/intermediary`);
        }
        if (props.row.companyId !== props.row.hiringCompanyId &&this.companyId !== props.row.companyId) {
          if (props.row.intermediaryStatus === "open") {
            this.$store.dispatch("updateShowErrorModal", true);
            this.$store.dispatch("updateErrorModalContent", {
              title: this.$t("page_offers.modal.disallow.title"),
              subTitle: this.$t("page_offers.modal.disallow.sub_title"),
              button: ""
            });
            return false;
          }
          this.$router.push(`/${this.role}/dashboard/joboffers/${props.row._id}/hiring-company`);
        }
        /* eslint-enable */
      }
    },
    getActiveOffers() {
      jobOffersApi
        .getAllByCompany(
          Object.assign(this.serverParams, {
            companyId: this.companyId
          })
        )
        .then(res => {
          this.rows = res.docs?.map(row => {
            row.job = row.job ? row.job[0].title : "";
            row.image = row.job ? row.job[0].image : "";
            row.company = row.company[0];
            row.hiringCompany = row.hiringCompany[0];
            row.createdAt = this.getDateString(row.createdAt);
            row.startDate = this.getDateString(row.startDate);
            row.endDate = this.getDateString(row.endDate);
            row.manager = this.getFullName(row.manager[0]);
            row.workerImage = row.worker[0].image;
            row.worker = this.getFullName(row.worker[0]);
            /* eslint-disable */
            row.contractType = this.getContractType(row.companyId, row.hiringCompanyId);
            row.status = this.getContractStatus(row.status, row.intermediaryStatus);
            /* eslint-enable */

            return row;
          });

          this.totalRows = res.totalDocs;
        });
    },
    filter(v) {
      const filter = { or: [], and: [] };
      const title = v[0].value;
      const workerName = v[1].value;
      const hiringCompany = v[2].value;
      const startDateFrom = v[3].items[0].value;
      const startDateTo = v[3].items[1].value;
      const endDateFrom = v[4].items[0].value;
      const endDateTo = v[4].items[1].value;
      const status = v[5].value;

      if (title) {
        filter.and.push({ key: "job.title", value: title, opt: "in" });
      }
      if (workerName) {
        filter.or = [
          { key: "worker.firstName", value: workerName, opt: "in" },
          { key: "worker.lastName", value: workerName, opt: "in" },
          { key: "worker.middleName", value: workerName, opt: "in" }
        ];
      }
      if (hiringCompany) {
        filter.and.push({
          key: "hiringCompany._id",
          value: hiringCompany,
          opt: "eq"
        });
      }
      if (startDateFrom) {
        filter.and.push({ key: "startDate", value: startDateFrom, opt: "gte" });
      }
      if (startDateTo) {
        filter.and.push({ key: "startDate", value: startDateTo, opt: "lte" });
      }
      if (endDateFrom) {
        filter.and.push({ key: "endDate", value: endDateFrom, opt: "gte" });
      }
      if (endDateTo) {
        filter.and.push({ key: "endDate", value: endDateTo, opt: "lte" });
      }
      if (status) {
        filter.and.push({ key: "status", value: status, opt: "eq" });
      }
      this.serverParams = Object.assign({}, this.serverParams, { filter });
      this.getActiveOffers();
    },
    getCompanies() {
      companiesApi
        .getAllowed({ companyId: this.companyId, pagination: 0 })
        .then(res => {
          this.companies = res.docs;
          this.filterOptions[2].options = [];
          this.filterOptions[2].options.push({ text: "", value: "" });
          this.companies?.forEach(item => {
            this.filterOptions[2].options.push({
              text: item.name,
              value: item._id
            });
          });
        });
    }
  }
};
</script>
