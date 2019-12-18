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
        <div class="candidates-list">
            <vue-good-table
                    :columns="columns"
                    :rows="rows"
                    :paginationOptions="paginationOptions"
                    :search-options="{
                        enabled: true,
                        externalQuery: searchTerm
                    }"
                    styleClass="custom-table"
            >
                <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field === 'actions'">
                        remove | more
                    </span>
                    <span v-else>
                      {{ props.formattedRow[props.column.field] }}
                    </span>
                </template>
            </vue-good-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Candidates",
        data() {
            return {
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
                        name: 'Alex Tosic',
                        company: "Hiway",
                        position: 'Creative Designer',
                        age: 30,
                        status: 'Active',
                        city: 'Amsterdam'
                    },
                    {
                        name: 'Alex Tosic',
                        company: "Hiway",
                        position: 'Creative Designer',
                        age: 30,
                        status: 'Active',
                        city: 'Amsterdam'
                    },
                    {
                        name: 'Alex Tosic',
                        company: "Hiway",
                        position: 'Creative Designer',
                        age: 30,
                        status: 'Active',
                        city: 'Amsterdam'
                    },
                    {
                        name: 'Alex Tosic',
                        company: "Hiway",
                        position: 'Creative Designer',
                        age: 30,
                        status: 'Active',
                        city: 'Amsterdam'
                    },
                    {
                        name: 'Alex Tosic',
                        company: "Hiway",
                        position: 'Creative Designer',
                        age: 30,
                        status: 'Active',
                        city: 'Amsterdam'
                    },
                    {
                        name: 'Alex Tosic',
                        company: "Hiway",
                        position: 'Creative Designer',
                        age: 30,
                        status: 'Active',
                        city: 'Amsterdam'
                    },
                    {
                        name: 'Alex Tosic',
                        company: "Hiway",
                        position: 'Creative Designer',
                        age: 30,
                        status: 'Active',
                        city: 'Amsterdam'
                    },
                    {
                        name: 'Alex Tosic',
                        company: "Hiway",
                        position: 'Creative Designer',
                        age: 30,
                        status: 'Active',
                        city: 'Amsterdam'
                    },
                    {
                        name: 'Alex Tosic',
                        company: "Hiway",
                        position: 'Creative Designer',
                        age: 30,
                        status: 'Active',
                        city: 'Amsterdam'
                    },
                    {
                        name: 'Alex Tosic',
                        company: "Hiway",
                        position: 'Creative Designer',
                        age: 30,
                        status: 'Active',
                        city: 'Amsterdam'
                    },
                ],
                searchTerm: ""
            }
        }
    }
</script>

<style scoped>

</style>