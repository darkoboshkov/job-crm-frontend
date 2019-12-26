<template>
    <div id="page_matches" class="dashboard-content">
        <h1 class="title">
            {{ $t('MATCHES') }}
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
                            <a href="javascript:void(0);" @click.prevent="startMatch">{{ $t('START_MATCHING') }}</a>
                        </span>
                    </div>
                    <div v-else-if="props.column.field === 'name'" class="d-flex align-items-center">
                        <img src="@/assets/image/company-flooop-logo.png"
                             class="rounded-circle border mr-2" style="width:32px;"/>
                        <p class="m-0">{{ props.formattedRow['name'] }}</p>
                    </div>
                    <span v-else>
                      {{ props.formattedRow[props.column.field] }}
                    </span>
                </template>
            </vue-good-table>
        </div>
        <b-card id="matched-list" class="mt-5">
            <template v-slot:header>
                <h4 class="m-0">{{ $t('MATCHES_FOUND') }}</h4>
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
                                    <button class="btn btn-blue x-small" style="width:80px">Best match</button>
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
                                    {{ $t('SEARCHING_MATCHES1') }}
                                </div>
                                <div>
                                    {{ $t('SEARCHING_MATCHES2') }}
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
                        {label: 'Image', field: 'image', hidden: true},
                        {label: 'Duration', field: 'duration'},
                        {label: 'Location', field: 'location'},
                        {label: 'Actions', field: 'actions'},
                    ],
                    rows: [
                        {
                            id: "1",
                            name: "Parttime Magazijnmedewerker Kruidvat",
                            duration: "10 ~ 20 hrs",
                            location: "Amsterdam",
                            image: ''
                        },
                        {
                            id: "2",
                            name: "Parttime Magazijnmedewerker Kruidvat",
                            location: "Amsterdam",
                            duration: "10 ~ 20 hrs",
                            image: ''
                        },
                        {
                            id: "3",
                            name: "Parttime Magazijnmedewerker Kruidvat",
                            duration: "10 ~ 20 hrs",
                            location: "Amsterdam",
                            image: ''
                        },
                        {
                            id: "4",
                            name: "Parttime Magazijnmedewerker Kruidvat",
                            duration: "10 ~ 20 hrs",
                            location: "Amsterdam",
                            image: ''
                        },
                        {
                            id: "5",
                            name: "Parttime Magazijnmedewerker Kruidvat",
                            duration: "10 ~ 20 hrs",
                            location: "Amsterdam",
                            image: ''
                        }
                    ],
                    searchTerm: ""
                },
                matched: false
            }
        },
        methods: {
            startMatch() {
                this.matched = true
            }
        }
    }
</script>

<style scoped>

</style>
