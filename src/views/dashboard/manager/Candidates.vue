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
                      @table-filter="filter"
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
                            <b-dropdown-item href="#" @click="goToProfile(props)">View Profile</b-dropdown-item>
                        </b-dropdown>
                    </div>
                    <div v-else-if="props.column.field === 'image'" class="d-flex align-items-center">
                        <img src="@/assets/image/avatar_nick.png" class="rounded-circle border mr-2"
                             style="width:65px"/>
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
    import TableFilter from "@/components/common/TableFilter";
    import usersApi from "@/services/api/users";

    export default {
        name: "Candidates",
        components: {TableFilter},
        data() {
            return {
                totalRows: 0,
                paginationOptions: {
                    enabled: true,
                    perPage: 5
                },
                rows: [],
                filterOptions: [
                    {
                        title: "Name",
                        type: "text",
                        value: ""
                    },
                    {
                        title: "Company",
                        type: "text",
                        value: ""
                    },
                    {
                        title: "Position",
                        type: "text",
                        value: ""
                    },
                    {
                        title: "Age",
                        type: "select",
                        options: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
                        value: ""
                    },
                    {
                        title: "Status",
                        type: "checkbox",
                        value: "",
                        options: [
                            {
                                label: "Available",
                                checked: false,
                            },
                            {
                                label: "Unavailable",
                                checked: false,
                            },
                        ]
                    },
                    {
                        title: "City",
                        type: "text",
                        value: ""
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
        computed: {
            columns() {
                return [
                    {label: 'Image', field: 'image'},
                    {label: this.$t('NAME'), field: this.computedName()},
                    {label: this.$t('POSITION'), field: 'position.name'},
                    {label: this.$t('CREATED_AT'), field: this.computedCreatedAt()},
                    {label: 'Company', field: 'company.name'},
                    {label: this.$t('AGE'), field: 'age'},
                    {label: this.$t('STATUS'), field: 'status'},
                    {label: this.$t('LOCATION'), field: 'city'},
                    {label: 'Actions', field: 'actions'},
                ]
            },
            role() {
                return this.$store.state.user.role;
            }
        },
        mounted() {
            this.getWorkers();
        },
        methods: {
            computedName() {
                return function (row) {
                    return row['firstName'] + ' ' + row['lastName'];
                }
            },
            computedCreatedAt() {
                return function (row) {
                    let date = new Date(row['createdAt']);

                    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()} ${date.getHours()}:
                    ${date.getMinutes()}:${date.getSeconds()}`;
                }
            },
            selectCandidate(props) {
                console.log('props', props);
                this.selectedCandidateId = props.row._id;
            },
            goToProfile(props) {
                if (props && props.row) {
                    this.$router.push(`/${this.role}/dashboard/profile/${props.row._id}`)
                }
            },
            onPageChange(e) {
                this.serverParams = Object.assign({}, this.serverParams, {
                    page: e.currentPage,
                });
                this.getWorkers();
            },
            onSortChange(e) {
                // console.log('onSortChange', e);
                // this.serverParams = Object.assign({}, this.serverParams, { // todo: back-end sorting is not working as expected
                //   sort: e[0].field === 'age' ? 'birthday' : e[0].field,
                //   order: e[0].type === 'desc' ? 1 : -1,
                // });
                // this.getWorkers();
            },
            onColumnFilter(e) {
                // console.log('onColumnFilter', e);
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
                    'filter': {
                        role: 'worker'
                    },
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
                    });
                    this.totalRows = res.totalDocs;
                });
            },
            filter(v) {
                // console.log('v', v);
            },
        },
        watch: {
            '$i18n.locale'(v) {
                // console.log('locale', v);
            }
        },
    }
</script>

<style scoped>
    .icon-dropdown >>> button {
        color: black;
    }
</style>