<template>
    <div id="page_matching_details" class="dashboard-content">
        <h1 class="title">
            Matching
        </h1>
        <div class="mt-5 row">
            <div class="matching-list col-5">
                <div class="matching-item">
                    <div class="up">
                        <img src="@/assets/image/avatar_nick.png" class="rounded-circle border mr-2" style="width:65px"/>
                        <div>Parttime Magazijnmed</div>
                        <div>Kruidvat</div>
                        <div class="icon-group">
                            <div class="icon">
                                <img src="@/assets/image/phone.svg" />
                            </div>
                            <div class="icon">
                                <img src="@/assets/image/message.svg" />
                            </div>
                        </div>
                    </div>
                    <div class="down">
                        <ul>
                            <li>12-24 uur</li>
                            <li>Regio Arnhem</li>
                            <li>Vanaf januari 2020</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col-2 d-flex justify-content-center">
                <img src="@/assets/image/matching.svg" />
            </div>

            <div class="matching-list col-5">
                <div class="matching-item">
                    <div class="up">
                        <img src="@/assets/image/avatar_nick.png" class="rounded-circle border mr-2" style="width:65px"/>
                        <div>Magalie Lindeboom</div>
                        <div>Visual Designer</div>
                        <div class="icon-group">
                            <div class="icon">
                                <img src="@/assets/image/phone.svg" />
                            </div>
                            <div class="icon">
                                <img src="@/assets/image/message.svg" />
                            </div>
                        </div>
                    </div>
                    <div class="down">
                        <ul>
                            <li>35 jaar</li>
                            <li>Arnhem</li>
                            <li>Group</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="splitter"></div>

        <div>
            <h2>Match informatie

            </h2>

            <div class="row">
                <div class="col-md-3 d-flex">
                    <div class="info-card">
                        <div class="title">Woon-werk afstand</div>
                        <div class="body">
                            <div class="icon">
                                <img src="@/assets/image/distance.svg" />
                            </div>
                            <div class="caption">
                                <div class="number">25</div>
                                <div class="unit">km</div>
                            </div>
                        </div>
                        <div class="footer">
                            Gemiddelde reistijd van de woon-werk afstand is <span class="red">16 minuten</span>.
                        </div>
                    </div>
                </div>
                <div class="col-md-3 d-flex">
                    <div class="info-card">
                        <div class="title">Opleidingsniveau</div>
                        <div class="body">
                            <div class="icon">
                                <img src="@/assets/image/percent.svg" />
                            </div>
                            <div class="caption">
                                <div class="number">100</div>
                                <div class="unit">%</div>
                            </div>
                        </div>
                        <div class="footer">
                            Magalie heeft is <span class="red">HBO afgestudeerd</span> en voldoet aan de eisen.
                        </div>
                    </div>
                </div>
                <div class="col-md-3 d-flex">
                    <div class="info-card">
                        <div class="title">Beschikbaarheid</div>
                        <div class="body">
                            <div class="icon">
                                <img src="@/assets/image/perdirect.svg" />
                            </div>
                            <div class="caption">
                                <div class="number">Per direct</div>
                                <div class="unit"></div>
                            </div>
                        </div>
                        <div class="footer">
                            Magalie Lindeboom kan meteen aan de slag gaan.
                        </div>
                    </div>
                </div>
                <div class="col-md-3 d-flex">
                    <div class="info-card">
                        <div class="title">Leeftijd</div>
                        <div class="body">
                            <div class="icon">
                                <img src="@/assets/image/woman.svg" />
                            </div>
                            <div class="caption">
                                <div class="number">35</div>
                                <div class="unit">jaar</div>
                            </div>
                        </div>
                        <div class="footer">
                            Kandidaat heeft een <span class="red">geschikte leeftijd</span> voor de functie met enige ervaring.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TableFilter from "@/components/common/TableFilter";
    import jobsApi from "@/services/api/jobs";

    export default {
        name: "MatchDetails",
        components: {TableFilter},
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
            // this.getActiveJobs();
        },
        methods: {
            filter() {

            },
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