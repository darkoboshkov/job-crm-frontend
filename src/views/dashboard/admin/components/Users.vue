<template>
  <b-card id="open_users" body-class="pt-0">
    <template v-slot:header>
      <div class="row">
        <div class="col-md-6">
          <h2 class="m-0">{{ $t("component.users.title") }}</h2>
        </div>
        <div class="col-md-6">
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="hideUsersCard"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </template>
    <div>
      <ul class="custom-list">
        <li
          v-for="(row, index) in rows"
          :key="index"
          @click="
            $router.push({
              name: 'admin-profile',
              params: {
                companyId: row.company._id,
                id: row._id
              }
            })
          "
        >
          <div class="d-flex align-items-center">
            <img
              v-if="row.image"
              :src="APP_URL + row.image"
              style="max-width: 45px; margin-right: 15px;"
              class="rounded-circle"
            />
            <div v-else class="avatar-placeholder mr-2"></div>
            <div class="flex-1">
              <div>{{ row.firstName }} {{ row.lastName }}</div>
            </div>
            <i class="hiway-crm-icon icon-angle-right" />
          </div>
        </li>
      </ul>
      <div class="mt-3">
        <a href="#" @click.prevent="$router.push({ name: 'admin-candidates' })">
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
  mounted() {
    this.getActiveUsers();
  },
  methods: {
    getActiveUsers() {
      return userApi
        .getAllWorkers(
          Object.assign({
            filter: {
              status: "available"
            },
            limit: 3,
            page: 1
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
