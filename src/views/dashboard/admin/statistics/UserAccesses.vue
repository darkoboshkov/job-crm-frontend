<template>
	<div>
		<h1 class="title">User Accesses</h1>
		<hr />
		<div class="d-flex justify-content-between">
			<table-filter
					class="companies-filters"
					@table-filter="filter"
					:title="'Filter Options'"
					:options="filterOptions"
			/>
		</div>
		<div class="mt-3">
			<vue-good-table
					mode="remote"
					@on-page-change="onPageChange"
					@on-sort-change="onSortChange"
					@on-column-filter="onColumnFilter"
					@on-per-page-change="onPerPageChange"
					:totalRows="totalRows"
					:rows="rows"
					:columns="columns"
					:sort-options="{ enabled: false }"
					:pagination-options="paginationOptions"
					styleClass="custom-table"
			/>
		</div>
	</div>
</template>

<script>
  import TableFilter from "@/components/common/TableFilter";
  import statisticsApi from "@/services/api/statistics";
  import { userAccessesTable } from "@/constants";
  export default {
    name: "UserAccesses",
    components: { TableFilter },
    data() {
      return {
        imageMode: true,
        isLoading: true,
        totalRows: 0,
        rows: [],
        filterOptions: userAccessesTable.filterOptions,
        serverParams: userAccessesTable.pagination.serverParams,
        paginationOptions: userAccessesTable.pagination.paginationOptions,
        columns: userAccessesTable.columns,
        idToDelete: 0
      };
    },
    mounted() {
      this.getUserAccesses();
    },
    methods: {
      getUserAccesses() {
        statisticsApi.getUserAccesses(this.serverParams).then(res => {
          this.totalRows = res.totalDocs;
          this.rows = res.docs?.map(row => {
            row.loginAt = this.getDateTimeString(row["createdAt"]);
            row.browser = row["browser"].split(" ")[0];
            return row;
          });
        });
			},
      onPageChange(e) {
        this.serverParams = Object.assign({}, this.serverParams, {
          page: e.currentPage
        });
        this.getUserAccesses();
      },
      onSortChange(e) {
        this.getUserAccesses();
      },
      onColumnFilter(e) {
        this.getUserAccesses();
      },
      onPerPageChange(e) {
        this.serverParams = Object.assign({}, this.serverParams, {
          limit: e.currentPerPage
        });
        this.getUserAccesses();
      },
      filter(v) {
        const filter = { or: [], and: [] };
        const email = v[0].value;
        const ip = v[1].value;
        const country = v[2].value;
        const browser = v[3].value;
        if (email) {
          filter.and.push({ key: "email", value: email, opt: "in" });
        }
        if (ip) {
          filter.and.push({ key: "ip", value: ip, opt: "in" });
        }
        if (country) {
          filter.and.push({ key: "country", value: country, opt: "eq" });
        }
        if (browser) {
          filter.and.push({ key: "browser", value: browser, opt: "in" });
        }
        this.serverParams = Object.assign({}, this.serverParams, { filter });
        this.getUserAccesses();
      },
		}
  }
</script>

<style scoped>

</style>
