<template>
  <div id="page_candidates" class="dashboard-content">
    <div class="d-flex justify-content-between align-items-end">
      <h1 class="title">
        {{ $t("page_candidates.title") }}
      </h1>
      <img
        class="add-candidate"
        src="@/assets/image/icon/person-add.svg"
        @click="addPerson"
      />
    </div>
    <p class="sub-title">
      {{ $t("page_candidates.sub_title", { candidates: this.totalRows }) }}
    </p>
    <table-filter
      class="candidate-filters"
      @table-filter="filter"
      :title="'Filter Options'"
      :options="filterOptions"
    />
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
              <b-dropdown-item href="#" @click="goToProfile(props)">{{
                $t("page_candidates.table.view_profile")
              }}</b-dropdown-item>
            </b-dropdown>
          </div>
          <div
            v-else-if="props.column.field === 'image'"
            class="d-flex align-items-center"
          >
            <img
              src="@/assets/image/avatar_nick.png"
              class="rounded-circle border mr-2"
              style="width:65px"
            />
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

export default {
  name: "Candidates",
  components: { TableFilter },
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
          title: this.$t("page_candidates.filter.name"),
          type: "text",
          value: ""
        },
        {
          title: this.$t("page_candidates.filter.company"),
          type: "text",
          value: ""
        },
        {
          title: this.$t("page_candidates.filter.position"),
          type: "text",
          value: ""
        },
        {
          title: this.$t("page_candidates.filter.age"),
          type: "select",
          options: [
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35
          ],
          value: ""
        },
        {
          title: this.$t("page_candidates.filter.status"),
          type: "checkbox",
          value: "",
          options: [
            {
              label: this.$t("page_candidates.filter.available"),
              checked: false
            },
            {
              label: this.$t("page_candidates.filter.unavailable"),
              checked: false
            }
          ]
        },
        {
          title: this.$t("page_candidates.filter.city"),
          type: "text",
          value: ""
        }
      ],
      serverParams: {
        columnFilters: {},
        page: 1,
        limit: 5,
        sort: "",
        order: ""
      },
      selectedCandidateId: null
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

      return columns.concat([
        {
          label: this.$t("page_candidates.table.name"),
          field: this.computedName(),
          name: "name",
          tdClass: "link"
        },
        {
          label: this.$t("page_candidates.table.position"),
          field: "position.name",
          name: "position"
        },
        {
          label: this.$t("page_candidates.table.since"),
          field: this.computedCreatedAt(),
          name: "createdAt"
        },
        {
          label: this.$t("page_candidates.table.company"),
          field: "company.name",
          name: "company"
        },
        {
          label: this.$t("page_candidates.table.age"),
          field: "age",
          name: "age"
        },
        {
          label: this.$t("page_candidates.table.status"),
          field: "status",
          name: "status"
        },
        {
          label: this.$t("page_candidates.table.location"),
          field: "city",
          name: "city"
        },
        {
          label: this.$t("page_candidates.table.actions"),
          field: "actions",
          name: "actions"
        }
      ]);
    },
    role() {
      return this.$store.state.user.role;
    },
    companyId() {
      return this.$store.state.user.companyId;
    }
  },
  mounted() {
    this.getWorkers();
  },
  methods: {
    computedName() {
      return function(row) {
        if (row["firstName"]) {
          return row["firstName"] + " " + row["lastName"];
        }
        return "";
      };
    },
    computedCreatedAt() {
      return function(row) {
        let date = new Date(row["createdAt"]);

        return `${date.getFullYear()}-${date.getMonth() + 1}-
                ${date.getDate()} ${date.getHours()}:
                ${date.getMinutes()}:${date.getSeconds()}`;
      };
    },
    selectCandidate(props) {
      console.log("props", props);
      this.selectedCandidateId = props.row._id;
    },
    goToProfile(props) {
      if (props && props.row) {
        this.$router.push(`/${this.role}/dashboard/profile/${props.row._id}`);
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
    onPerPageChange(e) {
      this.serverParams = Object.assign({}, this.serverParams, {
        limit: e.currentPerPage
      });
      this.getWorkers();
    },
    getWorkers() {
      return userApi
        .getCompanyUsers(
          Object.assign(this.serverParams, {
            companyId: this.companyId,
            filter: {
              role: "worker"
            }
          })
        )
        .then(res => {
          this.rows = res.docs;
          this.rows.forEach(row => {
            if (row.birthday) {
              let thisYear = new Date().getFullYear();
              let birthYear = row.birthday.split("-")[0];
              row.age = thisYear - birthYear;
            } else {
              row.age = " - ";
            }
            row.company = row.company[0];
            row.position = row.position[0];
          });
          this.totalRows = res.totalDocs;
        });
    },
    filter(v) {},
    addPerson() {}
  },
  watch: {
    "$i18n.locale"(v) {}
  }
};
</script>

<style scoped>
.icon-dropdown >>> button {
  color: black;
}
</style>
