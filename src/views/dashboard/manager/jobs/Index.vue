<template>
  <div id="jobs_candidates" class="dashboard-content">
    <h1 class="title">
      Active Jobs
    </h1>
    <p class="sub-title">We have found {{ totalRows }} active jobs</p>
    <div class="jobs-list mt-5">
      <vue-good-table
        mode="remote"
        @on-page-change="onPageChange"
        @on-per-page-change="onPerPageChange"
        :totalRows="totalRows"
        :rows="rows"
        :columns="columns"
        :pagination-options="paginationOptions"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm
        }"
        styleClass="custom-table"
      >
        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field === 'actions'">
            <span class="start-matching">
              <a href="javascript:void(0);" @click.prevent="goToMatching(props)"
                >Start Matching</a
              >
            </span>
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

export default {
  name: "JobList",
  data() {
    return {
      paginationOptions: {
        enabled: true,
        perPage: 5
      },
      columns: [
        { label: "Image", field: "image" },
        { label: "Title", field: "title", name: "title" },
        { label: "Company", field: "company.name", name: "company" },
        { label: "Duration", field: this.computedDuration() },
        { label: "Position", field: "position.name", name: "position" },
        { label: "Actions", field: "actions", name: "actions" }
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
          this.rows = res.docs;
          this.rows.forEach(row => {
            row.company = row.company[0];
            row.position = row.position[0];
            this.totalRows = res.totalDocs;
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
    goToMatching(props) {
      if (props && props.row) {
        this.$router.push(
          `/${this.role}/dashboard/jobs/${props.row._id}/matching`
        );
      }
    }
  }
};
</script>
