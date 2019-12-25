<template>
    <div id="page_candidates" class="dashboard-content">
        <div class="d-flex">
            <div>
                <h1 class="title">
                    Candidates
                </h1>
                <p class="sub-title">We have found 5401 candidates</p>
            </div>
            <div class="pull-right">

            </div>
        </div>
        <table-filter class="candidate-filters"
                      :title="'Filter Options'"
                      :options="filterOptions"/>
        <div class="candidates-list">
            <vue-good-table
                    :columns="candidates.columns"
                    :rows="candidates.rows"
                    @on-row-dblclick="goToProfile"
                    :paginationOptions="candidates.paginationOptions"
                    :search-options="{
                        enabled: true,
                        externalQuery: candidates.searchTerm
                    }"
                    styleClass="custom-table"
            >
                <template slot="table-row" slot-scope="props">
                    <div v-if="props.column.field === 'actions'">
                        <i class="icon-more-vertical"/>
                        <i class="icon-bin"/>
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

    export default {
        name: "Candidates",
        components: {TableFilter},
        data() {
            return {
                candidates: {
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
                        {label: 'Company', field: 'company'},
                        {label: 'Position', field: 'position'},
                        {label: 'Age', field: 'age'},
                        {label: 'Status', field: 'status'},
                        {label: 'City', field: 'city'},
                        {label: 'Actions', field: 'actions'},
                    ],
                    rows: [
                        {
                            id: "1",
                            name: 'Alex Tosic',
                            company: "Hiway",
                            position: 'Creative Designer',
                            age: 30,
                            status: 'Active',
                            city: 'Amsterdam'
                        },
                        {
                            id: "2",
                            name: 'Alex Tosic',
                            company: "Hiway",
                            position: 'Creative Designer',
                            age: 30,
                            status: 'Active',
                            city: 'Amsterdam'
                        },
                        {
                            id: "3",
                            name: 'Alex Tosic',
                            company: "Hiway",
                            position: 'Creative Designer',
                            age: 30,
                            status: 'Active',
                            city: 'Amsterdam'
                        },
                        {
                            id: "4",
                            name: 'Alex Tosic',
                            company: "Hiway",
                            position: 'Creative Designer',
                            age: 30,
                            status: 'Active',
                            city: 'Amsterdam'
                        },
                        {
                            id: "5",
                            name: 'Alex Tosic',
                            company: "Hiway",
                            position: 'Creative Designer',
                            age: 30,
                            status: 'Active',
                            city: 'Amsterdam'
                        },
                        {
                            id: "6",
                            name: 'Alex Tosic',
                            company: "Hiway",
                            position: 'Creative Designer',
                            age: 30,
                            status: 'Active',
                            city: 'Amsterdam'
                        },
                        {
                            id: "7",
                            name: 'Alex Tosic',
                            company: "Hiway",
                            position: 'Creative Designer',
                            age: 30,
                            status: 'Active',
                            city: 'Amsterdam'
                        },
                        {
                            id: "8",
                            name: 'Alex Tosic',
                            company: "Hiway",
                            position: 'Creative Designer',
                            age: 30,
                            status: 'Active',
                            city: 'Amsterdam'
                        },
                        {
                            id: "9",
                            name: 'Alex Tosic',
                            company: "Hiway",
                            position: 'Creative Designer',
                            age: 30,
                            status: 'Active',
                            city: 'Amsterdam'
                        },
                        {
                            id: "10",
                            name: 'Alex Tosic',
                            company: "Hiway",
                            position: 'Creative Designer',
                            age: 30,
                            status: 'Active',
                            city: 'Amsterdam'
                        },
                    ],
                    searchTerm: ""
                },
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
        methods: {
            goToProfile(params) {
                if (params && params.row) {
                    this.$router.push(`/dashboard/profile/${params.row.id}`)
                }

            }
        }
    }
</script>

<style scoped>

</style>