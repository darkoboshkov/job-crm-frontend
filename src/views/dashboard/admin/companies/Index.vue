<template>
    <div id="page_companies" class="dashboard-content">
        <h1 class="title">
            Companies
        </h1>
        <p class="sub-title">We have found {{ totalRows }} companies</p>
        <div class="companies-list mt-5">
            <vue-good-table
                    mode="remote"
                    @on-page-change="onPageChange"
                    @on-sort-change="onSortChange"
                    @on-column-filter="onColumnFilter"
                    @on-cell-click="onCellClick"
                    @on-per-page-change="onPerPageChange"
                    :totalRows="totalRows"
                    :rows="rows"
                    :columns="columns"
                    :pagination-options="paginationOptions"
                    styleClass="custom-table"
            >
            </vue-good-table>
        </div>
    </div>
</template>

<script>
    import companyApi from "@/services/api/companies";

    export default {
        name: "CompanyList",
        data() {
            return {
                totalRows: 0,
                paginationOptions: {
                    enabled: true,
                    perPage: 5
                },
                rows: [],
                serverParams: {
                    columnFilters: {},
                    page: 1,
                    limit: 5,
                    sort: "",
                    order: ""
                },
                columns: [
                    { label: "Image", field: "image", name: "image" },
                    { label: "Title", field: "title", name: "title" },
                    { label: "Company", field: "company.name", name: "company" },
                    { label: "Owner", field: "owner", name: "owner" },
                    { label: "Total Members", field: "totalMembers", name: "totalMembers" },
                    { label: "Actions", field: "actions", name: "actions" }
                ]
            }
        },
        mounted() {
            this.getCompanies();
        },
        methods: {
            onPageChange(e) {
                this.serverParams = Object.assign({}, this.serverParams, {
                    page: e.currentPage
                });
                this.getCompanies();
            },
            onSortChange(e) {
                this.getCompanies();
            },
            onColumnFilter(e) {
                this.getCompanies();
            },
            onCellClick(params) {},
            onPerPageChange(e) {
                this.serverParams = Object.assign({}, this.serverParams, {
                    limit: e.currentPerPage
                });
                this.getCompanies();
            },
            filter(v) {},
            createCompany() {},
            deleteCompany() {},
            getCompanies() {}
        }
    }
</script>

<style scoped>

</style>