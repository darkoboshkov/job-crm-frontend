<template>
    <div id="page_candidates" class="dashboard-content">
        <div class="d-flex">
            <div>
                <h1 class="title">
                    {{ $t('CANDIDATES') }}
                </h1>
                <p class="sub-title">
                    {{ $t('CANDIDATE_DESCRIPTION', { candidates: this.totalRows }) }}
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

                        <b-button v-b-modal.delete_confirmation class="delete-confirmation-button" @click="selectCandidate(props)">
                            <i class="icon-bin"></i>
                        </b-button>
                    </div>
                    <div v-else-if="props.column.field === 'image'" class="d-flex align-items-center">
                        <img src="@/assets/image/avatar_nick.png" class="rounded-circle border mr-2" style="width:65px"/>
                    </div>
                    <span v-else>
                      {{ props.formattedRow[props.column.field] }}
                    </span>
                </template>
            </vue-good-table>
        </div>

        <b-modal id="delete_confirmation" centered>
            <template v-slot:modal-header="{ close }">
                <h2>
                    Are you sure you want to delete this candidate?
                </h2>
            </template>
        </b-modal>
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
                totalRows: 0,
                paginationOptions: {
                    enabled: true,
                    // mode: 'records',
                    perPage: 5,
                    // perPageDropdown: [10, 15, 20],
                    // dropdownAllowAll: false,
                    // setCurrentPage: 2,
                    // nextLabel: 'next',
                    // prevLabel: 'prev',
                    // rowsPerPageLabel: 'Rows per page',
                    // ofLabel: 'of',
                    // pageLabel: 'page', // for 'pages' mode
                    // allLabel: 'All',
                },
                columns: [
                    {label: 'Name', field: this.computedName},
                    {label: 'Image', field: 'image'},
                    {label: 'Company', field: 'company.name'},
                    {label: 'Position', field: 'position.name'},
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
                ],
                serverParams: {
                    columnFilters: {},
                    page: 1,
                    limit: 5,
                    sort: '',
                    order: '',
                },
                selectedCandidateId: null,
            }
        },
        mounted() {
            this.getWorkers();
        },
        methods: {
            computedName(row) {
                return row['firstName'] + ' ' + row['lastName'];
            },
            selectCandidate(props) {console.log('props', props);
                this.selectedCandidateId = props.row._id;
            },
            goToProfile(params) {
                if (params && params.row) {
                    this.$router.push(`/dashboard/profile/${params.row.id}`)
                }
            },
            onPageChange(e) {
              this.serverParams = Object.assign({}, this.serverParams, {
                page: e.currentPage,
              });
              this.getWorkers();
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
              this.getWorkers();
            },
            onPerPageChange(e) {
              this.serverParams = Object.assign({}, this.serverParams, {
                limit: e.currentPerPage,
              });
              this.getWorkers();
            },
            getWorkers() {
                return usersApi.get(Object.assign(this.serverParams, {
                    'fields': 'role',
                    'filter': 'worker',
                })).then((res) => {
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
                    row.position = row.position[0];
                    console.log('row', row);
                  });
                  this.totalRows = res.totalDocs;
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
