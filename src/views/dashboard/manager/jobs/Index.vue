<template>
  <div id="jobs_candidates" class="dashboard-content">
    <div class="d-flex justify-content-between align-items-end">
      <h1 class="title">
        {{ $t("page_jobs.title") }}
      </h1>
      <img
        class="pointer"
        src="@/assets/image/icon/person-add.svg"
        @click="$router.push({ name: 'manager-job-create' })"
      />
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <p class="sub-title">
        {{ $t("page_jobs.sub_title", { jobs: this.totalRows }) }}
      </p>
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
    <div class="jobs-list mt-5">
      <vue-good-table
        mode="remote"
        @on-page-change="onPageChange"
        @on-per-page-change="onPerPageChange"
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
                <a
                  :href="
                    props && props.row
                      ? `/${role}/dashboard/jobs/${props.row.company._id}/${props.row._id}`
                      : '#'
                  "
                  class="text-decoration-none"
                >
                  {{ $t("page_jobs.table.view_job") }}
                </a>
              </b-dropdown-item>
              <b-dropdown-item @click="goToMatching(props)">
                <a
                  :href="
                    props && props.row
                      ? `/${role}/dashboard/jobs/${props.row.company._id}/${props.row._id}/matching`
                      : '#'
                  "
                  class="text-decoration-none"
                >
                  {{ $t("page_jobs.table.start_matching") }}
                </a>
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
            <img
              v-if="
                props.row.status === 'active' ||
                props.row.status === 'completed'
                  ? props.row.image
                  : props.row.status === 'open' && props.row.company.logo
              "
              :src="
                props.row.status === 'active' ||
                props.row.status === 'completed'
                  ? APP_URL + props.row.image
                  : props.row.status === 'open' &&
                    APP_URL + props.row.company.logo
              "
              class="rounded-circle border mr-2"
              style="width:50px;"
            />
            <div v-else class="avatar-placeholder mr-2"></div>
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
import jobsApi from "@/services/api/jobs";
import { APP_URL } from "@/constants";

export default {
  name: "JobList",
  data() {
    return {
      APP_URL,
      isLoading: true,
      paginationOptions: {
        enabled: true,
        perPage: 5
      },
      rows: [],
      searchTerm: "",
      matched: false,
      totalRows: 0,
      serverParams: {
        columnFilters: {},
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
    companyId() {
      return this.$store.state.user.companyId;
    },
    columns() {
      let columns = this.imageMode
              ? [
                {
                  label: this.$t("page_jobs.table.image"),
                  field: "image",
                  name: "image",
                }
              ]
              : [];

      return columns.concat([
        {
          label: this.$t("page_jobs.table.position"),
          field: "position.name",
          name: "position"
        },
        {
          label: this.$t("page_jobs.table.company"),
          field: "company.name",
          name: "company"
        },
        // {
        //   label: this.$t("page_jobs.table.worker"),
        //   field: this.computedWorkerName(),
        //   name: "worker"
        // },
        // {
        //   label: this.$t("page_jobs.table.manager"),
        //   field: this.computedManagerName(),
        //   name: "manager"
        // },
        {
          label: this.$t("page_jobs.table.wage"),
          field: "wage",
          name: "wage"
        },
        {
          label: this.$t("page_jobs.table.rate"),
          field: "rate",
          name: "rate"
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
        // {
        //   label: this.$t("page_jobs.table.duration"),
        //   field: this.computedDuration(),
        //   name: "duration"
        // },
        {
          label: this.$t("page_jobs.table.title"),
          field: "title",
          name: "title"
        },
        {
          label: this.$t("page_jobs.table.actions"),
          field: "actions",
          name: "actions"
        }
      ]);
    },
  },
  mounted() {
    this.getJobs();
  },
  methods: {
    imageView(mode) {
      this.imageMode = !!mode;
    },
    computedDuration() {
      return function(row) {
        return `${new Date(row.startDate).toLocaleDateString()} - ${new Date(
          row.endDate
        ).toLocaleDateString()}`;
      };
    },
    computedManagerName() {
      return function(row) {
        return (
          row.manager &&
          row.manager[0] &&
          `${row.manager[0].firstName} ${row.manager[0].lastName}`
        );
      };
    },
    computedWorkerName() {
      return function(row) {
        return (
          row.worker &&
          row.worker[0] &&
          `${row.worker[0].firstName} ${row.worker[0].lastName}`
        );
      };
    },
    getJobs() {
      return jobsApi
        .getCompanyJobs(
          Object.assign(this.serverParams, {
            companyId: this.companyId
          })
        )
        .then(res => {
          this.totalRows = res.totalDocs;
          this.rows = res.docs.map(row => {
            row.company = row.company[0];
            row.position = row.position[0];
            row.startDate = new Date(row.startDate).toLocaleDateString();
            row.endDate = new Date(row.endDate).toLocaleDateString();
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
      return jobsApi
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
