<template>
  <div id="offers" class="dashboard-content">
    <div class="d-flex justify-content-between align-items-start">
      <h1 class="title">
        {{ $t("page_offers.title") }}
      </h1>
      <button
        class="btn btn-red circle large"
        style="width:50px"
      >
        <i class="hiway-crm-icon icon-add" />
      </button>
    </div>
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
    <div class="jobs-list mt-5">
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
import TableFilter from "@/components/common/TableFilter";
import offersApi from "@/services/api/joboffers";

export default {
  name: "OfferList",
  components: { TableFilter },
  data() {
    return {
      isLoading: true,
      paginationOptions: {
        enabled: true,
        perPage: 5
      },
      columns: [
        {
          label: this.$t("page_offers.table.image"),
          field: "image",
          name: "image"
        },
        {
          label: this.$t("page_offers.table.worker"),
          field: "worker",
          name: "worker"
        },
        {
          label: this.$t("page_offers.table.job"),
          field: "job",
          name: "job"
        },
        {
          label: this.$t("page_offers.table.hiring_company"),
          field: "hiringCompany.name",
          name: "hiringCompany"
        },
        {
          label: this.$t("page_offers.table.start_date"),
          field: "startDate",
          name: "startDate"
        },
        {
          label: this.$t("page_offers.table.end_date"),
          field: "endDate",
          name: "endDate"
        },
        {
          label: this.$t("page_offers.table.status"),
          field: "status",
          name: "status"
        },
        {
          label: this.$t("page_offers.table.actions"),
          field: "actions",
          name: "actions"
        }
      ],
      rows: [],
      searchTerm: "",
      matched: false,
      totalRows: 0,
      serverParams: {
        page: 1,
        limit: 5,
        sort: "",
        order: ""
      },
      filterOptions: [
        {
          title: this.$t("page_offers.filter.title"),
          type: "text",
          value: ""
        },
        {
          title: this.$t("page_offers.filter.worker_name"),
          type: "text",
          value: ""
        },
        {
          title: this.$t("page_offers.filter.hiring_company"),
          type: "select",
          options: [
            2,
            3
          ],
          value: ""
        },
        {
          title: this.$t("page_offers.filter.type"),
          type: "radio",
          value: "",
          options: [
            {
              label: this.$t("page_offers.filter.worker_contract"),
              value: "worker_contract"
            },
            {
              label: this.$t("page_offers.filter.company_contract"),
              value: "company_contract"
            }
          ]
        },
        {
          title: this.$t("page_offers.filter.start_date"),
          type: "datepicker",
          value: {
            'fromDate': '',
            'toDate': ''
          }
        },
        {
          title: this.$t("page_offers.filter.end_date"),
          type: "datepicker",
          value: {
            'fromDate': '',
            'toDate': ''
          }
        },
        {
          title: this.$t("page_offers.filter.status"),
          type: "select",
          options: [
            2,
            3
          ],
          value: ""
        }
      ],
      imageMode: true
    };
  },
  computed: {
    role() {
      return this.$store.state.user.role;
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
      if (props && props.row) {
        this.$router.push(
          `/${this.role}/dashboard/joboffers/${props.row.company._id}/${props.row._id}`
        );
      }
    },
    getActiveOffers() {
      offersApi.getAll().then(res => {
        this.rows = res.docs?.map(row => {
          row.job = row.job ? row.job[0].title : "";
          row.image = row.job ? row.job[0].image : "";
          row.company = row.company[0];
          row.hiringCompany = row.hiringCompany[0];
          row.createdAt = this.getDateString(row.createdAt);
          row.startDate = this.getDateString(row.startDate);
          row.endDate = this.getDateString(row.endDate);
          row.manager = this.getFullName(row.manager[0]);
          row.worker = this.getFullName(row.worker[0]);
          return row;
        });
        this.totalRows = res.totalDocs;
      });
    },
    imageView(mode) {
      this.imageMode = !!mode;
    },
    filter(v) {
      this.serverParams = Object.assign({}, this.serverParams, {
        title: v[0].value,
        worker_name: v[1].value,
        hiring_company: v[2].value,
        type: v[3].value,
        start_date: v[4].value,
        end_date: v[5].value,
        status: v[6].value
      });
      console.log(this.serverParams);
      this.getActiveOffers();
    }
  }
};
</script>
