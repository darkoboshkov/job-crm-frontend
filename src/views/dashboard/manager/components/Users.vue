<template>
  <b-card id="open_users" body-class="pt-0">
    <template v-slot:header>
      <div class="d-flex align-items-center justify-content-between">
        <h2 class="m-0">{{ $t("component.users.title") }}</h2>
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
          <div class="d-flex align-items-center justify-content-between">
            <div class="avatar-image mr-2">
              <img v-if="row.image" :src="row.image | appUrlFormatter" />
            </div>
            <div class="flex-1">
              <div>{{ row | fullNameFormatter }}</div>
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
import usersApi from "@/services/api/users";

export default {
  name: "users",
  data() {
    return {
      rows: [],
      companyId: this.$store.state.user.companyId
    };
  },
  mounted() {
    this.getActiveUsers();
  },
  methods: {
    getActiveUsers() {
      usersApi
        .getCompanyWorkers(
          Object.assign({
            filter: { and: [{ key: "status", value: "available", opt: "eq" }] },
            limit: 3,
            page: 1,
            companyId: this.companyId
          })
        )
        .then(res => {
          this.rows = res.docs?.map(row => {
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
