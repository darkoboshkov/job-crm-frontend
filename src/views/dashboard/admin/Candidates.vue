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
        @click="$router.push({ name: 'admin-users-create' })"
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
              <b-dropdown-item href="#" @click="goToProfile(props)">
                {{ $t("page_candidates.table.view_profile") }}
              </b-dropdown-item>
              <b-dropdown-item href="#" @click="onEditProfile(props)" style="margin: 0.25rem 0">
                {{ $t("page_candidates.table.edit_profile") }}
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
import professionApi from "@/services/api/professions";
import { candidatesTable } from "@/constants";
import i18n from "../../../plugins/i18n";

export default {
  name: "Candidates",
  components: { TableFilter },
  data() {
    return {
      isLoading: true,
      totalRows: 0,
      rows: [],
      professions: [],
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
    role() {
      return this.$store.state.user.role;
    }
  },
  mounted() {
    this.getWorkers();
    this.getProfessions();
  },
  methods: {
    imageView(mode) {
      this.imageMode = !!mode;
    },
    goToProfile(props) {
      if (props && props.row) {
        this.$router.push(
          `/${this.role}/dashboard/profile/${props.row.companyId}/${props.row._id}`
        );
      }
    },
    onEditProfile(props) {
      if (props && props.row) {
        this.$router.push(
          `/${this.role}/dashboard/profile/${props.row.companyId}/${props.row._id}/edit`
        );
      }
    },
    goToJobOffer(props) {
      if (props && props.row) {
        this.$router.push(
          `/${this.role}/dashboard/joboffers/${props.row.companyId}/${props.row.jobOfferId}`
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
    filter(v) {
      const filter = { or: [], and: [] };
      const name = v[0].value;
      const profession = v[1].value;
      const city = v[2].value;
      const activeContract = v[3].value;
      const status = v[4].value;

      if (name) {
        filter.or = [
          { key: "firstName", value: v[0].value, opt: "in" },
          { key: "lastName", value: v[0].value, opt: "in" },
          { key: "middleName", value: v[0].value, opt: "in" }
        ];
      }
      if (profession) {
        filter.and.push({ key: "professionId", value: profession, opt: "eq" });
      }
      if (status) {
        filter.and.push({ key: "status", value: status, opt: "eq" });
      }
      if (city) {
        filter.and.push({ key: "city", value: city, opt: "in" });
      }
      if (activeContract) {
        filter.and.push({
          key: "jobOffer.status",
          value: "active",
          opt: activeContract === "yes" ? "eq" : "ne"
        });
      }

      this.serverParams = Object.assign({}, this.serverParams, { filter });
      this.getWorkers();
    },
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
      if (this.selectedCandidate) {
        userApi
          .delete({
            companyId: this.selectedCandidate.companyId,
            id: this.selectedCandidate._id
          })
          .then(() => {
            this.$store.dispatch("updateShowErrorModal", false);
            this.getWorkers();
          });
      }
    },
    getWorkers() {
      userApi.getAllWorkers(Object.assign(this.serverParams)).then(res => {
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
    },
    getProfessions() {
      professionApi.getAll().then(res => {
        this.professions = res;

        // profession filter options
        this.filterOptions[1].options.push({ text: "", value: "" });
        this.professions?.forEach(item => {
          this.filterOptions[1].options.push({
            text: this.$t(`profession.${item.name}`),
            value: item._id
          });
        });
      });
    }
  }
};
</script>

<style scoped></style>
