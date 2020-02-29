<template>
  <b-card id="pending_workers" body-bg-variant="transparent">
    <template v-slot:header>
      <div class="row">
        <div class="col-md-6">
          <h2 class="m-0">{{ $t("component.pending_workers.title") }}</h2>
        </div>
        <div class="col-md-6">
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="hidePendingWorkersCard"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </template>
    <div>
      <p class="sub-title mt-3">
        {{
          $t("component.pending_workers.sub_title", {
            candidates: this.totalRows
          })
        }}
      </p>
      <div class="candidates-list mt-3">
        <vue-good-table
          mode="remote"
          @on-page-change="onPageChange"
          @on-sort-change="onSortChange"
          @on-column-filter="onColumnFilter"
          @on-per-page-change="onPerPageChange"
          :totalRows="totalRows"
          :rows="rows"
          :columns="columns"
          :sort-options="{ enabled: false }"
          :pagination-options="paginationOptions"
          styleClass="custom-table"
        >
          <template slot="table-row" slot-scope="props">
            <div v-if="props.column.field === 'actions'" class="d-flex">
              <b-dropdown
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
                offset="0"
                class="icon-dropdown m-2"
              >
                <template v-slot:button-content>
                  <i class="hiway-crm-icon icon-more-vertical color-black" />
                </template>
                <b-dropdown-item
                  href="#"
                  @click="showAssignCompanyModal(props)"
                >
                  {{ $t("component.pending_workers.table.assign_company") }}
                </b-dropdown-item>
              </b-dropdown>

              <button
                class="btn btn-transparent"
                @click="selectCandidate(props)"
              >
                <i class="hiway-crm-icon icon-bin" />
              </button>
            </div>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>

      <b-modal
        ref="modal-assign"
        :hide-footer="true"
        :hide-header="true"
        centered
        modal-class="modal-assign"
      >
        <div class="px-3 py-3">
          <h3>
            {{ $t("component.pending_workers.modal.assign.title") }}
          </h3>
          <p>
            {{ $t("component.pending_workers.modal.assign.sub_title") }}
          </p>
          <div>
            <b-form-group>
              <b-form-radio
                v-for="company in companies"
                v-model="selectedCompany"
                name="selectedCompany"
                :value="company._id"
                :key="company._id"
                class="py-2"
                >{{ company.name }}</b-form-radio
              >
            </b-form-group>
          </div>
          <div class="d-block">
            <div class="float-right">
              <button
                class="btn btn-black mr-5"
                @click="$refs['modal-assign'].hide()"
              >
                {{ $t("component.pending_workers.modal.assign.cancel") }}
              </button>
              <button class="btn btn-blue " @click="assignToCompany">
                {{ $t("component.pending_workers.modal.assign.assign") }}
              </button>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </b-card>
</template>

<script>
import userApi from "@/services/api/users";
import companyApi from "@/services/api/companies";

export default {
  name: "PendingWorkers",
  data() {
    return {
      isLoading: true,
      totalRows: 0,
      paginationOptions: {
        enabled: true,
        perPage: 5
      },
      rows: [],
      serverParams: {
        columnFilters: {},
        page: 1,
        limit: 5,
        sort: "",
        order: ""
      },
      selectedCandidate: null,
      selectedCompany: null,
      columns: [
        {
          label: this.$t("component.pending_workers.table.name"),
          field: "name",
          name: "name"
        },
        {
          label: this.$t("component.pending_workers.table.email"),
          field: "email",
          name: "email"
        },
        {
          label: this.$t("component.pending_workers.table.created_at"),
          field: "createdAt",
          name: "createdAt"
        },
        {
          label: this.$t("component.pending_workers.table.status"),
          field: "status",
          name: "status"
        },
        {
          label: this.$t("component.pending_workers.table.actions"),
          field: "actions",
          name: "actions"
        }
      ],
      companies: []
    };
  },
  mounted() {
    this.getWorkers();
    this.getCompanies();
  },
  methods: {
    showAssignCompanyModal(props) {
      this.$refs["modal-assign"].show();
      this.selectedCandidate = props.row;
    },
    selectCandidate(props) {
      this.$store.dispatch("updateShowErrorModal", true);
      this.$store.dispatch("updateErrorModalContent", {
        title: this.$t("component.pending_workers.modal.delete.title"),
        subTitle: this.$t("component.pending_workers.modal.delete.sub_title"),
        button: this.$t("component.pending_workers.modal.delete.continue")
      });

      this.selectedCandidate = props.row;
    },
    onPageChange(e) {
      this.serverParams = Object.assign({}, this.serverParams, {
        page: e.currentPage
      });
      this.getWorkers();
    },
    onSortChange(e) {},
    onColumnFilter(e) {
      this.getWorkers();
    },
    onPerPageChange(e) {
      this.serverParams = Object.assign({}, this.serverParams, {
        limit: e.currentPerPage
      });
      this.getWorkers();
    },
    deleteCandidate() {
      this.$store.dispatch("updateShowErrorModal", false);
      if (this.selectedCandidate) {
        userApi
          .deletePendingWorker({
            id: this.selectedCandidate._id
          })
          .then(() => {
            this.getWorkers();
          });
      }
    },
    assignToCompany() {
      return userApi
        .assignPendingWorker({
          id: this.selectedCandidate._id,
          companyId: this.selectedCompany
        })
        .then(res => {
          this.$refs["modal-assign"].hide();
          this.getWorkers();
        });
    },
    getWorkers() {
      return userApi
        .getAllPendingWorkers(Object.assign(this.serverParams))
        .then(res => {
          this.rows = res.docs.map(row => {
            const date = new Date(row.createdAt);
            row.createdAt = `${date.getFullYear()}-${date.getMonth() +
              1}-${date.getDate()} ${date.getHours()}: ${date.getMinutes()}:${date.getSeconds()}`;
            row.name = row.firstName ? row.firstName + " " + row.lastName : "";

            return row;
          });
          this.totalRows = res.totalDocs;
        });
    },
    getCompanies() {
      return companyApi.getAll().then(res => {
        this.companies = res;
      });
    },
    hidePendingWorkersCard: function() {
      this.$emit("hide-pending-workers-card");
    }
  }
};
</script>

<style scoped></style>
