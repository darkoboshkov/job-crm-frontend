<template>
  <div id="jobs_candidates" class="dashboard-content">
    <h1 class="title">
      {{ $t("ACTIVE_JOBS") }}
    </h1>
    <p class="sub-title">We have found {{ totalRows }} active jobs</p>
    <div class="jobs-list mt-3">
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
              <b-dropdown-item href="#" @click="goToJob(props)">{{
                $t("VIEW_JOB")
              }}</b-dropdown-item>
            </b-dropdown>
            <button class="btn btn-transparent" @click="goToMatching(props)">
              {{ $t("START_MATCHING") }}
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
        .getAll(
          Object.assign(this.serverParams, {
            filter: {
              status: "active"
            }
          })
        )
        .then(res => {
          this.rows = res.docs;
          this.totalRows = res.totalDocs;
          this.rows.forEach(row => {
            row.company = row.company[0];
            row.position = row.position[0];
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
    }
  }
};
</script>
