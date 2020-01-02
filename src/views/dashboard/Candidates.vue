<template>
    <div id="page_candidates" class="dashboard-content">
        <div class="d-flex">
            <div>
                <h1 class="title">
                    {{ $t('CANDIDATES') }}
                </h1>
                <p class="sub-title">
                    {{ $t('CANDIDATE_DESCRIPTION', { candidates: 5401 }) }}
                </p>
            </div>
            <div class="pull-right">

            </div>
        </div>
        <table-filter class="candidate-filters"
                      :title="'Filter Options'"
                      :options="filterOptions"/>
        <div class="candidates-list">
            <vue-good-table
                    mode="remote"

                    @on-page-change="onPageChange"
                    @on-sort-change="onSortChange"
                    @on-column-filter="onColumnFilter"
                    @on-per-page-change="onPerPageChange"

                    :totalRows="totalRows"
                    :isLoading.sync="isLoading"
                    :rows="rows"
                    :columns="columns"

                    @on-row-dblclick="goToProfile"
                    :pagination-options="paginationOptions"
                    styleClass="custom-table"
            >
                <template slot="table-row" slot-scope="props">
                    <div v-if="props.column.field === 'actions'">
                        <b-dropdown
                                variant="link"
                                toggle-class="text-decoration-none"
                                no-caret
                                offset="0"
                                class="icon-dropdown m-2"
                        >
                            <template v-slot:button-content>
                                <i class="icon-more-vertical"/>
                            </template>
                            <b-dropdown-item href="#">Action</b-dropdown-item>
                            <b-dropdown-item href="#">Another action</b-dropdown-item>
                            <b-dropdown-item href="#">Something else here...</b-dropdown-item>
                        </b-dropdown>
                        <b-dropdown
                                variant="link"
                                toggle-class="text-decoration-none"
                                no-caret
                                class="icon-dropdown m-2"
                        >
                            <template v-slot:button-content>
                                <i class="icon-bin"/>
                            </template>
                            <b-dropdown-item href="#">Action</b-dropdown-item>
                            <b-dropdown-item href="#">Another action</b-dropdown-item>
                            <b-dropdown-item href="#">Something else here...</b-dropdown-item>
                        </b-dropdown>
                    </div>
                    <div v-else-if="props.column.field === 'name'" class="d-flex align-items-center">
                        <img src="@/assets/image/avatar_nick.png" class="rounded-circle border mr-2" style="width:65px"/>
                        <p class="m-0">{{ props.formattedRow['name'] }}</p>
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
    import TableFilter from "../../components/common/TableFilter";
    import usersApi from "../../services/api/users.js";

    export default {
        name: "Candidates",
        components: {TableFilter},
        data() {
            return {
                totalRows: [],
                isLoading: false,
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
                    {label: 'Name', field: 'name'},
                    {label: 'Image', field: 'image', hidden: true},
                    {label: 'Company', field: 'company.name'},
                    {label: 'Position', field: 'position'},
                    {label: 'Age', field: 'age'},
                    {label: 'Status', field: 'status'},
                    {label: 'City', field: 'city'},
                    {label: 'Actions', field: 'actions'},
                ],
                rows: [],
                filterOptions: [
                    {
                        title: "Filter2",
                        items: [
                            {
                                "el": "checkbox",
                                "value": "",
                                "label": "Option1"
                            },
                            {
                                "el": "checkbox",
                                "value": "",
                                "label": "Option2"
                            },
                            {
                                "el": "checkbox",
                                "value": "",
                                "label": "Option3"
                            },
                            {
                                "el": "checkbox",
                                "value": "",
                                "label": "Option3"
                            },
                        ]
                    },
                    {
                        title: "Filter1",
                        items: [
                            {
                                "el": "input",
                                "type": "text",
                                "value": ""
                            },
                        ]
                    },
                    {
                        title: "Filter3",
                        items: [
                            {
                                "el": "checkbox",
                                "value": "",
                                "label": "Option1"
                            },
                            {
                                "el": "checkbox",
                                "value": "",
                                "label": "Option2"
                            },
                            {
                                "el": "checkbox",
                                "value": "",
                                "label": "Option3"
                            },
                            {
                                "el": "checkbox",
                                "value": "",
                                "label": "Option3"
                            },
                        ]
                    },
                    {
                        title: "Filter4",
                        items: [
                            {
                                "el": "input",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "el": "input",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "el": "input",
                                "type": "text",
                                "value": ""
                            },
                        ]
                    },
                ]
            }
        },
        mounted() {
            this.getWorkers();
        },
        methods: {
            goToProfile(params) {
                if (params && params.row) {
                    this.$router.push(`/dashboard/profile/${params.row.id}`)
                }
            },
            onPageChange() {},
            onSortChange() {},
            onColumnFilter() {},
            onPerPageChange() {},
            getWorkers() {
                return usersApi.get({
                    'fields': 'role',
                    'filter': 'worker',
                }).then((res) => {
                  this.rows = res.docs;
                  this.rows.forEach(row => {
                    if (row.birthday) {
                      let thisYear = new Date().getFullYear();
                      let birthYear = row.birthday.split('-')[0];
                      row.age = thisYear - birthYear;
                    } else {
                      row.age = ' - ';
                    }
                    row.company = row.company[0];
                  })
              })
            },
        }
    }
</script>

<style scoped>
    .icon-dropdown >>> button {
        color: black;
    }
</style>
