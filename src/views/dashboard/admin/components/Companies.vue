<template>
  <b-card id="open_users" body-class="pt-0">
    <template v-slot:header>
      <div class="row">
        <div class="col-md-6">
          <h2 class="m-0">{{ $t("component.companies.title") }}</h2>
        </div>
        <div class="col-md-6">
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="hideCompaniesCard"
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
              name: 'admin-companies-detail',
              params: {
                companyId: row._id
              }
            })
          "
        >
          <div class="d-flex align-items-center">
            <div class="avatar-image mr-2">
              <img v-if="row.logo" :src="APP_URL + row.logo" />
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
    this.getCompanies();
  },
  methods: {
    getCompanies() {
      return companyApi
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
