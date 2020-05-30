<template>
	<div>
		<h3 class="title color-red">Mailing History</h3>
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
  import { emailHistoriesTable } from "@/constants";
  export default {
    name: "EmailHistories",
    components: { TableFilter },
    data() {
      return {
        isLoading: true,
        totalRows: 0,
        rows: [],
        filterOptions: emailHistoriesTable.filterOptions,
        serverParams: emailHistoriesTable.pagination.serverParams,
        paginationOptions: emailHistoriesTable.pagination.paginationOptions,
        columns: emailHistoriesTable.columns,
      };
    },
    mounted() {
      this.getEmailHistories();
    },
    methods: {
      getEmailHistories() {
        statisticsApi.getEmailHistories(this.serverParams).then(res => {
          this.totalRows = res.totalDocs;
          this.rows = res.docs?.map(row => {
            row.sentAt = this.getDateTimeString(row["createdAt"]);
            return row;
          });
        });
      },
      onPageChange(e) {
        this.serverParams = Object.assign({}, this.serverParams, {
          page: e.currentPage
        });
        this.getEmailHistories();
      },
      onSortChange(e) {
        this.getEmailHistories();
      },
      onColumnFilter(e) {
        this.getEmailHistories();
      },
      onPerPageChange(e) {
        this.serverParams = Object.assign({}, this.serverParams, {
          limit: e.currentPerPage
        });
        this.getEmailHistories();
      },
      filter(v) {
        const filter = { or: [], and: [] };
        const from = v[0].value;
        const to = v[1].value;
        const subject = v[2].value;
        const status = v[3].value;
        if (from) {
          filter.and.push({ key: "from", value: from, opt: "in" });
        }
        if (to) {
          filter.and.push({ key: "to", value: to, opt: "in" });
        }
        if (subject) {
          filter.and.push({ key: "subject", value: subject, opt: "in" });
        }
        if (status) {
          filter.and.push({ key: "status", value: status, opt: "eq" });
        }
        this.serverParams = Object.assign({}, this.serverParams, { filter });
        this.getEmailHistories();
      },
    }
  }
</script>

<style scoped>

</style>
