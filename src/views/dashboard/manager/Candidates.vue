<template>
  <div id="page_candidates" class="dashboard-content">
    <div class="d-flex justify-content-between align-items-start">
      <h1 class="title">
        {{ $t("page_candidates.title") }}
      </h1>
      <img
        class="pointer"
        src="@/assets/image/icon/person-add.svg"
        style="width:50px"
        @click="$router.push({ name: 'manager-users-create' })"
      />
    </div>
    <p class="sub-title">
      {{ $t("page_candidates.sub_title", { candidates: this.totalRows }) }}
    </p>
    <hr />
    <div class="d-flex justify-content-between">
      <table-filter
        class="candidate-filters"
        @table-filter="filter"
        :title="'Filter Options'"
        :options="filterOptions"
      />
      <div class="view-switch">
        View:
        <i
          class="hiway-crm-icon icon-ol pointer"
          @click="imageView(true)"
          :style="{ opacity: imageMode ? 1 : 0.261 }"
        />
        |
        <i
          class="hiway-crm-icon icon-ul pointer"
          @click="imageView(false)"
          :style="{ opacity: !imageMode ? 1 : 0.261 }"
        />
      </div>
    </div>

    <div class="candidates-list mt-3">
      <vue-good-table
        mode="remote"
        @on-page-change="onPageChange"
        @on-sort-change="onSortChange"
        @on-column-filter="onColumnFilter"
        @on-cell-click="onCellClick"
        @on-per-page-change="onPerPageChange"
        :totalRows="totalRows"
        :rows="rows"
        :columns="columns"
        :search-options="{ enabled: false }"
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
              <b-dropdown-item href="#" @click="goToProfile(props)">
                {{ $t("page_candidates.table.view_profile") }}
              </b-dropdown-item>
              <b-dropdown-item
                v-if="props.row.activeContract !== 'No'"
                href="#"
                @click="goToJobOffer(props)"
              >
                {{ $t("page_candidates.table.view_joboffer") }}
              </b-dropdown-item>
              <b-dropdown-item href="#" @click="selectCandidate(props)">
                {{ $t("page_candidates.table.delete_user") }}
              </b-dropdown-item>
            </b-dropdown>

            <button class="btn btn-transparent" @click="selectCandidate(props)">
              <i class="hiway-crm-icon icon-bin" />
            </button>
          </div>
          <div v-else-if="props.column.field === 'profession'">
            {{
              props.row.profession
                ? $t(`profession.${props.row.profession}`)
                : ""
            }}
          </div>
          <div v-else-if="props.column.field === 'status'">
            {{ props.row.status ? $t(`status.${props.row.status}`) : "" }}
          </div>
          <div
            v-else-if="props.column.field === 'image'"
            class="d-flex align-items-center"
          >
            <div class="avatar-image mr-2">
              <img
                v-if="props.row.image"
                :src="props.row.image | appUrlFormatter"
              />
            </div>
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
import userApi from "@/services/api/users";
import { candidatesTable } from "@/constants";

export default {
  name: "Candidates",
  components: { TableFilter },
  data() {
    return {
      isLoading: true,
      totalRows: 0,
      rows: [],
      filterOptions: candidatesTable.filterOptions,
      serverParams: candidatesTable.pagination.serverParams,
      paginationOptions: candidatesTable.pagination.paginationOptions,
      selectedCandidate: null,
      imageMode: true
    };
  },
  computed: {
    columns() {
      let columns = this.imageMode
        ? [
            {
              label: this.$t("page_candidates.table.image"),
              field: "image",
              name: "image",
              tdClass: "link"
            }
          ]
        : [];

      return columns.concat(candidatesTable.columns);
    },
    companyId() {
      return this.$store.state.user.companyId;
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
    goToProfile(props) {
      if (props && props.row) {
        this.$router.push(`/${this.role}/dashboard/profile/${props.row._id}`);
      }
    },
    goToJobOffer(props) {
      if (props && props.row) {
        this.$router.push(
          `/${this.role}/dashboard/joboffers/${props.row.jobOfferId}`
        );
      }
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
    onCellClick(params) {
      if (params.column.name !== "actions") {
        this.goToProfile(params);
      }
    },
    onPerPageChange(e) {
      this.serverParams = Object.assign({}, this.serverParams, {
        limit: e.currentPerPage
      });
      this.getWorkers();
    },
    filter(v) {},
    selectCandidate(props) {
      this.$store.dispatch("updateShowErrorModal", true);
      this.$store.dispatch("updateErrorModalContent", {
        title: this.$t("page_candidates.modal.delete.title"),
        subTitle: this.$t("page_candidates.modal.delete.sub_title"),
        button: this.$t("page_candidates.modal.delete.continue"),
        onButtonClick: () => {
          this.deleteCandidate();
        }
      });

      this.selectedCandidate = props.row;
    },
    deleteCandidate() {
      console.log(this.companyId);
      if (this.selectedCandidate) {
        userApi
          .delete({
            companyId: this.companyId,
            id: this.selectedCandidate._id
          })
          .then(() => {
            this.$store.dispatch("updateShowErrorModal", false);
            this.getWorkers();
          });
      }
    },
    getWorkers() {
      userApi
        .getCompanyWorkers(
          Object.assign(this.serverParams, {
            companyId: this.companyId
          })
        )
        .then(res => {
          this.rows = res.docs?.map(row => {
            row.age = this.getAge(row.birthday);
            row.company = row.company[0];
            row.profession = row.profession ? row.profession[0]?.name : "";
            row.createdAt = this.getDateString(row.createdAt);
            row.name = this.getFullName(row);
            row.activeContract =
              row.jobOffer[0]?.status === "active"
                ? row.hiringCompany[0]?.name
                : "No";

            return row;
          });
          this.totalRows = res.totalDocs;
        });
    }
  }
};
</script>

<style scoped></style>
