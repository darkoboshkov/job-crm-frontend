<template>
    <div id="page_matches" class="dashboard-content">
        <h1 class="title">
            Matches
        </h1>
        <div class="position-list mt-5">
            <vue-good-table
                    mode="remote"

                    @on-page-change="onPageChange"
                    @on-sort-change="onSortChange"
                    @on-column-filter="onColumnFilter"
                    @on-per-page-change="onPerPageChange"

                    :columns="columns"
                    :rows="rows"
                    :totalRows="totalRows"

                    :paginationOptions="paginationOptions"
                    :search-options="{
                        enabled: true,
                        externalQuery: searchTerm
                    }"
                    styleClass="custom-table"
            >
                <template slot="table-row" slot-scope="props">
                    <div v-if="props.column.field === 'actions'">
                        <span class="start-matching">
                            <a href="javascript:void(0);" @click.prevent="startMatch">Start Matching</a>
                        </span>
                    </div>
                    <div v-else-if="props.column.field === 'image'" class="d-flex align-items-center">
                        <img src="@/assets/image/company-flooop-logo.png"
                             class="rounded-circle border mr-2" style="width:32px;"/>
                    </div>
                    <span v-else>
                        {{ props.formattedRow[props.column.field] }}
                    </span>
                </template>
            </vue-good-table>
        </div>
        <b-card id="matched-list" class="mt-5">
            <template v-slot:header>
                <h4 class="m-0">Gevonden matches </h4>
            </template>
            <div>
                <div v-if="matched">
                    <ul class="custom-list">
                        <li class="d-flex responsive align-items-center">
                            <div class="flex-1">
                                <div class="d-flex responsive">
                                    <img src="@/assets/image/avatar_nick.png"
                                         class="rounded-circle border mr-2"
                                         style="width:65px"/>
                                    <div>
                                        <p class="m-0">
                                            George Everink
                                        </p>
                                        <small>
                                            Verkoopmedewerker
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-2">
                                <p>
                                    87% match
                                    <button class="btn btn-blue x-small p-0" style="width:80px">Best match</button>
                                </p>
                            </div>
                            <div>
                                Profiel bekijken
                                <i class="icon-angle-right ml-3" />
                            </div>
                        </li>
                        <li class="d-flex responsive align-items-center">
                            <div class="flex-1">
                                <div class="d-flex responsive">
                                    <img src="@/assets/image/avatar_nick.png"
                                         class="rounded-circle border mr-2"
                                         style="width:65px"/>
                                    <div>
                                        <p class="m-0">
                                            George Everink
                                        </p>
                                        <small>
                                            Verkoopmedewerker
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-2">
                                <p>
                                    50% match
                                </p>
                            </div>
                            <div>
                                Profiel bekijken
                                <i class="icon-angle-right ml-3" />
                            </div>
                        </li>
                    </ul>
                </div>
                <b-row v-else class="my-5">
                    <b-col md="12">
                        <div class="text-center">
                            <img src="@/assets/image/icon/empty.svg"/>
                            <div class="mt-3">
                                <div>
                                    We zijn de beste matches voor je aan het zoeken!
                                </div>
                                <div>
                                    Dit duurt enkele seconden…
                                </div>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </div>
        </b-card>
    </div>
</template>

<script>
    import jobsApi from "../../services/api/jobs.js";

    export default {
        name: "Matches",
        data() {
            return {
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
            this.getActiveJobs();
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