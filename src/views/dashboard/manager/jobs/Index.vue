<template>
  <div id="jobs_candidates" class="dashboard-content">
    <div
      class="d-flex justify-content-between justify-content-between align-items-start"
    >
      <h1 class="title">
        {{ $t("page_jobs.title") }}
      </h1>
      <button
        class="btn btn-red circle large"
        style="width:50px"
        @click="$router.push({ name: 'manager-job-create' })"
      >
        <i class="hiway-crm-icon icon-add" />
      </button>
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
              <!--              <b-dropdown-item-->
              <!--                v-if="props.row.status === 'active'"-->
              <!--                @click="goToMatching(props)"-->
              <!--              >-->
              <!--                {{ $t("page_jobs.table.start_matching") }}-->
              <!--              </b-dropdown-item>-->
            </b-dropdown>
            <button
              class="btn btn-transparent"
              @click="deleteJobConfirm(props)"
            >
              <i class="hiway-crm-icon icon-bin" />
            </button>
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
import { jobsTable } from "@/constants";
import usersApi from "@/services/api/users";

export default {
  name: "JobList",
  components: { TableFilter },
  data() {
    return {
      isLoading: true,
      rows: [],
      managers: [],
      searchTerm: "",
      matched: false,
      totalRows: 0,
      filterOptions: jobsTable.filterOptions,
      serverParams: jobsTable.pagination.serverParams,
      paginationOptions: jobsTable.pagination.paginationOptions,
      selectedJob: null,
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
              label: this.$t("page_jobs.table.image"),
              field: "image",
              name: "image"
            }
          ]
        : [];

      return columns.concat(jobsTable.columns);
    }
  },
  mounted() {
    this.getJobs();
    this.getManagers();
  },
  methods: {
    imageView(mode) {
      this.imageMode = !!mode;
    },
    getJobs() {
      jobsApi
        .getCompanyJobs(
          Object.assign(this.serverParams, {
            companyId: this.companyId
          })
        )
        .then(res => {
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
    filter(v) {
      const filter = { or: [], and: [] };
      const title = v[0].value;
      const location = v[1].value;
      const startDateFrom = v[2].items[0].value;
      const startDateTo = v[2].items[1].value;
      const endDateFrom = v[3].items[0].value;
      const endDateTo = v[3].items[1].value;
      const wageMin = Number(v[4].items[0].value);
      const wageMax = Number(v[4].items[1].value);
      const rateMin = Number(v[5].items[0].value);
      const rateMax = Number(v[5].items[1].value);
      const manager = v[6].value;
      const status = v[7].value;

      if (title) {
        filter.and.push({ key: "title", value: title, opt: "in" });
      }
      if (location) {
        filter.and.push({ key: "location", value: location, opt: "in" });
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
      if (wageMin) {
        filter.and.push({ key: "hourlyWage", value: wageMin, opt: "gte" });
      }
      if (wageMax) {
        filter.and.push({ key: "hourlyWage", value: wageMax, opt: "lte" });
      }
      if (rateMin) {
        filter.and.push({ key: "payRate", value: rateMin, opt: "gte" });
      }
      if (rateMax) {
        filter.and.push({ key: "payRate", value: rateMax, opt: "lte" });
      }
      if (manager) {
        filter.and.push({ key: "manager._id", value: manager, opt: "eq" });
      }
      if (status) {
        filter.and.push({ key: "status", value: status, opt: "eq" });
      }
      this.serverParams = Object.assign({}, this.serverParams, { filter });
      this.getJobs();
    },
    goToJob(props) {
      if (props && props.row) {
        this.$router.push(`/${this.role}/dashboard/jobs/${props.row._id}`);
      }
    },
    goToMatching(props) {
      if (props && props.row) {
        this.$router.push(
          `/${this.role}/dashboard/jobs/${props.row._id}/matching`
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
    },
    getManagers() {
      return usersApi
        .getAllowedCompanyUsers({
          filter: { and: [{ key: "role", value: "manager", opt: "eq" }] },
          pagination: 0,
          companyId: this.companyId
        })
        .then(res => {
          this.managers = res.docs;
          this.filterOptions[6].options = [];
          this.filterOptions[6].options.push({ text: "", value: "" });
          this.managers?.forEach(item => {
            this.filterOptions[6].options.push({
              text: this.getFullName(item),
              value: item._id
            });
          });
        });
    }
  }
};
</script>
