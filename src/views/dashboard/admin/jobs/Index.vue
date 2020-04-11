<template>
  <div id="page_jobs" class="dashboard-content">
    <div class="d-flex justify-content-between align-items-end">
      <h1 class="title">
        {{ $t("page_jobs.title") }}
      </h1>
      <img
        class="pointer"
        src="@/assets/image/icon/person-add.svg"
        @click="$router.push({ name: 'admin-job-create' })"
      />
    </div>
    <p class="sub-title">
      {{ $t("page_jobs.sub_title", { jobs: this.totalRows }) }}
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
    <div class="jobs-list mt-3">
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
              <b-dropdown-item @click="goToJob(props)">
                {{ $t("page_jobs.table.view_job") }}
              </b-dropdown-item>
              <b-dropdown-item @click="goToMatching(props)">
                {{ $t("page_jobs.table.start_matching") }}
              </b-dropdown-item>
            </b-dropdown>
            <button
              class="btn btn-transparent"
              @click="deleteJobConfirm(props)"
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
                v-if="props.row.company.logo"
                :src="props.row.company.logo | appUrlFormatter"
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
import jobsApi from "@/services/api/jobs";

export default {
  name: "JobList",
  components: { TableFilter },
  data() {
    return {
      isLoading: true,
      paginationOptions: {
        enabled: true,
        perPage: 5
      },
      rows: [],
      filterOptions: [
        {
          title: this.$t("page_jobs.filter.title"),
          type: "text",
          value: ""
        },
        {
          title: this.$t("page_jobs.filter.wage"),
          type: "text",
          value: ""
        },
        {
          title: this.$t("page_jobs.filter.rate"),
          type: "text",
          value: ""
        },
        {
          title: this.$t("page_jobs.filter.start_date"),
          type: "text",
          value: ""
        },
        {
          title: this.$t("page_jobs.filter.end_date"),
          type: "text",
          value: ""
        }
      ],
      searchTerm: "",
      matched: false,
      totalRows: 0,
      serverParams: {
        page: 1,
        limit: 5,
        sort: "",
        order: ""
      },
      selectedJob: null,
      imageMode: true
    };
  },
  computed: {
    role() {
      return this.$store.state.user.role;
    },
    columns() {
      let columns = this.imageMode
        ? [
            {
              label: this.$t("page_jobs.table.image"),
              field: "image",
              name: "image"
            }
          ]
        : [];

      return columns.concat([
        {
          label: this.$t("page_jobs.table.title"),
          field: "title",
          name: "title"
        },
        {
          label: this.$t("page_jobs.table.company"),
          field: "company.name",
          name: "company"
        },
        {
          label: this.$t("page_jobs.table.manager"),
          field: "manager",
          name: "manager"
        },
        {
          label: this.$t("page_jobs.table.wage"),
          field: "wage",
          name: "wage"
        },
        {
          label: this.$t("page_jobs.table.rate"),
          field: "payRate",
          name: "payRate"
        },
        {
          label: this.$t("page_jobs.table.start_date"),
          field: "startDate",
          name: "startDate"
        },
        {
          label: this.$t("page_jobs.table.end_date"),
          field: "endDate",
          name: "endDate"
        },
        {
          label: this.$t("page_jobs.table.actions"),
          field: "actions",
          name: "actions"
        }
      ]);
    }
  },
  mounted() {
    this.getJobs();
  },
  methods: {
    imageView(mode) {
      this.imageMode = !!mode;
    },
    getJobs() {
      jobsApi.getAll(this.serverParams).then(res => {
        this.totalRows = res.totalDocs;
        this.rows = res.docs?.map(row => {
          row.company = row.company[0];
          row.startDate = this.getDateString(row.startDate);
          row.endDate = this.getDateString(row.endDate);
          row.manager = this.getFullName(row.manager[0]);
          return row;
        });
      });
    },
    onPerPageChange(e) {
      this.serverParams = Object.assign({}, this.serverParams, {
        limit: e.currentPerPage
      });
      this.getJobs();
    },
    onPageChange(e) {
      this.serverParams = Object.assign({}, this.serverParams, {
        page: e.currentPage
      });
      this.getJobs();
    },
    onCellClick(params) {
      if (params.column.name !== "actions") {
        this.goToJob(params);
      }
    },
    filter(v) {},
    goToJob(props) {
      if (props && props.row) {
        this.$router.push(
          `/${this.role}/dashboard/jobs/${props.row.company._id}/${props.row._id}`
        );
      }
    },
    goToMatching(props) {
      if (props && props.row) {
        this.$router.push(
          `/${this.role}/dashboard/jobs/${props.row.company._id}/${props.row._id}/matching`
        );
      }
    },
    deleteJobConfirm(props) {
      this.$store.dispatch("updateShowErrorModal", true);
      this.$store.dispatch("updateErrorModalContent", {
        title: this.$t("page_jobs.modal.delete.title"),
        subTitle: this.$t("page_jobs.modal.delete.sub_title"),
        button: this.$t("page_jobs.modal.delete.continue"),
        onButtonClick: () => {
          this.deleteJob();
        }
      });

      this.selectedJob = props.row;
    },
    deleteJob() {
      jobsApi
        .delete({
          companyId: this.selectedJob.company._id,
          _id: this.selectedJob._id
        })
        .then(res => {
          this.$store.dispatch("updateShowErrorModal", false);
          this.getJobs();
        });
    }
  }
};
</script>
