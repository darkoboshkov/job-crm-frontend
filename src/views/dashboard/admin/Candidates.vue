<template>
    <div id="page_candidates" class="dashboard-content">
        <div>
            <div>
                <div class="d-flex justify-content-between align-items-end">
                    <h1 class="title">
                        {{ $t('CANDIDATES') }}
                    </h1>
                    <img class="add-candidate" src="@/assets/image/icon/person-add.svg" @click="addPerson"/>
                </div>
                <p class="sub-title">
                    {{ $t('CANDIDATE_DESCRIPTION', { candidates: this.totalRows }) }}
                </p>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <table-filter class="candidate-filters"
                          @table-filter="filter"
                          :title="'Filter Options'"
                          :options="filterOptions"/>
            <div class="view-switch">
                View:
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="23" viewBox="0 0 26 23" @click="imageView(true)" class="mode-switch">
                    <g fill="#000" fill-rule="evenodd" :opacity="imageMode ? 1 : 0.261">
                        <rect width="7" height="7" rx="1"/>
                        <rect width="18" height="7" x="8" rx="1"/>
                        <rect width="7" height="7" y="8" rx="1"/>
                        <rect width="7" height="7" y="16" rx="1"/>
                        <rect width="18" height="7" x="8" y="8" rx="1"/>
                        <rect width="18" height="7" x="8" y="16" rx="1"/>
                    </g>
                </svg>
                |
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="23" viewBox="0 0 26 23" @click="imageView(false)" class="mode-switch">
                    <g fill="#000" fill-rule="evenodd" :opacity="!imageMode ? 1 : 0.261">
                        <rect width="26" height="5" rx="1"/>
                        <rect width="26" height="5" y="6" rx="1"/>
                        <rect width="26" height="5" y="12" rx="1"/>
                        <rect width="26" height="5" y="18" rx="1"/>
                    </g>
                </svg>
            </div>
        </div>

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

                        <b-button
                                v-b-modal.delete_confirmation
                                class="delete-confirmation-button"
                                @click="selectCandidate(props)"
                        >
                            <i class="icon-bin"/>
                        </b-button>
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

        <b-modal id="delete_confirmation" centered>
            <template v-slot:modal-header="{ close }">
                <h4 class="text-center">
                    Are you sure you want to delete this candidate?
                </h4>
            </template>
        </b-modal>
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
                imageMode: true,
            }
        },
        computed: {
            columns() {
                let columns = this.imageMode ? [{label: 'Image', field: 'image'}] : [];

                return columns.concat([
                    {label: this.$t('NAME'), field: this.computedName()},
                    {label: this.$t('POSITION'), field: 'position.name'},
                    {label: this.$t('CREATED_AT'), field: this.computedCreatedAt()},
                    {label: 'Company', field: 'company.name'},
                    {label: this.$t('AGE'), field: 'age'},
                    {label: this.$t('STATUS'), field: 'status'},
                    {label: this.$t('LOCATION'), field: 'city'},
                    {label: 'Actions', field: 'actions'},
                ]);
            },
            role() {
                return this.$store.state.user.role;
            }
        },
        mounted() {
            this.getWorkers();
        },
        methods: {
            imageView(mode) {
                this.imageMode = !!mode;
            },
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
            addPerson() {
                this.$router.push(`/${this.role}/dashboard/profile/0?mode=edit`);
            }
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
    .add-candidate, .mode-switch {
        cursor: pointer;
    }
</style>
