<template>
  <div id="offers" class="dashboard-content">
    <h1 class="title">
      {{ $t("page_offers.title") }}
    </h1>
    <p class="sub-title">
      {{ $t("page_offers.sub_title", { offers: this.totalRows }) }}
    </p>
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

export default {
  name: "OfferList",
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
          label: this.$t("page_offers.table.job"),
          field: "job",
          name: "job"
        },
        {
          label: this.$t("page_offers.table.manager"),
          field: "manager",
          name: "manager"
        },
        {
          label: this.$t("page_offers.table.created_at"),
          field: "createdAt",
          name: "createdAt"
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
      }
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
    }
  }
};
</script>
