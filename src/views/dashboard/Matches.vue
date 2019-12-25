<template>
    <div id="page_matches" class="dashboard-content">
        <h1 class="title">
            Matches
        </h1>
        <div class="position-list mt-5">
            <vue-good-table
                    :columns="positions.columns"
                    :rows="positions.rows"
                    :paginationOptions="positions.paginationOptions"
                    :search-options="{
                        enabled: true,
                        externalQuery: positions.searchTerm
                    }"
                    styleClass="custom-table"
            >
                <template slot="table-row" slot-scope="props">
                    <div v-if="props.column.field === 'actions'">
                        <span class="start-matching">
                            <a href="javascript:void(0);">Start Matching</a>
                        </span>
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
                <b-row class="my-5">
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
    export default {
        name: "Matches",
        data() {
            return {
                positions: {
                    paginationOptions: {
                        enabled: true,
                        mode: 'records',
                        perPage: 5,
                        perPageDropdown: [10, 15, 20],
                        dropdownAllowAll: false,
                        setCurrentPage: 2,
                        nextLabel: 'next',
                        prevLabel: 'prev',
                        rowsPerPageLabel: 'Rows per page',
                        ofLabel: 'of',
                        pageLabel: 'page', // for 'pages' mode
                        allLabel: 'All',
                    },
                    columns: [
                        {label: 'Open positions', field: 'name'},
                        {label: 'Duration', field: 'duration'},
                        {label: 'Location', field: 'location'},
                        {label: 'Actions', field: 'actions'},
                    ],
                    rows: [
                        {
                            id: "1",
                            name: "Parttime Magazijnmedewerker Kruidvat",
                            duration: "10 ~ 20 hrs",
                            location: "Amsterdam"
                        },
                        {
                            id: "2",
                            name: "Parttime Magazijnmedewerker Kruidvat",
                            location: "Amsterdam",
                            duration: "10 ~ 20 hrs"
                        },
                        {
                            id: "3",
                            name: "Parttime Magazijnmedewerker Kruidvat",
                            duration: "10 ~ 20 hrs",
                            location: "Amsterdam"
                        },
                        {
                            id: "4",
                            name: "Parttime Magazijnmedewerker Kruidvat",
                            duration: "10 ~ 20 hrs",
                            location: "Amsterdam"
                        },
                        {
                            id: "5",
                            name: "Parttime Magazijnmedewerker Kruidvat",
                            duration: "10 ~ 20 hrs",
                            location: "Amsterdam"
                        }
                    ],
                    searchTerm: ""
                },
            }
        },
    }
</script>

<style scoped>

</style>