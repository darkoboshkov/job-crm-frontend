<template>
    <div id="page_matching" class="dashboard-content">
        <h1 class="title">
            Matching
        </h1>
        <div class="mt-5">
            <div class="matching-list">
                <div class="matching-item">
                    <img src="@/assets/image/avatar_nick.png" class="rounded-circle border mr-2" style="width:65px"/>
                    <div>Parttime Magazijnmed</div>
                    <div>Kruidvat</div>
                    <div>12-24 uur</div>
                    <div>Regio Amsterdam</div>
                    <div class="icon-group"></div>
                </div>
            </div>
        </div>
        <table-filter class="candidate-filters"
                      style="margin-top: 24px;"
                      @table-filter="filter"
                      title="Filter Options"
                      :options="filterOptions"/>
    </div>
</template>

<script>
    import TableFilter from "@/components/common/TableFilter";
    import jobsApi from "@/services/api/jobs";

    export default {
        name: "Matches",
        components: {TableFilter},
        data() {
            return {
                filterOptions: [
                    {
                        title: "Woon - werk afstand",
                        type: "slider",
                        value: "15",
                        unit: "km"
                    },
                    {
                        title: "Ervaring",
                        type: "slider",
                        value: "3",
                        unit: "jaar"
                    },
                    {
                        title: "Opleidingsniveau",
                        type: "slider",
                        value: "",
                        unit: "n.v.t"
                    },
                    {
                        title: "Leeftijd",
                        type: "slider",
                        value: "18",
                        unit: "jaar"
                    },
                ],
                paginationOptions: {
                    enabled: true,
                    perPage: 5
                },
                columns: [
                    {label: 'Image', field: 'image'},
                    {label: 'Open positions', field: 'title'},
                    {label: 'Company', field: 'company.name'},
                    {label: 'Duration', field: this.computedDuration()},
                    {label: 'Location', field: 'position'},
                    {label: 'Actions', field: 'actions'},
                ],
                rows: [],
                searchTerm: "",
                matched: false,
                totalRows: 0,
                serverParams: {
                    columnFilters: {},
                    page: 1,
                    limit: 5,
                    sort: '',
                    order: '',
                },
            }
        },
        mounted() {
            // this.getActiveJobs();
        },
        methods: {
            computedDuration() {
                return function(row) {
                    let startDate = new Date(row['startDate']);
                    let endDate = new Date(row['endDate']);

                    return `From ${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()}:${startDate.getSeconds()} to ${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDate()} ${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()}`;
                }
            },
            startMatch() {
                this.matched = true;
            },
            getActiveJobs() {
                return jobsApi.get(Object.assign(this.serverParams, {
                    'filter': {
                        status: 'active'
                    },
                }))
                    .then((res) => {
                        console.log('res', res);
                        this.rows = res.docs;
                        this.rows.forEach(row => {
                            // if (row.birthday) {
                            //     let thisYear = new Date().getFullYear();
                            //     let birthYear = row.birthday.split('-')[0];
                            //     row.age = thisYear - birthYear;
                            // } else {
                            //     row.age = ' - ';
                            // }
                            row.company = row.company[0];
                            //     row.position = row.position[0];
                            //
                            // });
                        this.totalRows = res.totalDocs;
                    });
                });
            },
            onPageChange(e) {
                this.serverParams = Object.assign({}, this.serverParams, {
                    page: e.currentPage,
                });
                this.getActiveJobs();
            },
            onSortChange(e) {
                console.log('onSortChange', e);
                // this.serverParams = Object.assign({}, this.serverParams, { // todo: back-end sorting is not working as expected
                //   sort: e[0].field === 'age' ? 'birthday' : e[0].field,
                //   order: e[0].type === 'desc' ? 1 : -1,
                // });
                // this.getWorkers();
            },
            onColumnFilter(e) {
                console.log('onColumnFilter', e);
                this.getActiveJobs();
            },
            onPerPageChange(e) {
                this.serverParams = Object.assign({}, this.serverParams, {
                    limit: e.currentPerPage,
                });
                this.getActiveJobs();
          } ,
        }
    }
</script>

<style scoped>

</style>