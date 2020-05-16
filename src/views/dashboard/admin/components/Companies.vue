<template>
  <b-card id="open_users" body-class="pt-0">
    <template v-slot:header>
      <div class="d-flex align-items-center justify-content-between">
        <h2 class="m-0">{{ $t("component.companies.title") }}</h2>
        <button
          type="button"
          class="close"
          aria-label="Close"
          @click="hideCompaniesCard"
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
              name: 'admin-companies-detail',
              params: {
                companyId: row._id
              }
            })
          "
        >
          <div class="d-flex align-items-center justify-content-between">
            <div class="avatar-image mr-2">
              <img v-if="row.logo" :src="row.logo | appUrlFormatter" />
            </div>
            <div class="flex-1">
              <div>
                {{ row.name }}
              </div>
            </div>
            <i class="hiway-crm-icon icon-angle-right" />
          </div>
        </li>
      </ul>
      <div class="mt-3">
        <a href="#" @click.prevent="$router.push({ name: 'admin-companies' })">
          <i class="hiway-crm-icon icon-angle-right mr-2" />
          {{ $t("component.companies.view_all") }}
        </a>
      </div>
    </div>
  </b-card>
</template>

<script>
import companyApi from "@/services/api/companies";

export default {
  name: "users",
  data() {
    return {
      rows: []
    };
  },
  mounted() {
    this.getCompanies();
  },
  methods: {
    getCompanies() {
      companyApi
        .get(
          Object.assign({
            limit: 3,
            page: 1
          })
        )
        .then(res => {
          this.rows = res.docs;
        });
    },
    hideCompaniesCard: function() {
      this.$emit("hide-companies-card");
    }
  }
};
</script>
