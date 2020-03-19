<template>
  <b-card id="open_users" body-class="pt-0">
    <template v-slot:header>
      <div class="d-flex">
        <div class="flex-1">
          <h2 class="m-0">{{ $t("component.users.title") }}</h2>
        </div>
        <button
          type="button"
          class="close"
          aria-label="Close"
          @click="hideUsersCard"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </template>
    <div>
      <ul class="custom-list">
        <li
          v-for="(row, index) in rows"
          :key="index"
          @click="
            $router.push({
              name: 'manager-profile',
              params: {
                companyId: companyId,
                id: row._id
              }
            })
          "
        >
          <div class="d-flex align-items-center">
            <div class="avatar-image mr-2">
              <img v-if="row.image" :src="APP_URL + row.image" />
            </div>
            <div class="flex-1">
              <div>{{ row.firstName }} {{ row.lastName }}</div>
            </div>
            <i class="hiway-crm-icon icon-angle-right" />
          </div>
        </li>
      </ul>
      <div class="mt-3">
        <a
          href="#"
          @click.prevent="$router.push({ name: 'manager-candidates' })"
        >
          <i class="hiway-crm-icon icon-angle-right mr-2" />
          {{ $t("component.users.view_all") }}
        </a>
      </div>
    </div>
  </b-card>
</template>

<script>
import userApi from "@/services/api/users";
import { APP_URL } from "@/constants";

export default {
  name: "users",
  data() {
    return {
      rows: [],
      APP_URL
    };
  },
  computed: {
    companyId() {
      return this.$store.state.user.companyId;
    }
  },
  mounted() {
    this.getActiveUsers();
  },
  methods: {
    getActiveUsers() {
      return userApi
        .getCompanyWorkers(
          Object.assign({
            filter: {
              status: "available"
            },
            limit: 3,
            page: 1,
            companyId: this.companyId
          })
        )
        .then(res => {
          this.rows = res.docs.map(row => {
            row.company = row.company[0];
            return row;
          });
        });
    },
    hideUsersCard: function() {
      this.$emit("hide-users-card");
    }
  }
};
</script>
