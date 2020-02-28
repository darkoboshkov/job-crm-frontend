<template>
  <div id="jobs_candidates" class="dashboard-content">
    <h1 class="title">
      {{ $t("page_jobs.title") }}
    </h1>
    <p class="sub-title">
      {{ $t("page_jobs.sub_title", { jobs: this.totalRows }) }}
    </p>
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
          <div v-if="props.column.field === 'actions'">
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
              <b-dropdown-item href="#" @click="goToJob(props)">{{
                $t("page_jobs.table.view_job")
              }}</b-dropdown-item>
            </b-dropdown>
          </div>
          <div
            v-else-if="props.column.field === 'image'"
            class="d-flex align-items-center"
          >
            <img
              v-if="props.row.image"
              :src="APP_URL + props.row.image"
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
      columns: [
        {
          label: this.$t("page_jobs.table.image"),
          field: "image",
          name: "image"
        },
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
          label: this.$t("page_jobs.table.duration"),
          field: this.computedDuration(),
          name: "duration"
        },
        {
          label: this.$t("page_jobs.table.position"),
          field: "position.name",
          name: "position"
        },
        {
          label: this.$t("page_jobs.table.actions"),
          field: "actions",
          name: "actions"
        }
      ],
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
    this.getActiveJobs();
  },
  methods: {
    computedDuration() {
      return function(row) {
        const startDate = new Date(row["startDate"]);
        const endDate = new Date(row["endDate"]);

        return `${startDate.getDate()}/${startDate.getMonth() +
          1}/${startDate.getFullYear()} -
                ${endDate.getDate()}/${endDate.getMonth() +
          1}/${endDate.getFullYear()}`;
      };
    },
    getActiveJobs() {
      return jobsApi
        .getCompanyJobs(
          Object.assign(this.serverParams, {
            companyId: this.companyId,
            filter: {
              status: "active"
            }
          })
        )
        .then(res => {
          this.totalRows = res.totalDocs;
          this.rows = res.docs.map(row => {
            row.company = row.company[0];
            row.position = row.position[0];
            return row;
          });
        });
    },
    onPerPageChange(e) {
      this.serverParams = Object.assign({}, this.serverParams, {
        limit: e.currentPerPage
      });
      this.getActiveJobs();
    },
    onPageChange(e) {
      this.serverParams = Object.assign({}, this.serverParams, {
        page: e.currentPage
      });
      this.getActiveJobs();
    },
    goToJob(props) {
      if (props && props.row) {
        this.$router.push(`/${this.role}/dashboard/jobs/${props.row._id}`);
      }
    }
  }
};
</script>
